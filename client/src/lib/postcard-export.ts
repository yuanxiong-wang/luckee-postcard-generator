/**
 * Postcard Export Utilities
 * 
 * Provides functions to export postcards as PNG or PDF files
 * Handles cross-origin background images properly
 */

/**
 * Download postcard as PNG using html2canvas
 * Requires: npm install html2canvas
 */
export async function downloadPostcardAsPNG(
  elementId: string,
  filename: string = 'luckee-postcard.png'
): Promise<void> {
  try {
    // Dynamically import html2canvas to keep bundle size smaller
    const html2canvas = (await import('html2canvas')).default;
    
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error(`Element with ID "${elementId}" not found`);
    }

    // Create canvas from the postcard element with proper CORS handling
    const canvas = await html2canvas(element, {
      scale: 2, // Higher quality
      backgroundColor: '#ffffff',
      logging: false,
      useCORS: true,
      allowTaint: true,
      imageTimeout: 5000, // Increase timeout for remote images
      proxy: undefined, // Disable proxy to allow direct CORS
      foreignObjectRendering: true,
    });

    // Convert canvas to data URL and download
    const dataUrl = canvas.toDataURL('image/png');
    
    // Create a link element and trigger download
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = filename;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    
    // Clean up
    setTimeout(() => {
      document.body.removeChild(link);
    }, 100);
  } catch (error) {
    console.error('Error downloading postcard as PNG:', error);
    throw error;
  }
}

/**
 * Download postcard as PDF
 * Requires: npm install jspdf html2canvas
 */
export async function downloadPostcardAsPDF(
  elementId: string,
  filename: string = 'luckee-postcard.pdf'
): Promise<void> {
  try {
    // Dynamically import dependencies
    const html2canvas = (await import('html2canvas')).default;
    const { jsPDF } = await import('jspdf');

    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error(`Element with ID "${elementId}" not found`);
    }

    // Create canvas from the postcard element with proper CORS handling
    const canvas = await html2canvas(element, {
      scale: 2,
      backgroundColor: '#ffffff',
      logging: false,
      useCORS: true,
      allowTaint: true,
      imageTimeout: 5000,
      proxy: undefined,
      foreignObjectRendering: true,
    });

    // Standard postcard dimensions: 8.5" x 5.5" at 72 DPI
    const pdfWidth = 8.5;
    const pdfHeight = 5.5;

    // Create PDF with postcard dimensions
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'in',
      format: [pdfWidth, pdfHeight],
    });

    // Calculate dimensions to fit the canvas into the PDF
    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    // Add image to PDF
    const imgData = canvas.toDataURL('image/png');
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

    // Download the PDF
    pdf.save(filename);
  } catch (error) {
    console.error('Error downloading postcard as PDF:', error);
    throw error;
  }
}

/**
 * Generate social media share text
 */
export function generateShareText(
  holidayName: string,
  greeting: string
): string {
  return `${greeting} from our team at Luckee! 🎉 Generate your own seasonal postcard at Luckee.`;
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
    app_id: '1234567890', // Replace with actual Facebook App ID if needed
    display: 'popup',
    href: pageUrl,
    quote: quote,
    redirect_uri: pageUrl,
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
