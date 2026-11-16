export function wrapSlideIndex(index, count) {
  return count > 0 ? ((index % count) + count) % count : 0;
}

export function resolveSlideIndex(hash, slides) {
  let id;
  try {
    id = decodeURIComponent(hash.replace(/^#/, ""));
  } catch {
    return -1;
  }
  return slides.findIndex((slide) => slide.id === id || slide.anchors?.includes(id));
}
