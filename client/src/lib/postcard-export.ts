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
