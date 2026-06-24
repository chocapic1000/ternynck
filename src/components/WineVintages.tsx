"use client";

import { useState } from "react";
import type { Wine } from "@/data/wines";
import { VINTAGES } from "@/data/vintages";

export default function WineVintages({ wine, dark = false }: { wine: Wine; dark?: boolean }) {
  const vintages = VINTAGES[wine.vintageGroup];
  const [activeYear, setActiveYear] = useState(vintages[0].year);
  const activeVintage = vintages.find((v) => v.year === activeYear) ?? vintages[0];

  const titleColor = dark ? "text-cream" : "text-ink";
  const textColor = dark ? "text-cream/55" : "text-ink/70";
  const noteColor = dark ? "text-cream/40" : "text-ink/60";
  const pillBorder = dark ? "border-cream/30 text-cream hover:border-cream" : "border-stone text-ink hover:border-ink";
  const pillActive = dark ? "bg-amber text-ink border-amber" : "bg-ink text-cream border-ink";

  return (
    <div className="mt-8">
      <p className="label-caps text-amber mb-3">— Millésimes</p>
      <div className="flex gap-2 mb-5">
        {vintages.map((v) => (
          <button
            key={v.year}
            onClick={() => setActiveYear(v.year)}
            className={`label-caps px-4 py-1.5 rounded-full border transition-colors ${
              activeYear === v.year ? pillActive : pillBorder
            }`}
          >
            {v.year}
          </button>
        ))}
      </div>

      <h4
        className={`${titleColor} text-lg md:text-xl mb-3 leading-snug`}
        style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
      >
        {activeVintage.title}
      </h4>
      <p className={`${textColor} leading-loose text-[13px] mb-4`} style={{ fontFamily: "var(--font-body)" }}>
        {activeVintage.text}
      </p>
      {wine.vintageNote && (
        <p className={`${noteColor} text-[13px] leading-loose border-l-2 border-amber pl-4`}>
          {wine.vintageNote}
        </p>
      )}
    </div>
  );
}
