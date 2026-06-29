import { StickerConfig } from '../types';

export const DEFAULT_CONFIG: StickerConfig = {
  titleLines: [
    { id: '1', text: '2026上半', fontSize: 2.7, fontWeight: 'extrabold', letterSpacing: 0 },
    { id: '2', text: '閱聽作品Top3', fontSize: 2.7, fontWeight: 'extrabold', letterSpacing: 0 },
    { id: '3', text: 'by 狂人', fontSize: 2.7, fontWeight: 'extrabold', letterSpacing: 0 },
  ],
  fontFamily: 'serif',
  textAlign: 'center',
  bgColor: '#00925b',
  textColor: '#ffffff',
  topHalfRatio: 50, // 50% top half
  slots: [
    { id: 1, url: null, name: '作品素材 1', zoom: 1.0, offsetX: 0, offsetY: 0, fit: 'cover' },
    { id: 2, url: null, name: '作品素材 2', zoom: 1.0, offsetX: 0, offsetY: 0, fit: 'cover' },
    { id: 3, url: null, name: '作品素材 3', zoom: 1.0, offsetX: 0, offsetY: 0, fit: 'cover' },
  ],
};

