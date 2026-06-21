import { wines } from "@/data/wines";
import WineClient from "./WineClient";

export function generateStaticParams() {
  return wines.map((wine) => ({ slug: wine.id }));
}

export default function WinePage({ params }: { params: { slug: string } }) {
  return <WineClient slug={params.slug} />;
}
