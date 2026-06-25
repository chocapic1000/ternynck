"use client";

import MapLibreGL, { type PopupOptions, type MarkerOptions } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import {
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";

import { cn } from "@/lib/utils";

// Adapté de https://www.mapcn.dev (composants Map / MapMarker / MarkerContent /
// MarkerTooltip) : version réduite au strict nécessaire pour une carte de
// localisation simple, avec les couleurs du site (cream/ink/amber) à la place
// des tokens shadcn (bg-background, etc.) que ce projet n'utilise pas.

// Style sombre par défaut pour contraster avec le fond clair des pages,
// dans le même esprit que les sections "ink" utilisées ailleurs sur le site.
const defaultStyle = "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json";

type MapContextValue = {
  map: MapLibreGL.Map | null;
  isLoaded: boolean;
};

const MapContext = createContext<MapContextValue | null>(null);

function useMap() {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error("useMap must be used within a Map component");
  }
  return context;
}

type MapRef = MapLibreGL.Map;

type MapProps = {
  children?: ReactNode;
  className?: string;
} & Omit<MapLibreGL.MapOptions, "container" | "style">;

function DefaultLoader() {
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center bg-ink backdrop-blur-xs">
      <div className="flex gap-1">
        <span className="size-1.5 animate-pulse rounded-full bg-cream/40" />
        <span className="size-1.5 animate-pulse rounded-full bg-cream/40 [animation-delay:150ms]" />
        <span className="size-1.5 animate-pulse rounded-full bg-cream/40 [animation-delay:300ms]" />
      </div>
    </div>
  );
}

const Map = forwardRef<MapRef, MapProps>(function Map(
  { children, className, ...props },
  ref,
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mapInstance, setMapInstance] = useState<MapLibreGL.Map | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useImperativeHandle(ref, () => mapInstance as MapLibreGL.Map, [mapInstance]);

  useEffect(() => {
    if (!containerRef.current) return;

    const map = new MapLibreGL.Map({
      container: containerRef.current,
      style: defaultStyle,
      renderWorldCopies: false,
      attributionControl: { compact: true },
      ...props,
    });

    const loadHandler = () => setIsLoaded(true);
    map.on("load", loadHandler);
    setMapInstance(map);

    return () => {
      map.off("load", loadHandler);
      map.remove();
      setIsLoaded(false);
      setMapInstance(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const contextValue = useMemo(() => ({ map: mapInstance, isLoaded }), [mapInstance, isLoaded]);

  return (
    <MapContext.Provider value={contextValue}>
      <div ref={containerRef} className={cn("relative h-full w-full", className)}>
        {!isLoaded && <DefaultLoader />}
        {mapInstance && children}
      </div>
    </MapContext.Provider>
  );
});

type MarkerContextValue = {
  marker: MapLibreGL.Marker;
  map: MapLibreGL.Map | null;
};

const MarkerContext = createContext<MarkerContextValue | null>(null);

function useMarkerContext() {
  const context = useContext(MarkerContext);
  if (!context) {
    throw new Error("Marker components must be used within MapMarker");
  }
  return context;
}

type MapMarkerProps = {
  longitude: number;
  latitude: number;
  children: ReactNode;
} & Omit<MarkerOptions, "element">;

function MapMarker({ longitude, latitude, children, ...markerOptions }: MapMarkerProps) {
  const { map } = useMap();

  const marker = useMemo(
    () =>
      new MapLibreGL.Marker({ ...markerOptions, element: document.createElement("div") }).setLngLat([
        longitude,
        latitude,
      ]),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useEffect(() => {
    if (!map) return;
    marker.addTo(map);
    return () => {
      marker.remove();
    };
  }, [map, marker]);

  return <MarkerContext.Provider value={{ marker, map }}>{children}</MarkerContext.Provider>;
}

function MarkerContent({ children, className }: { children?: ReactNode; className?: string }) {
  const { marker } = useMarkerContext();
  return createPortal(
    <div className={cn("relative cursor-pointer", className)}>{children}</div>,
    marker.getElement(),
  );
}

function MarkerTooltip({
  children,
  className,
  ...popupOptions
}: { children: ReactNode; className?: string } & Omit<
  PopupOptions,
  "className" | "closeButton" | "closeOnClick"
>) {
  const { marker, map } = useMarkerContext();
  const container = useMemo(() => document.createElement("div"), []);

  const tooltip = useMemo(
    () =>
      new MapLibreGL.Popup({ offset: 16, ...popupOptions, closeOnClick: true, closeButton: false }).setMaxWidth(
        "none",
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useEffect(() => {
    if (!map) return;
    tooltip.setDOMContent(container);

    const handleMouseEnter = () => tooltip.setLngLat(marker.getLngLat()).addTo(map);
    const handleMouseLeave = () => tooltip.remove();

    marker.getElement()?.addEventListener("mouseenter", handleMouseEnter);
    marker.getElement()?.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      marker.getElement()?.removeEventListener("mouseenter", handleMouseEnter);
      marker.getElement()?.removeEventListener("mouseleave", handleMouseLeave);
      tooltip.remove();
    };
  }, [map, marker, tooltip, container]);

  return createPortal(
    <div
      className={cn(
        "pointer-events-none rounded-md bg-ink px-2 py-1 text-xs text-cream shadow-md",
        className,
      )}
    >
      {children}
    </div>,
    container,
  );
}

function PopupCloseButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Fermer"
      className="absolute top-2 right-2.5 z-10 cursor-pointer text-cream/40 transition-colors hover:text-cream"
      style={{ fontFamily: "var(--font-display)", fontSize: "13px" }}
    >
      ×
    </button>
  );
}

type MarkerPopupProps = {
  children: ReactNode;
  className?: string;
  closeButton?: boolean;
} & Omit<PopupOptions, "className" | "closeButton">;

function MarkerPopup({ children, className, closeButton = false, ...popupOptions }: MarkerPopupProps) {
  const { marker, map } = useMarkerContext();
  const container = useMemo(() => document.createElement("div"), []);

  const popup = useMemo(
    () =>
      new MapLibreGL.Popup({ offset: 16, ...popupOptions, closeButton: false })
        .setMaxWidth("none")
        .setDOMContent(container),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useEffect(() => {
    if (!map) return;
    popup.setDOMContent(container);
    marker.setPopup(popup);
    return () => {
      marker.setPopup(undefined);
    };
  }, [map, marker, popup, container]);

  const handleClose = () => popup.remove();

  return createPortal(
    <div className={cn("relative min-w-52 border border-amber/40 bg-ink px-5 py-4 text-cream", className)}>
      {closeButton && <PopupCloseButton onClick={handleClose} />}
      {children}
    </div>,
    container,
  );
}

export { Map, useMap, MapMarker, MarkerContent, MarkerTooltip, MarkerPopup };
export type { MapRef };
