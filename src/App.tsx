/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { TextControls } from './components/TextControls';
import { ColorControls } from './components/ColorControls';
import { ImageSlotControls } from './components/ImageSlotControls';
import { StickerPreview } from './components/StickerPreview';
import { DEFAULT_CONFIG } from './data/presets';
import { StickerConfig, ImageSlot } from './types';

export default function App() {
  const [config, setConfig] = useState<StickerConfig>(DEFAULT_CONFIG);

  const handleUpdateConfig = (updated: Partial<StickerConfig>) => {
    setConfig((prev) => ({ ...prev, ...updated }));
  };

  const handleUpdateSlots = (updatedSlots: ImageSlot[]) => {
    setConfig((prev) => ({ ...prev, slots: updatedSlots }));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-emerald-500 selection:text-slate-950 flex flex-col">
      {/* Top Header */}
      <Header />

      {/* Main Single-View Workspace Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: All Controls */}
          <div className="lg:col-span-7 xl:col-span-7 space-y-6">
            
            {/* Step 1: Top Half Text */}
            <TextControls
              config={config}
              onChange={handleUpdateConfig}
            />

            {/* Step 2: Theme Colors & Layout */}
            <ColorControls
              config={config}
              onChange={handleUpdateConfig}
            />

            {/* Step 3: Bottom 3 Materials */}
            <ImageSlotControls
              slots={config.slots}
              topHalfRatio={config.topHalfRatio}
              onChange={handleUpdateSlots}
            />
          </div>

          {/* Right Column: Sticky Live Preview & Download CTA */}
          <div className="lg:col-span-5 xl:col-span-5 lg:sticky lg:top-6">
            <StickerPreview config={config} />
          </div>

        </div>
      </main>
    </div>
  );
}
