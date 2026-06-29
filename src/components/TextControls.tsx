import React from 'react';
import { Type, AlignLeft, AlignCenter, AlignRight, Plus, Trash2 } from 'lucide-react';
import { FontFamily, StickerConfig } from '../types';

interface TextControlsProps {
  config: StickerConfig;
  onChange: (updated: Partial<StickerConfig>) => void;
}

export const TextControls: React.FC<TextControlsProps> = ({ config, onChange }) => {
  const handleLineChange = (index: number, field: string, val: any) => {
    const nextLines = [...config.titleLines];
    nextLines[index] = { ...nextLines[index], [field]: val };
    onChange({ titleLines: nextLines });
  };

  const handleAddLine = () => {
    if (config.titleLines.length >= 5) return;
    onChange({
      titleLines: [
        ...config.titleLines,
        { id: Date.now().toString(), text: '新標題行', fontSize: 1.5, fontWeight: 'bold', letterSpacing: 2 }
      ]
    });
  };

  const handleRemoveLine = (index: number) => {
    if (config.titleLines.length <= 1) return;
    const nextLines = config.titleLines.filter((_, idx) => idx !== index);
    onChange({ titleLines: nextLines });
  };

  return (
    <div className="bg-slate-800/80 rounded-2xl p-4 sm:p-5 border border-slate-700/80 shadow-xl backdrop-blur-sm">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-700/60">
        <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm sm:text-base">
          <Type className="w-5 h-5" />
          <span>上半部文字設定</span>
        </div>
        
        <div className="flex items-center gap-1 bg-slate-900/80 p-1 rounded-xl border border-slate-700">
          <button
            onClick={() => onChange({ textAlign: 'left' })}
            className={`p-1.5 rounded-lg transition cursor-pointer ${config.textAlign === 'left' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
            title="靠左對齊"
          >
            <AlignLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => onChange({ textAlign: 'center' })}
            className={`p-1.5 rounded-lg transition cursor-pointer ${config.textAlign === 'center' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
            title="置中對齊"
          >
            <AlignCenter className="w-4 h-4" />
          </button>
          <button
            onClick={() => onChange({ textAlign: 'right' })}
            className={`p-1.5 rounded-lg transition cursor-pointer ${config.textAlign === 'right' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
            title="靠右對齊"
          >
            <AlignRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Font Family Selector */}
      <div className="mb-5 flex items-center justify-between bg-slate-900/60 px-3.5 py-2.5 rounded-xl border border-slate-700/80">
        <label className="text-xs font-semibold text-slate-300">字體選擇</label>
        <select
          value={config.fontFamily}
          onChange={(e) => onChange({ fontFamily: e.target.value as FontFamily })}
          className="bg-slate-800 text-emerald-400 text-xs sm:text-sm font-bold py-1.5 px-3 rounded-lg border border-slate-700 focus:outline-none focus:border-emerald-500 cursor-pointer"
        >
          <option value="serif">經典宋體</option>
          <option value="sans">現代黑體</option>
          <option value="rounded">溫潤圓體</option>
          <option value="kai">書法楷體</option>
        </select>
      </div>

      {/* Text Lines Input */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-400 font-semibold px-1">
          <span>文字內容</span>
          <span>字體大小 & 字距</span>
        </div>

        {config.titleLines.map((line, idx) => (
          <div key={line.id} className="bg-slate-900/60 rounded-xl p-3 border border-slate-700/60 space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-mono w-4">{idx + 1}.</span>
              <input
                type="text"
                value={line.text}
                onChange={(e) => handleLineChange(idx, 'text', e.target.value)}
                placeholder={`第 ${idx + 1} 行文字`}
                className="flex-1 bg-slate-800 text-white text-sm px-3 py-1.5 rounded-lg border border-slate-700 focus:outline-none focus:border-emerald-500 font-medium"
              />
              {config.titleLines.length > 1 && (
                <button
                  onClick={() => handleRemoveLine(idx)}
                  className="p-1.5 text-slate-500 hover:text-rose-400 rounded-lg hover:bg-slate-800 transition cursor-pointer"
                  title="刪除此行"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="grid grid-cols-3 gap-2 pt-1 pl-6">
              <div>
                <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                  <span>大小</span>
                  <span className="text-emerald-400 font-mono">{line.fontSize.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="0.6"
                  max="3.5"
                  step="0.1"
                  value={line.fontSize}
                  onChange={(e) => handleLineChange(idx, 'fontSize', parseFloat(e.target.value))}
                  className="w-full accent-emerald-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                  <span>字重</span>
                </div>
                <select
                  value={line.fontWeight}
                  onChange={(e) => handleLineChange(idx, 'fontWeight', e.target.value)}
                  className="w-full bg-slate-800 text-xs text-slate-200 py-1 px-2 rounded border border-slate-700 focus:outline-none focus:border-emerald-500"
                >
                  <option value="normal">一般</option>
                  <option value="bold">粗體</option>
                  <option value="extrabold">極粗體</option>
                </select>
              </div>

              <div>
                <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                  <span>字距</span>
                  <span className="text-emerald-400 font-mono">{line.letterSpacing}px</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="16"
                  step="1"
                  value={line.letterSpacing}
                  onChange={(e) => handleLineChange(idx, 'letterSpacing', parseInt(e.target.value))}
                  className="w-full accent-emerald-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>
            </div>
          </div>
        ))}

        {config.titleLines.length < 5 && (
          <button
            onClick={handleAddLine}
            className="w-full py-2 rounded-xl border border-dashed border-slate-700 hover:border-emerald-500/50 text-slate-400 hover:text-emerald-400 text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer bg-slate-900/30"
          >
            <Plus className="w-4 h-4" />
            <span>新增一行文字</span>
          </button>
        )}
      </div>
    </div>
  );
};
