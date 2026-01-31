const mainElement = document.body.querySelector("main");

const page = {
  currentElement: "choose-method",
  elements: Object.fromEntries(Array.from(mainElement.childNodes).map((elm) => [elm.id, elm])),
  set(key) {
    if (!this.elements[key]) return this.methodFunctions[key]?.();
    this.elements[this.currentElement].classList.remove("show");
    this.elements[key].classList.add("show");
    this.currentElement = key;
  },
  methodFunctions: {},
};
page.set(page.currentElement);

const allMethods = mainElement.querySelectorAll("#choose-method .method");
for (const methodElm of allMethods) {
  const key = methodElm.classList[1];
  methodElm.onclick = () => page.set(key);
}

mainElement.querySelectorAll(".back-to-choose-method").forEach((el) => {
  el.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M41.4 342.6C28.9 330.1 28.9 309.8 41.4 297.3L169.4 169.3C178.6 160.1 192.3 157.4 204.3 162.4C216.3 167.4 224 179.1 224 192L224 256L560 256C586.5 256 608 277.5 608 304L608 336C608 362.5 586.5 384 560 384L224 384L224 448C224 460.9 216.2 472.6 204.2 477.6C192.2 482.6 178.5 479.8 169.3 470.7L41.3 342.7z"/></svg>`;
  el.onclick = () => page.set("choose-method");
});

// BANK
const bankCopyButton = mainElement.querySelector("#bank .copy");
const bankCopySuccess = mainElement.querySelector("#bank .copy.success");
const bankCopyFailure = mainElement.querySelector("#bank .copy.failure");
bankCopyButton.onclick = async () => {
  let ok;
  try {
    await navigator.clipboard.writeText("8870829051");
    ok = true;
  } catch {
    ok = false;
  }
  bankCopyButton.classList.add("hidden");
  (ok ? bankCopySuccess : bankCopyFailure).classList.add("show");
  setTimeout(() => {
    bankCopyButton.classList.remove("hidden");
    (ok ? bankCopySuccess : bankCopyFailure).classList.remove("show");
  }, 2000);
};

// MOMO
page.methodFunctions.momo = () => (window.location.href = "https://me.momo.vn/tps201cn");
