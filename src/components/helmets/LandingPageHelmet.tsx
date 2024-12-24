import { Helmet } from "react-helmet-async";

export const LandingPageHelmet = () => {
  return (
    <Helmet>
      <title>Energy Solutions for Texas Business | SmartGrid Energy</title>
      <meta
        name="description"
        content="Compare rates from 30+ energy suppliers and find the perfect energy plan for your Texas business. Get your free quote in just 15 minutes!"
      />

      {/* Open Graph / Social Media */}
      <meta property="og:type" content="website" />
      <meta
        property="og:title"
        content="Energy Solutions for Texas Business | SmartGrid Energy"
      />
      <meta
        property="og:description"
        content="Compare rates from 30+ energy suppliers and find the perfect energy plan for your Texas business. Get your free quote in just 15 minutes!"
      />
      <meta property="og:image" content="/og-image.jpg" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:title"
        content="Energy Solutions for Texas Business | SmartGrid Energy"
      />
      <meta
        name="twitter:description"
        content="Compare rates from 30+ energy suppliers and find the perfect energy plan for your Texas business."
      />

      {/* Additional SEO tags */}
      <link rel="canonical" href="https://smartgridenergy.info" />
      <meta
        name="keywords"
        content="texas energy, business energy, energy suppliers, commercial electricity, energy rates, texas utilities"
      />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name: "SmartGrid Energy Solutions",
          description:
            "Energy supplier comparison and solutions for Texas businesses",
          provider: {
            "@type": "Organization",
            name: "SmartGrid Energy",
            areaServed: "Texas",
          },
          serviceType: "Energy Consultation",
          audience: "Business",
        })}
      </script>
    </Helmet>
  );
};
