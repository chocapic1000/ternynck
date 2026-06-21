export function imgPath(src: string): string {
  if (!src || src.startsWith("http")) return src;
  return `${process.env.NEXT_PUBLIC_BASE_PATH || ""}${src}`;
}
