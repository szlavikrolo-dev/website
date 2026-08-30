import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Szlávik Árnytech - Redőny Beszerelés & Szúnyogháló',
    short_name: 'Szlávik Árnytech',
    description: 'Műanyag és alumínium redőny gyártás, beépítés, szerviz és szúnyogháló készítés Jánoshalmán és 100 km-es körzetében.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#061A40',
    icons: [
      {
        src: '/logo.webp',
        sizes: '192x192',
        type: 'image/webp',
      },
      {
        src: '/logo.webp',
        sizes: '512x512',
        type: 'image/webp',
      },
    ],
  };
}
