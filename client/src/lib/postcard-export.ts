/**
 * Postcard Export Utilities - Complete Fix for Clipping and Fonts
 */

/**
 * Preload fonts before rendering
 */
async function preloadFonts(): Promise<void> {
  try {
    // Preload Playfair Display
    const playfair = new FontFace(
      'Playfair Display',
      'url(https://fonts.gstatic.com/s/playfairdisplay/v36/nuFvD-vgNJn_5_zf5_S_4ggM8tQ.woff2)',
      { weight: '700', style: 'italic' }
    );
    
    // Preload Georgia
    const georgia = new FontFace(
      'Georgia',
      'local("Georgia")',
      { weight: '400', style: 'italic' }
    );

    await Promise.all([playfair.load(), georgia.load()]);
    document.fonts.add(playfair);
    document.fonts.add(georgia);
  } catch (error) {
    console.warn('Font preload warning:', error);
  }
}

/**
 * PNG download with full content capture
 */
export async function downloadPostcardAsPNG(
  elementId: string,
  filename: string = 'luckee-postcard.png'
): Promise<void> {
  try {
    // Preload fonts first
    await preloadFonts();
    
    const html2canvas = (await import('html2canvas')).default;
    
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error(`Element with ID "${elementId}" not found`);
    }

    // Clone element for export
    const clone = element.cloneNode(true) as HTMLElement;
    
    // Remove all clipping styles
    clone.style.overflow = 'visible';
    clone.style.borderRadius = '0';
    clone.style.position = 'fixed';
    clone.style.left = '-9999px';
    clone.style.top = '-9999px';
    clone.style.visibility = 'hidden';
    clone.style.width = element.offsetWidth + 'px';
    clone.style.height = element.offsetHeight + 'px';
    
    // Remove any max-width constraints
    clone.style.maxWidth = 'none';
    
    document.body.appendChild(clone);

    // Wait for fonts and rendering
    await new Promise(resolve => setTimeout(resolve, 500));

    // Capture with high quality settings
    const canvas = await html2canvas(clone, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      logging: false,
      backgroundColor: '#ffffff',
      width: clone.offsetWidth,
      height: clone.offsetHeight,
      windowWidth: clone.offsetWidth,
      windowHeight: clone.offsetHeight,
      foreignObjectRendering: false,
    });

    // Clean up
    document.body.removeChild(clone);

    // Download
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('PNG Download Error:', error);
    throw new Error(`Failed to download PNG: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * PDF download with full content capture
 */
export async function downloadPostcardAsPDF(
  elementId: string,
  filename: string = 'luckee-postcard.pdf'
): Promise<void> {
  try {
    // Preload fonts first
    await preloadFonts();
    
    const html2canvas = (await import('html2canvas')).default;
    const { jsPDF } = await import('jspdf');

    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error(`Element with ID "${elementId}" not found`);
    }

    // Clone element for export
    const clone = element.cloneNode(true) as HTMLElement;
    
    // Remove all clipping styles
    clone.style.overflow = 'visible';
    clone.style.borderRadius = '0';
    clone.style.position = 'fixed';
    clone.style.left = '-9999px';
    clone.style.top = '-9999px';
    clone.style.visibility = 'hidden';
    clone.style.width = element.offsetWidth + 'px';
    clone.style.height = element.offsetHeight + 'px';
    
    // Remove any max-width constraints
    clone.style.maxWidth = 'none';
    
    document.body.appendChild(clone);

    // Wait for fonts and rendering
    await new Promise(resolve => setTimeout(resolve, 500));

    // Capture with high quality settings
    const canvas = await html2canvas(clone, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      logging: false,
      backgroundColor: '#ffffff',
      width: clone.offsetWidth,
      height: clone.offsetHeight,
      windowWidth: clone.offsetWidth,
      windowHeight: clone.offsetHeight,
      foreignObjectRendering: false,
    });

    // Clean up
    document.body.removeChild(clone);

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
