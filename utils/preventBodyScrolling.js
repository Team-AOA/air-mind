export default function preventBodyScrolling() {
  document.body.style.cssText = `
  position: fixed;
  top: -${window.scrollY}px;
  overflow-y: scroll;
  width: 100%;`;
}
