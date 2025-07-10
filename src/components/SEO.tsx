import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  canonical?: string;
}

const SEO: React.FC<SEOProps> = ({
  title = "Panna Combs - Best Hair Combs Manufacturer in Howrah, Kolkata | Premium Combs",
  description = "Panna Combs - Leading hair comb manufacturer in Howrah, Kolkata. Premium quality combs for salons, professionals & personal use. Wide range of 5\", 7\", 9\" combs. Contact us for wholesale orders.",
  keywords = "hair combs, comb manufacturer, Kolkata combs, Howrah comb factory, salon combs, professional combs, wholesale combs, 5 inch combs, 7 inch combs, 9 inch combs",
  image = "https://pannacombs.com/logo.png",
  url = "https://pannacombs.com",
  type = "website",
  canonical = "https://pannacombs.com"
}) => {
  useEffect(() => {
    // Update page title for better SEO
    document.title = title;
    
    // Add structured data for better search results
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Panna Combs",
      "url": "https://pannacombs.com",
      "logo": "https://pannacombs.com/logo.png",
      "description": "Leading hair comb manufacturer in Howrah, Kolkata",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Howrah",
        "addressRegion": "West Bengal",
        "addressCountry": "IN"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+91-XXXXXXXXXX",
        "contactType": "customer service"
      }
    };

    // Add structured data to page
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      // Cleanup
      document.head.removeChild(script);
    };
  }, [title, description, canonical, url]);

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={canonical} />}
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonical || url} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Panna Combs" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@pannacombs" />
      <meta name="twitter:creator" content="@pannacombs" />
      
      {/* Additional SEO Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="author" content="Panna Combs" />
      
      {/* Local Business Schema for better local SEO */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "Panna Combs",
          "description": "Leading hair comb manufacturer in Howrah, Kolkata",
          "url": "https://pannacombs.com",
          "logo": "https://pannacombs.com/logo.png",
          "telephone": "+91-XXXXXXXXXX",
          "email": "pannacombs@gmail.com",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Duilly, Nimtalla, Andul, Howrah - 711302",
            "addressLocality": "Howrah",
            "addressRegion": "West Bengal",
            "postalCode": "711302",
            "addressCountry": "IN"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": "22.5726",
            "longitude": "88.3639"
          },
          "areaServed": ["Kolkata", "Howrah", "West Bengal", "India"],
          "foundingDate": "Established",
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+91-XXXXXXXXXX",
            "contactType": "customer service",
            "availableLanguage": ["English", "Hindi", "Bengali"]
          }
        })}
      </script>
    </Helmet>
  );
};

export default SEO; 