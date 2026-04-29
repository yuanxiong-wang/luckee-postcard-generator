/**
 * Postcard Export Utilities - Simplified Working Version
 */

/**
 * Simple PNG download using html2canvas with minimal options
 */
export async function downloadPostcardAsPNG(
  elementId: string,
  filename: string = 'luckee-postcard.png'
): Promise<void> {
  try {
    const html2canvas = (await import('html2canvas')).default;
    
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error(`Element with ID "${elementId}" not found`);
    }

    // Simple canvas capture with minimal options
    const canvas = await html2canvas(element, {
      scale: 1,
      useCORS: true,
      allowTaint: true,
      logging: false,
    });

    // Download using toDataURL
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = filename;
    link.click();
  } catch (error) {
    console.error('PNG Download Error:', error);
    throw new Error(`Failed to download PNG: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Simple PDF download
 */
export async function downloadPostcardAsPDF(
  elementId: string,
  filename: string = 'luckee-postcard.pdf'
): Promise<void> {
  try {
    const html2canvas = (await import('html2canvas')).default;
    const { jsPDF } = await import('jspdf');

    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error(`Element with ID "${elementId}" not found`);
    }

    // Simple canvas capture
    const canvas = await html2canvas(element, {
      scale: 1,
      useCORS: true,
      allowTaint: true,
      logging: false,
    });

    // Create PDF with postcard dimensions (8.5" x 5.5")
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'in',
      format: [8.5, 5.5],
    });

    // Calculate image size to fit PDF
    const imgWidth = 8.5;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    // Add image to PDF
    const imgData = canvas.toDataURL('image/png');
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

    // Save PDF
    pdf.save(filename);
  } catch (error) {
    console.error('PDF Download Error:', error);
    throw new Error(`Failed to download PDF: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Generate social media share text
 */
export function generateShareText(
  holidayName: string,
  greeting: string
): string {
  return `${greeting} from our team at Luckee! 🎉`;
}

/**
 * Generate LinkedIn share URL
 */
export function generateLinkedInShareURL(
  pageUrl: string,
  title: string,
  summary: string
): string {
  const params = new URLSearchParams({
    url: pageUrl,
    title: title,
    summary: summary,
  });
  return `https://www.linkedin.com/sharing/share-offsite/?${params.toString()}`;
}

/**
 * Generate Facebook share URL
 */
export function generateFacebookShareURL(
  pageUrl: string,
  quote: string
): string {
  const params = new URLSearchParams({
    href: pageUrl,
    quote: quote,
  });
  return `https://www.facebook.com/sharer/sharer.php?${params.toString()}`;
}

/**
 * Open share dialog in new window
 */
export function openShareWindow(
  url: string,
  title: string = 'Share',
  width: number = 600,
  height: number = 400
): Window | null {
  const left = window.screenX + (window.outerWidth - width) / 2;
  const top = window.screenY + (window.outerHeight - height) / 2;

  return window.open(
    url,
    title,
    `width=${width},height=${height},left=${left},top=${top}`
  );
}
