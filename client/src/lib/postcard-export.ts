/**
 * Postcard Export Utilities - Using html-to-image for better CSS support
 */

import { toPng, toJpeg } from 'html-to-image';
import { jsPDF } from 'jspdf';

/**
 * PNG download with full content capture
 */
export async function downloadPostcardAsPNG(
  elementId: string,
  filename: string = 'luckee-postcard.png'
): Promise<void> {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error(`Element with ID "${elementId}" not found`);
    }

    // Use html-to-image for better CSS support (including oklch colors)
    const dataUrl = await toPng(element, {
      quality: 1.0,
      pixelRatio: 2, // High resolution output
      cacheBust: true,
      backgroundColor: '#ffffff',
    });

    // Download
    const link = document.createElement('a');
    link.href = dataUrl;
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
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error(`Element with ID "${elementId}" not found`);
    }

    // Use html-to-image for better CSS support (including oklch colors)
    const dataUrl = await toPng(element, {
      quality: 1.0,
      pixelRatio: 2, // High resolution output
      cacheBust: true,
      backgroundColor: '#ffffff',
    });

    // Create PDF with postcard dimensions (8.5" x 5.5")
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'in',
      format: [8.5, 5.5],
    });

    // Get image dimensions
    const img = new Image();
    img.src = dataUrl;
    
    await new Promise((resolve) => {
      img.onload = resolve;
    });

    // Calculate image size to fit PDF
    const imgWidth = 8.5;
    const imgHeight = (img.height * imgWidth) / img.width;

    // Add image to PDF
    pdf.addImage(dataUrl, 'PNG', 0, 0, imgWidth, imgHeight);

    // Save PDF
    pdf.save(filename);
  } catch (error) {
    console.error('PDF Download Error:', error);
    throw new Error(`Failed to download PDF: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * JPEG download with full content capture
 */
export async function downloadPostcardAsJPEG(
  elementId: string,
  filename: string = 'luckee-postcard.jpg'
): Promise<void> {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error(`Element with ID "${elementId}" not found`);
    }

    // Use html-to-image for better CSS support
    const dataUrl = await toJpeg(element, {
      quality: 0.95,
      pixelRatio: 2, // High resolution output
      backgroundColor: '#ffffff',
    });

    // Download
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('JPEG Download Error:', error);
    throw new Error(`Failed to download JPEG: ${error instanceof Error ? error.message : 'Unknown error'}`);
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
