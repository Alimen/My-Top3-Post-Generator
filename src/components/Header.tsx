import React from 'react';
import { Layers } from 'lucide-react';

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = () => {
  return (
    <header className="bg-slate-900 text-white border-b border-slate-800 px-4 py-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <Layers className="w-6 h-6 text-slate-950 font-bold" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
              Top3 貼圖生成器
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                960×960 固定比例
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              <a
                href="https://github.com/Alimen/My-Top3-Post-Generator"
                target="_blank"
                rel="noreferrer"
                className="text-emerald-400 hover:text-emerald-300 transition"
              >
                Alimen/My-Top3-Post-Generator
              </a>
              {' · '}
              輸入上半部自訂文字與色塊，上傳下方三張素材，合成分享卡
            </p>
          </div>
        </div>


      </div>
    </header>
  );
};
