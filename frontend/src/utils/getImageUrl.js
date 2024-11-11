function getImgUrl(path) {
  return new URL(`/src/assets/books/${path}`, import.meta.url)
}
export { getImgUrl };