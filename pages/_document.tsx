import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#059669" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <meta property="og:site_name" content="FineCustomBoxes" />
        <meta property="og:locale" content="en_US" />
        <meta name="twitter:card" content="summary_large_image" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "FineCustomBoxes",
              "url": "https://finecustomboxes.com",
              "description": "Premium custom packaging boxes for businesses across the USA",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "US"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "email": "info@finecustomboxes.com"
              }
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "What is the minimum order quantity?",
                  "acceptedAnswer": { "@type": "Answer", "text": "Our minimum order is just 50 boxes, making us perfect for small businesses and startups." }
                },
                {
                  "@type": "Question",
                  "name": "Do you offer free design services?",
                  "acceptedAnswer": { "@type": "Answer", "text": "Yes! Our in-house design team will create your artwork for free. Just share your logo and brand colors." }
                },
                {
                  "@type": "Question",
                  "name": "How long does production take?",
                  "acceptedAnswer": { "@type": "Answer", "text": "Standard production is 7-10 business days. Rush orders available in 3-5 business days." }
                },
                {
                  "@type": "Question",
                  "name": "Do you ship across the USA?",
                  "acceptedAnswer": { "@type": "Answer", "text": "Yes, we offer free shipping on all orders to any location across the United States." }
                },
                {
                  "@type": "Question",
                  "name": "Can I get a sample before ordering?",
                  "acceptedAnswer": { "@type": "Answer", "text": "Absolutely! We offer free digital mockups and physical samples are available for a small fee." }
                }
              ]
            })
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
