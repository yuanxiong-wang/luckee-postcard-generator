async function rasterizePostcard(element: HTMLElement): Promise<string> {
  const { toPng } = await import("html-to-image");
  return toPng(element, {
    quality: 1,
    pixelRatio: 2,
    cacheBust: true,
    backgroundColor: "#ffffff",
  });
}

function download(dataUrl: string, filename: string) {
  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = filename;
  link.click();
}

function getImageDimensions(
  dataUrl: string
): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve({ width: image.width, height: image.height });
    image.onerror = () => reject(new Error("Could not load postcard image"));
    image.src = dataUrl;
  });
}

function dataUrlToBlob(dataUrl: string): Blob {
  const encoded = dataUrl.split(",")[1];
  if (!encoded || !dataUrl.startsWith("data:image/png;base64,")) {
    throw new Error("Could not prepare the postcard image");
  }
  const bytes = Uint8Array.from(atob(encoded), character =>
    character.charCodeAt(0)
  );
  return new Blob([bytes], { type: "image/png" });
}

export async function downloadPostcardAsPNG(
  element: HTMLElement,
  filename = "luckee-postcard.png"
): Promise<void> {
  try {
    download(await rasterizePostcard(element), filename);
  } catch (error) {
    console.error("PNG download error:", error);
    throw new Error(
      `Failed to download PNG: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}

export async function copyPostcardAsPNG(element: HTMLElement): Promise<void> {
  if (!navigator.clipboard?.write || typeof ClipboardItem === "undefined") {
    throw new Error(
      "Image copying is not supported in this browser. Use Download Postcard → PNG."
    );
  }

  // Start the clipboard write during the click; Safari expires activation across awaits.
  const image = rasterizePostcard(element).then(dataUrlToBlob);
  try {
    await navigator.clipboard.write([
      new ClipboardItem({ "image/png": image }),
    ]);
  } catch (error) {
    if (error instanceof DOMException && error.name === "NotAllowedError") {
      throw new Error(
        "Clipboard access was blocked. Allow clipboard access for this site, or use Download Postcard → PNG."
      );
    }
    throw error;
  }
}

export async function copyCompositionLink(): Promise<string> {
  const href = window.location.href;
  if (!navigator.clipboard?.writeText) {
    throw new Error("Clipboard is not available");
  }
  await navigator.clipboard.writeText(href);
  return href;
}

export async function downloadPostcardAsPDF(
  element: HTMLElement,
  filename = "luckee-postcard.pdf"
): Promise<void> {
  try {
    const [dataUrl, { jsPDF }] = await Promise.all([
      rasterizePostcard(element),
      import("jspdf"),
    ]);
    const { width, height } = await getImageDimensions(dataUrl);
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "in",
      format: [8.5, 5.5],
    });
    pdf.addImage(dataUrl, "PNG", 0, 0, 8.5, (height * 8.5) / width);
    pdf.save(filename);
  } catch (error) {
    console.error("PDF download error:", error);
    throw new Error(
      `Failed to download PDF: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}
