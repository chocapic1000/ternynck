"use client";

import { useCart } from "@/context/CartContext";
import { useEffect } from "react";

export default function CartDrawer() {
  const { items, open, setOpen, removeItem, updateQty, total, count } = useCart();

  // Bloquer le scroll body quand ouvert
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-ink/40 z-40 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-cream z-50 flex flex-col transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-dust">
          <p
            className="text-ink text-lg"
            style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
          >
            Panier{count > 0 ? ` (${count})` : ""}
          </p>
          <button
            onClick={() => setOpen(false)}
            className="text-stone hover:text-ink transition-colors text-2xl leading-none"
            aria-label="Fermer"
          >
            ×
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4">
              <p className="body-sm text-stone text-center">
                Votre panier est vide.
              </p>
              <button
                onClick={() => setOpen(false)}
                className="label-caps text-amber border-b border-amber pb-0.5"
              >
                Continuer mes achats →
              </button>
            </div>
          ) : (
            <ul className="space-y-6">
              {items.map((item) => (
                <li key={item.id} className="flex gap-4">
                  {/* Bouteille placeholder */}
                  <div className="w-14 h-20 bg-dust flex-shrink-0 flex items-center justify-center">
                    <div className="w-3 h-14 bg-ink/20 rounded-t-sm" />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-ink text-[15px] leading-snug mb-0.5"
                      style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
                    >
                      {item.name}
                    </p>
                    <p className="label-caps text-stone capitalize">{item.label}</p>
                    <p className="body-sm text-ink mt-1">{item.price} € / bouteille</p>

                    {/* Quantité */}
                    <div className="flex items-center gap-3 mt-3">
                      <button
                        onClick={() => updateQty(item.id, item.quantity - 1)}
                        className="w-7 h-7 border border-stone text-ink hover:border-ink flex items-center justify-center text-lg leading-none transition-colors"
                        aria-label="Retirer une bouteille"
                      >
                        −
                      </button>
                      <span className="body-sm text-ink w-4 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQty(item.id, item.quantity + 1)}
                        className="w-7 h-7 border border-stone text-ink hover:border-ink flex items-center justify-center text-lg leading-none transition-colors"
                        aria-label="Ajouter une bouteille"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Prix + supprimer */}
                  <div className="flex flex-col items-end justify-between">
                    <p
                      className="text-ink text-base"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {(item.price * item.quantity).toFixed(0)} €
                    </p>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="label-caps text-stone hover:text-ink transition-colors"
                      aria-label="Supprimer"
                    >
                      Retirer
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-8 py-6 border-t border-dust space-y-4">
            <div className="flex justify-between items-center">
              <p className="body-sm text-stone">Total</p>
              <p
                className="text-ink text-xl"
                style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
              >
                {total.toFixed(0)} €
              </p>
            </div>
            <p className="label-caps text-stone">Livraison incluse</p>
            <button className="w-full bg-ink text-cream label-caps py-4 hover:bg-amber transition-colors">
              Passer commande →
            </button>
          </div>
        )}
      </div>
    </>
  );
}
