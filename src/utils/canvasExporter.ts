import { StickerConfig } from '../types';

// Helper to load image
const loadImage = (url: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = (err) => {
      // Retry without crossorigin if failed (sometimes needed for data URLs or local blobs)
      const imgFallback = new Image();
      imgFallback.onload = () => resolve(imgFallback);
      imgFallback.onerror = reject;
      imgFallback.src = url;
    };
    img.src = url;
  });
};

const getFontFamilyString = (family: string): string => {
  switch (family) {
    case 'serif':
      return '"Noto Serif TC", "Songti TC", "BiauKai", "MingLiU", "Times New Roman", serif';
    case 'sans':
      return '"Noto Sans TC", "Microsoft JhengHei", "PingFang TC", "Helvetica Neue", sans-serif';
    case 'rounded':
      return '"Hiragino Maru Gothic ProN", "Yu Rounded", "Varela Round", sans-serif';
    case 'kai':
      return '"DFKai-SB", "BiauKai", "KaiTi", serif';
    default:
      return 'sans-serif';
  }
};

export const generateStickerCanvas = async (config: StickerConfig): Promise<HTMLCanvasElement> => {
  const canvas = document.createElement('canvas');
  const W = 960;
  const H = 960;
  
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Cannot get 2d context');

  // 1. Calculate top and bottom dimensions
  const topH = Math.round(H * (config.topHalfRatio / 100));
  const bottomH = H - topH;

  // 2. Draw Top Background
  ctx.fillStyle = config.bgColor;
  ctx.fillRect(0, 0, W, topH);

  // 3. Draw Top Text
  const validLines = config.titleLines.filter(l => l.text.trim().length > 0);
  if (validLines.length > 0) {
    const fontStr = getFontFamilyString(config.fontFamily);
    const baseSize = W * 0.052; // ~50px at 960p

    // Pre-calculate heights of all lines to center them vertically in topH
    const lineMetrics = validLines.map(line => {
      const fontSize = Math.round(baseSize * line.fontSize);
      const weight = line.fontWeight === 'extrabold' ? '900' : line.fontWeight === 'bold' ? '700' : '400';
      ctx.font = `${weight} ${fontSize}px ${fontStr}`;
      
      // Approximate line height
      const lineHeight = fontSize * 1.32;
      return { line, fontSize, weight, lineHeight };
    });

    const totalTextBlockHeight = lineMetrics.reduce((sum, m) => sum + m.lineHeight, 0);
    let currentY = (topH - totalTextBlockHeight) / 2 + (lineMetrics[0]?.fontSize || 0);

    for (const metric of lineMetrics) {
      ctx.font = `${metric.weight} ${metric.fontSize}px ${fontStr}`;
      ctx.fillStyle = config.textColor;
      ctx.textAlign = config.textAlign;
      ctx.textBaseline = 'alphabetic';

      // Set letter spacing if supported
      if ('letterSpacing' in ctx) {
        (ctx as any).letterSpacing = `${metric.line.letterSpacing * (W / 600)}px`;
      }

      let drawX = W / 2;
      if (config.textAlign === 'left') drawX = W * 0.08;
      if (config.textAlign === 'right') drawX = W * 0.92;

      ctx.fillText(metric.line.text, drawX, currentY);
      currentY += metric.lineHeight;
    }
  }

  // 4. Draw Bottom Background (gap color)
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, topH, W, bottomH);

  // 5. Draw Bottom 3 Images (seamless gap=0)
  const gap = 0;
  const slotW = Math.round(W / 3);

  // Load all images in parallel
  const loadedImages = await Promise.all(
    config.slots.map(async (slot) => {
      if (!slot.url) return null;
      try {
        return await loadImage(slot.url);
      } catch (err) {
        console.warn(`Failed to load slot image ${slot.id}:`, err);
        return null;
      }
    })
  );

  for (let i = 0; i < 3; i++) {
    const slot = config.slots[i];
    const img = loadedImages[i];
    const slotX = i * (slotW + gap);
    const slotY = topH;
    const currentSlotW = (i === 2) ? (W - slotX) : slotW; // ensure last slot fills edge perfectly

    if (img) {
      ctx.save();
      ctx.beginPath();
      ctx.rect(slotX, slotY, currentSlotW, bottomH);
      ctx.clip();

      // Calculate cover crop dimensions
      const imgW = img.naturalWidth || img.width;
      const imgH = img.naturalHeight || img.height;
      const slotRatio = currentSlotW / bottomH;
      const imgRatio = imgW / imgH;

      let renderW = currentSlotW;
      let renderH = bottomH;

      if (imgRatio > slotRatio) {
        // Image is wider than slot -> fit height, scale width
        renderH = bottomH * slot.zoom;
        renderW = renderH * imgRatio;
      } else {
        // Image is taller than slot -> fit width, scale height
        renderW = currentSlotW * slot.zoom;
        renderH = renderW / imgRatio;
      }

      // Calculate offsets (-50% to +50% range)
      const maxOffsetX = Math.max(0, renderW - currentSlotW);
      const maxOffsetY = Math.max(0, renderH - bottomH);
      
      const dx = slotX - (renderW - currentSlotW) / 2 + (slot.offsetX / 50) * (maxOffsetX / 2);
      const dy = slotY - (renderH - bottomH) / 2 + (slot.offsetY / 50) * (maxOffsetY / 2);

      ctx.drawImage(img, dx, dy, renderW, renderH);
      ctx.restore();
    } else {
      // Placeholder box
      ctx.fillStyle = config.bgColor + '22';
      ctx.fillRect(slotX, slotY, currentSlotW, bottomH);
      
      ctx.fillStyle = config.bgColor;
      ctx.font = `bold ${Math.round(W * 0.025)}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`+ 素材 ${i + 1}`, slotX + currentSlotW / 2, slotY + bottomH / 2);
    }
  }

  return canvas;
};

export const downloadCanvas = (canvas: HTMLCanvasElement, filename: string, format: 'png' | 'jpg' = 'png') => {
  const mime = format === 'jpg' ? 'image/jpeg' : 'image/png';
  const url = canvas.toDataURL(mime, 0.95);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${filename}.${format}`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};
