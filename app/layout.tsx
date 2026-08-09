import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ShutterOverlay from './components/ShutterOverlay';

const inter = Inter({ subsets: ['latin', 'latin-ext'] });


export const viewport: Viewport = {
  themeColor: '#061A40',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://szlavikrolo.hu'),
  title: 'Szlávik Roló | Redőny Szerelés, Javítás & Szúnyogháló Jánoshalma',
  description: 'Professzionális műanyag és alumínium redőny beszerelés, motorizálás, redőny javítás és szúnyogháló készítés Jánoshalmán és 100 km-es körzetében. Ingyenes kiszállás 50 km-ig!',
  keywords: [
    'redőny Jánoshalma',
    'redőny szerelés',
    'redőny javítás',
    'műanyag redőny',
    'alumínium redőny',
    'motoros redőny',
    'szúnyogháló készítés',
    'palástcsere',
    'Szlávik Roló',
    'redőnyös Bács-Kiskun',
    'redőny Kecskemét',
    'redőny Baja',
    'redőny Kiskunhalas'
  ],
  authors: [{ name: 'Szlávik Roló - SZ+H Univerzál 2015 Kft.' }],
  creator: 'Szlávik Roló',
  publisher: 'Szlávik Roló',
  category: 'Árnyékolástechnika',
  alternates: {
    canonical: 'https://szlavikrolo.hu',
  },
  icons: {
    icon: '/logo.webp',
    shortcut: '/logo.webp',
    apple: '/logo.webp',
  },
  openGraph: {
    title: 'Szlávik Roló | Redőny Beszerelés & Szúnyogháló Jánoshalmán',
    description: 'Műanyag és alumínium redőny gyártás, beépítés, szerviz és szúnyogháló készítés Jánoshalmán és 100 km-es körzetében. Ingyenes kiszállás 50 km-ig!',
    url: 'https://szlavikrolo.hu',
    type: 'website',
    locale: 'hu_HU',
    siteName: 'Szlávik Roló',
    images: [
      {
        url: '/logo.webp',
        width: 1200,
        height: 630,
        alt: 'Szlávik Roló - Redőny és Árnyékolástechnika',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Szlávik Roló | Redőny Szerelés & Szúnyogháló Jánoshalma',
    description: 'Redőny beszerelés, javítás és szúnyogháló készítés Jánoshalmán és 100 km-es körzetében. Ingyenes felmérés!',
    images: ['/logo.webp'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const jsonLdLocalBusiness = {
  '@context': 'https://schema.org',
  '@type': 'HomeAndConstructionBusiness',
  'name': 'Szlávik Roló (SZ+H Univerzál 2015 Kft.)',
  'image': 'https://szlavikrolo.hu/logo.webp',
  'logo': 'https://szlavikrolo.hu/logo.webp',
  'url': 'https://szlavikrolo.hu',
  'telephone': '+36307826402',
  'priceRange': '$$',
  'description': 'Műanyag és alumínium redőnyök gyártása, beszerelése, szervizelése, komplett palástcseréje és szúnyogháló készítése Jánoshalmán és 100 km-es körzetében.',
  'address': {
    '@type': 'PostalAddress',
    'addressLocality': 'Jánoshalma',
    'addressRegion': 'Bács-Kiskun',
    'postalCode': '6440',
    'addressCountry': 'HU'
  },
  'geo': {
    '@type': 'GeoCoordinates',
    'latitude': 46.2975,
    'longitude': 19.3242
  },
  'openingHoursSpecification': [
    {
      '@type': 'OpeningHoursSpecification',
      'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      'opens': '07:00',
      'closes': '20:00'
    },
    {
      '@type': 'OpeningHoursSpecification',
      'dayOfWeek': ['Saturday'],
      'opens': '08:00',
      'closes': '16:00'
    }
  ],
  'areaServed': [
    { '@type': 'City', 'name': 'Jánoshalma' },
    { '@type': 'City', 'name': 'Kecskemét' },
    { '@type': 'City', 'name': 'Baja' },
    { '@type': 'City', 'name': 'Kiskunhalas' },
    { '@type': 'City', 'name': 'Kiskőrös' },
    { '@type': 'City', 'name': 'Kiskunmajsa' }
  ],
  'hasOfferCatalog': {
    '@type': 'OfferCatalog',
    'name': 'Árnyékolástechnikai szolgáltatások',
    'itemListElement': [
      {
        '@type': 'Offer',
        'itemOffered': {
          '@type': 'Service',
          'name': 'Műanyag redőny beépítés és szerviz'
        }
      },
      {
        '@type': 'Offer',
        'itemOffered': {
          '@type': 'Service',
          'name': 'Alumínium redőny beépítés és motorizálás'
        }
      },
      {
        '@type': 'Offer',
        'itemOffered': {
          '@type': 'Service',
          'name': 'Redőny palástcsere és szerviz'
        }
      },
      {
        '@type': 'Offer',
        'itemOffered': {
          '@type': 'Service',
          'name': 'Szúnyogháló gyártás és beépítés'
        }
      }
    ]
  }
};

const jsonLdFaq = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  'mainEntity': [
    {
      '@type': 'Question',
      'name': 'Mennyibe kerül egy redőny vagy szúnyogháló beépítése?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'Minden nyílászáró mérete és típusa egyedi, ezért a pontos árat a helyszíni felmérés során tudjuk megadni. A felmérés ingyenes és kötelezettségmentes, 24 órán belül megkapja a pontos árajánlatot.'
      }
    },
    {
      '@type': 'Question',
      'name': 'Mennyi idő alatt készül el a redőny a megrendeléstől számítva?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'A felméréstől és megrendeléstől számítva általában 1-2 héten belül legyártjuk és beépítjük a redőnyöket. Sürgős redőnyjavítást és szervizelést akár azonnal is vállalunk.'
      }
    },
    {
      '@type': 'Question',
      'name': 'Milyen garanciát adnak a munkára?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'Minden általunk beépített redőnyre, szúnyoghálóra és elvégzett szerelésre garanciát vállalunk.'
      }
    },
    {
      '@type': 'Question',
      'name': 'Tényleg ingyenes a kiszállás?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'Igen! Jánoshalma 50 km-es körzetében a kiszállás és felmérés teljesen ingyenes, és nem kötelezi Önt vásárlásra.'
      }
    }
  ]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hu" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdLocalBusiness) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
        />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <ShutterOverlay />
        {children}
      </body>
    </html>
  );
}
