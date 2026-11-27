import assert from "node:assert/strict";
import { mock } from "node:test";
import { copyPostcardAsPNG } from "../client/src/lib/postcard-export.ts";

let finishRendering!: (image: string) => void;
mock.module("html-to-image", {
  namedExports: {
    toPng: () =>
      new Promise<string>(resolve => {
        finishRendering = resolve;
      }),
  },
});

let imagePromise: Promise<Blob> | undefined;
let clipboardStarted = false;
Object.defineProperty(globalThis, "ClipboardItem", {
  configurable: true,
  value: class {
    data: Record<string, Promise<Blob>>;
    constructor(data: Record<string, Promise<Blob>>) {
      this.data = data;
    }
  },
});
Object.defineProperty(globalThis, "navigator", {
  configurable: true,
  value: {
    clipboard: {
      write: async (items: { data: Record<string, Promise<Blob>> }[]) => {
        clipboardStarted = true;
        imagePromise = items[0].data["image/png"];
        await imagePromise;
      },
    },
  },
});
mock.method(globalThis, "fetch", () => {
  throw new Error("Image copying must not fetch a data URL");
});

const copying = copyPostcardAsPNG({} as HTMLElement);
assert.equal(
  clipboardStarted,
  true,
  "Clipboard write must start before asynchronous rendering"
);
assert(imagePromise instanceof Promise);
// Let the lazy image renderer load, then finish with a PNG signature.
await import("html-to-image");
await new Promise(resolve => setImmediate(resolve));
assert(finishRendering);
finishRendering("data:image/png;base64,iVBORw0KGgo=");
await copying;
const blob = await imagePromise;
assert.equal(blob.type, "image/png");
assert.deepEqual(
  [...new Uint8Array(await blob.arrayBuffer())],
  [137, 80, 78, 71, 13, 10, 26, 10]
);

navigator.clipboard.write = async () => {
  throw new DOMException("Blocked", "NotAllowedError");
};
await assert.rejects(
  copyPostcardAsPNG({} as HTMLElement),
  /Clipboard access was blocked/
);
Object.defineProperty(globalThis, "ClipboardItem", { value: undefined });
await assert.rejects(copyPostcardAsPNG({} as HTMLElement), /Download Postcard/);
console.log(
  "Checked PNG conversion, immediate clipboard write, and unsupported/blocked clipboard errors."
);
