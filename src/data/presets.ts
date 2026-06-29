import { StickerConfig } from '../types';

export const DEFAULT_CONFIG: StickerConfig = {
  titleLines: [
    { id: '1', text: '2025下半', fontSize: 1.4, fontWeight: 'bold', letterSpacing: 2 },
    { id: '2', text: '閱聽作品Top3', fontSize: 2.1, fontWeight: 'extrabold', letterSpacing: 1 },
    { id: '3', text: 'by 手帕', fontSize: 1.5, fontWeight: 'bold', letterSpacing: 3 },
  ],
  fontFamily: 'serif',
  textAlign: 'center',
  bgColor: '#00925b',
  textColor: '#ffffff',
  topHalfRatio: 52, // 52% top half
  slots: [
    { id: 1, url: null, name: '作品素材 1', zoom: 1.0, offsetX: 0, offsetY: 0, fit: 'cover' },
    { id: 2, url: null, name: '作品素材 2', zoom: 1.0, offsetX: 0, offsetY: 0, fit: 'cover' },
    { id: 3, url: null, name: '作品素材 3', zoom: 1.0, offsetX: 0, offsetY: 0, fit: 'cover' },
  ],
};

