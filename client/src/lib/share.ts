export function generateLinkedInShareURL(pageUrl: string): string {
  return `https://www.linkedin.com/sharing/share-offsite/?${new URLSearchParams({
    url: pageUrl,
  })}`;
}

export function generateFacebookShareURL(pageUrl: string): string {
  return `https://www.facebook.com/sharer/sharer.php?${new URLSearchParams({
    u: pageUrl,
  })}`;
}

export function openShareWindow(
  url: string,
  title: string,
  width: number,
  height: number
): Window | null {
  const left = window.screenX + (window.outerWidth - width) / 2;
  const top = window.screenY + (window.outerHeight - height) / 2;
  return window.open(
    url,
    title,
    `width=${width},height=${height},left=${left},top=${top}`
  );
}
