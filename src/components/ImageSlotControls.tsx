import React, { useRef } from 'react';
import { ImageIcon, Upload, Trash2, ZoomIn, ArrowLeftRight, MoveHorizontal, MoveVertical } from 'lucide-react';
import { ImageSlot } from '../types';

interface ImageSlotControlsProps {
  slots: ImageSlot[];
  topHalfRatio: number;
  onChange: (updatedSlots: ImageSlot[]) => void;
}

export const ImageSlotControls: React.FC<ImageSlotControlsProps> = ({ slots, topHalfRatio, onChange }) => {
  const fileInputRefs = useRef<{ [key: number]: HTMLInputElement | null }>({});
  const slotAspectRatio = (1 / 3) / (1 - topHalfRatio / 100);

  const handleFileUpload = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      const nextSlots = [...slots];
      nextSlots[index] = {
        ...nextSlots[index],
        url: dataUrl,
        name: file.name
      };
      onChange(nextSlots);
    };
    reader.readAsDataURL(file);
  };

  const handleSlotChange = (index: number, field: keyof ImageSlot, value: any) => {
    const nextSlots = [...slots];
    nextSlots[index] = { ...nextSlots[index], [field]: value };
    onChange(nextSlots);
  };

  const handleRemoveImage = (index: number) => {
    const nextSlots = [...slots];
    nextSlots[index] = { ...nextSlots[index], url: null, name: `素材 ${index + 1}` };
    onChange(nextSlots);
  };

  const handleSwapSlots = (i: number, j: number) => {
    const nextSlots = [...slots];
    const temp = nextSlots[i];
    nextSlots[i] = { ...nextSlots[j], id: nextSlots[i].id };
    nextSlots[j] = { ...temp, id: nextSlots[j].id };
    onChange(nextSlots);
  };

  return (
    <div className="bg-slate-800/80 rounded-2xl p-4 sm:p-5 border border-slate-700/80 shadow-xl backdrop-blur-sm space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-700/60">
        <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm sm:text-base">
          <ImageIcon className="w-5 h-5" />
          <span>下半部三張素材上傳與微調</span>
        </div>
        <span className="text-xs text-slate-400">支援 JPG / PNG / WEBP</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {slots.map((slot, idx) => (
          <div
            key={slot.id}
            className="min-w-0 bg-slate-900/70 rounded-xl p-3 border border-slate-700/70 flex flex-col justify-between transition group hover:border-slate-600"
          >
            {/* Slot Title & Actions */}
            <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-slate-800">
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-mono">
                  {idx + 1}
                </span>
                <span>{idx === 0 ? '左側圖' : idx === 1 ? '中間圖' : '右側圖'}</span>
              </span>

              <div className="flex items-center gap-1">
                {idx > 0 && (
                  <button
                    onClick={() => handleSwapSlots(idx, idx - 1)}
                    className="p-1 text-slate-400 hover:text-emerald-400 rounded hover:bg-slate-800 transition cursor-pointer"
                    title="與左邊互換位置"
                  >
                    <ArrowLeftRight className="w-3.5 h-3.5" />
                  </button>
                )}
                {slot.url && (
                  <button
                    onClick={() => handleRemoveImage(idx)}
                    className="p-1 text-slate-400 hover:text-rose-400 rounded hover:bg-slate-800 transition cursor-pointer"
                    title="移除圖片"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Thumbnail Preview / Drop zone */}
            <div
              onClick={() => fileInputRefs.current[idx]?.click()}
              className="relative rounded-lg bg-slate-950 overflow-hidden border border-dashed border-slate-700 hover:border-emerald-500 transition cursor-pointer flex flex-col items-center justify-center mb-3 group/img shadow-inner"
              style={{ aspectRatio: slotAspectRatio }}
            >
              {slot.url ? (
                <>
                  <img
                    src={slot.url}
                    alt={slot.name}
                    className="w-full h-full object-cover transition duration-300 group-hover/img:scale-105"
                    style={{
                      transform: `scale(${slot.zoom}) translate(${slot.offsetX / slot.zoom}%, ${slot.offsetY / slot.zoom}%)`
                    }}
                  />
                  <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover/img:opacity-100 transition flex items-center justify-center text-white text-xs font-semibold gap-1">
                    <Upload className="w-4 h-4" />
                    <span>點擊更換</span>
                  </div>
                </>
              ) : (
                <div className="text-center p-4 space-y-2">
                  <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-500 group-hover/img:text-emerald-400 transition">
                    <Upload className="w-5 h-5" />
                  </div>
                  <div className="text-xs font-semibold text-slate-300">上傳素材 #{idx + 1}</div>
                  <div className="text-[10px] text-slate-500">點擊或拖曳檔案</div>
                </div>
              )}

              <input
                type="file"
                accept="image/*"
                ref={(el) => { fileInputRefs.current[idx] = el; }}
                onChange={(e) => handleFileUpload(idx, e)}
                className="hidden"
              />
            </div>

            {/* Image Adjustment Controls (only if uploaded) */}
            {slot.url ? (
              <div className="min-w-0 space-y-2.5 bg-slate-950/50 p-2.5 rounded-lg border border-slate-800">
                {/* Zoom */}
                <div className="flex items-center gap-2">
                  <ZoomIn className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="text-[10px] text-slate-400 w-6">縮放</span>
                  <input
                    type="range"
                    min="1.0"
                    max="3.0"
                    step="0.05"
                    value={slot.zoom}
                    onChange={(e) => handleSlotChange(idx, 'zoom', parseFloat(e.target.value))}
                    className="min-w-0 w-full flex-1 accent-emerald-500 h-1 bg-slate-800 rounded cursor-pointer"
                  />
                  <span className="text-[10px] font-mono text-emerald-400 w-6 text-right">{slot.zoom.toFixed(1)}x</span>
                </div>

                {/* Pan X */}
                <div className="flex items-center gap-2">
                  <MoveHorizontal className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="text-[10px] text-slate-400 w-6">水平</span>
                  <input
                    type="range"
                    min="-40"
                    max="40"
                    step="1"
                    value={slot.offsetX}
                    onChange={(e) => handleSlotChange(idx, 'offsetX', parseInt(e.target.value))}
                    className="min-w-0 w-full flex-1 accent-emerald-500 h-1 bg-slate-800 rounded cursor-pointer"
                  />
                </div>

                {/* Pan Y */}
                <div className="flex items-center gap-2">
                  <MoveVertical className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="text-[10px] text-slate-400 w-6">垂直</span>
                  <input
                    type="range"
                    min="-40"
                    max="40"
                    step="1"
                    value={slot.offsetY}
                    onChange={(e) => handleSlotChange(idx, 'offsetY', parseInt(e.target.value))}
                    className="min-w-0 w-full flex-1 accent-emerald-500 h-1 bg-slate-800 rounded cursor-pointer"
                  />
                </div>
              </div>
            ) : (
              <button
                onClick={() => fileInputRefs.current[idx]?.click()}
                className="w-full py-2 bg-slate-800 hover:bg-emerald-500 hover:text-slate-950 text-slate-300 text-xs font-semibold rounded-lg transition cursor-pointer border border-slate-700"
              >
                選擇圖片 #{idx + 1}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
