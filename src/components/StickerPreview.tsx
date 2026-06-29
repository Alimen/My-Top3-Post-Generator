import React, { useState } from 'react';
import { Download, Sparkles, Eye, ShieldCheck } from 'lucide-react';
import { StickerConfig } from '../types';
import { downloadCanvas, generateStickerCanvas } from '../utils/canvasExporter';

interface StickerPreviewProps {
  config: StickerConfig;
}

export const StickerPreview: React.FC<StickerPreviewProps> = ({ config }) => {
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const getFontClass = () => {
    switch (config.fontFamily) {
      case 'serif': return 'font-serif';
      case 'sans': return 'font-sans';
      case 'rounded': return 'font-sans tracking-wide';
      case 'kai': return 'font-serif italic';
      default: return 'font-sans';
    }
  };

  const handleDownload = async (format: 'png' | 'jpg') => {
    setLoading(true);
    try {
      const canvas = await generateStickerCanvas(config);
      const titleStr = config.titleLines[0]?.text || '貼圖分享';
      const safeFilename = titleStr.replace(/[^a-zA-Z0-9\u4e00-\u9fa5]/g, '_').slice(0, 20) || 'Top3_Sticker';
      downloadCanvas(canvas, `${safeFilename}_${Date.now().toString().slice(-4)}`, format);
    } catch (err) {
      console.error('Download error:', err);
      showToast('❌ 圖片產生失敗，請確認圖片格式是否正常');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-800/80 rounded-2xl p-4 sm:p-6 border border-slate-700/80 shadow-xl backdrop-blur-sm sticky top-6 flex flex-col items-center">
      <div className="w-full flex items-center justify-between mb-4 pb-3 border-b border-slate-700/60">
        <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm sm:text-base">
          <Eye className="w-5 h-5" />
          <span>即時預覽 (1:1 正方形)</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400 bg-slate-900/80 px-2.5 py-1 rounded-full border border-slate-700">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>960 × 960 px</span>
        </div>
      </div>

      {/* Live Preview Canvas Container */}
      <div className="w-full max-w-md mx-auto mb-6">
        <div className="relative w-full aspect-square overflow-hidden shadow-2xl rounded-xl border border-slate-700/80 transition duration-300 select-none bg-white">
          <div className="absolute inset-0 flex flex-col">
            {/* Top Half (Text) */}
            <div
              className={`w-full flex flex-col justify-center px-6 transition-colors duration-200 ${getFontClass()}`}
              style={{
                height: `${config.topHalfRatio}%`,
                backgroundColor: config.bgColor,
                color: config.textColor,
                textAlign: config.textAlign
              }}
            >
              <div className="flex flex-col justify-center my-auto space-y-1 sm:space-y-2 py-4">
                {config.titleLines.map((line) => {
                  if (!line.text) return null;
                  const relativeSizeRem = line.fontSize * 1.1; // scale for preview DOM
                  return (
                    <div
                      key={line.id}
                      className={`leading-tight ${line.fontWeight === 'extrabold' ? 'font-black' : line.fontWeight === 'bold' ? 'font-bold' : 'font-normal'}`}
                      style={{
                        fontSize: `${relativeSizeRem}rem`,
                        letterSpacing: `${line.letterSpacing * 0.5}px`
                      }}
                    >
                      {line.text}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Half (3 Images Side by Side, seamless gap=0) */}
            <div className="w-full flex-1 flex transition-all duration-200 bg-white gap-0">
              {config.slots.map((slot, idx) => (
                <div
                  key={slot.id}
                  className="flex-1 relative overflow-hidden bg-slate-900 flex items-center justify-center"
                >
                  {slot.url ? (
                    <img
                      src={slot.url}
                      alt={slot.name}
                      className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
                      style={{
                        transform: `scale(${slot.zoom}) translate(${slot.offsetX / slot.zoom}%, ${slot.offsetY / slot.zoom}%)`
                      }}
                    />
                  ) : (
                    <div className="text-center p-2">
                      <span
                        className="text-xs font-bold px-2 py-1 rounded select-none opacity-60"
                        style={{ color: config.bgColor }}
                      >
                        + 圖 #{idx + 1}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="w-full">
        <button
          onClick={() => handleDownload('jpg')}
          disabled={loading}
          className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-base shadow-lg shadow-emerald-500/25 transition transform active:scale-98 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
              <span>產生圖檔中...</span>
            </>
          ) : (
            <>
              <Download className="w-5 h-5 stroke-[2.5]" />
              <span>下載 JPG 圖檔 (960×960)</span>
            </>
          )}
        </button>
      </div>

      {/* Toast Alert */}
      {toastMessage && (
        <div className="mt-4 w-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 animate-fade-in shadow-lg">
          <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
