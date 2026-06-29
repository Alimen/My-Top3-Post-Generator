export type FontFamily = 'serif' | 'sans' | 'rounded' | 'kai';

export interface TextLine {
  id: string;
  text: string;
  fontSize: number; // relative scale e.g. 1.0 to 3.0
  fontWeight: 'normal' | 'bold' | 'extrabold';
  letterSpacing: number; // px
}

export interface ImageSlot {
  id: number;
  url: string | null;
  name: string;
  zoom: number; // 1.0 to 3.0
  offsetX: number; // percentage -50 to 50
  offsetY: number; // percentage -50 to 50
  fit: 'cover' | 'contain';
}

export interface StickerConfig {
  titleLines: TextLine[];
  fontFamily: FontFamily;
  textAlign: 'left' | 'center' | 'right';
  bgColor: string;
  textColor: string;
  topHalfRatio: number; // percentage e.g. 52
  slots: ImageSlot[];
}

export interface SampleInspiration {
  name: string;
  category: string;
  config: Partial<StickerConfig>;
}

