import React from 'react';
import { Palette, Sliders } from 'lucide-react';
import { StickerConfig } from '../types';

interface ColorControlsProps {
  config: StickerConfig;
  onChange: (updated: Partial<StickerConfig>) => void;
}

export const ColorControls: React.FC<ColorControlsProps> = ({ config, onChange }) => {
  return (
    <div className="bg-slate-800/80 rounded-2xl p-4 sm:p-5 border border-slate-700/80 shadow-xl backdrop-blur-sm space-y-5">
      {/* Header */}
      <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm sm:text-base pb-3 border-b border-slate-700/60">
        <Palette className="w-5 h-5" />
        <span>配色與版面配置</span>
      </div>

      {/* Custom Color Pickers */}
      <div className="grid grid-cols-2 gap-3 bg-slate-900/50 p-3 rounded-xl border border-slate-700/60">
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-300 font-medium">背景顏色</span>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-slate-400 uppercase">{config.bgColor}</span>
            <label className="relative cursor-pointer">
              <input
                type="color"
                value={config.bgColor}
                onChange={(e) => onChange({ bgColor: e.target.value })}
                className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
              />
              <div
                className="w-7 h-7 rounded-lg border-2 border-white/30 shadow-md"
                style={{ backgroundColor: config.bgColor }}
              />
            </label>
          </div>
        </div>

        <div className="flex items-center justify-between border-l border-slate-700 pl-3">
          <span className="text-xs text-slate-300 font-medium">文字顏色</span>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-slate-400 uppercase">{config.textColor}</span>
            <label className="relative cursor-pointer">
              <input
                type="color"
                value={config.textColor}
                onChange={(e) => onChange({ textColor: e.target.value })}
                className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
              />
              <div
                className="w-7 h-7 rounded-lg border-2 border-slate-600 shadow-md"
                style={{ backgroundColor: config.textColor }}
              />
            </label>
          </div>
        </div>
      </div>

      {/* Layout & Proportion Sliders */}
      <div className="space-y-4 pt-1">
        {/* Top Split Ratio */}
        <div>
          <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1.5">
            <span className="flex items-center gap-1.5 text-slate-300">
              <Sliders className="w-3.5 h-3.5 text-emerald-400" />
              <span>上半部高度佔比</span>
            </span>
            <span className="text-emerald-400 font-mono">{config.topHalfRatio}% : {100 - config.topHalfRatio}%</span>
          </div>
          <input
            type="range"
            min="35"
            max="70"
            step="1"
            value={config.topHalfRatio}
            onChange={(e) => onChange({ topHalfRatio: parseInt(e.target.value) })}
            className="w-full accent-emerald-500 h-2 bg-slate-900 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
            <span>文字區少 (35%)</span>
            <span>半半平衡 (50%)</span>
            <span>圖片區多 (70%)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

