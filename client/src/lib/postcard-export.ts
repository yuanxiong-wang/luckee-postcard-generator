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

async function dataUrlToBlob(dataUrl: string): Promise<Blob> {
  const response = await fetch(dataUrl);
  return response.blob();
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
  const dataUrl = await rasterizePostcard(element);
  const blob = await dataUrlToBlob(dataUrl);

  if (!navigator.clipboard?.write) {
    download(dataUrl, "luckee-postcard.png");
    throw new Error("Clipboard images are not supported in this browser");
  }

  try {
    await navigator.clipboard.write([
      new ClipboardItem({ [blob.type || "image/png"]: blob }),
    ]);
  } catch {
    await navigator.clipboard.write([
      new ClipboardItem({
        "image/png": Promise.resolve(blob),
      }),
    ]);
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
