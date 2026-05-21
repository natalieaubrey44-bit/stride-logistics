import { useEffect } from 'react';

const defaultDescription = 'Stride Logistics coordinates air, sea, and road freight with transparent shipment visibility and responsive operations support.';

export default function SEO({
  title = 'Stride Logistics',
  description = defaultDescription,
  path = '/'
}) {
  useEffect(() => {
    const absoluteUrl = `${window.location.origin}${path}`;

    document.title = title;

    const setMeta = (selector, attr, value) => {
      let tag = document.head.querySelector(selector);

      if (!tag) {
        tag = document.createElement('meta');
        const match = selector.match(/\[(name|property)="([^"]+)"\]/);
        if (match) {
          tag.setAttribute(match[1], match[2]);
        }
        document.head.appendChild(tag);
      }

      tag.setAttribute(attr, value);
    };

    setMeta('meta[name="description"]', 'content', description);
    setMeta('meta[property="og:title"]', 'content', title);
    setMeta('meta[property="og:description"]', 'content', description);
    setMeta('meta[property="og:type"]', 'content', 'website');
    setMeta('meta[property="og:url"]', 'content', absoluteUrl);
    setMeta('meta[property="og:site_name"]', 'content', 'Stride Logistics');
    setMeta('meta[name="twitter:card"]', 'content', 'summary_large_image');
    setMeta('meta[name="twitter:title"]', 'content', title);
    setMeta('meta[name="twitter:description"]', 'content', description);

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', absoluteUrl);
  }, [title, description, path]);

  return null;
}
