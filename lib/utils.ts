export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function smoothScrollTo(elementId: string) {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// Helper function to get image path with basePath for GitHub Pages
export function getImagePath(path: string): string {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  // Get basePath from environment or use empty string
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  // Return path with basePath prefix
  return basePath ? `${basePath}/${cleanPath}` : `/${cleanPath}`;
}

