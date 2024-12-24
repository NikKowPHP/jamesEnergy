import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Helmet } from 'react-helmet-async';

const ThankYouPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Thank You | SmartGrid Energy</title>
        <meta name="description" content="Thank you for choosing SmartGrid Energy. We'll be in touch shortly with your personalized energy solutions." />
        <meta name="robots" content="noindex, follow" /> {/* Don't index thank you page */}
        
        {/* Open Graph / Social Media */}
        <meta property="og:title" content="Thank You | SmartGrid Energy" />
        <meta property="og:description" content="Thank you for choosing SmartGrid Energy. We'll be in touch shortly with your personalized energy solutions." />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Thank You",
            "description": "Confirmation page for energy consultation request"
          })}
        </script>
      </Helmet>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-white"
      >
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <article className="max-w-2xl mx-auto text-center">
            <header>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                Thank You!
              </h1>
            </header>
            <section className="mt-4">
              <p className="text-lg text-gray-600">
                We've received your information and will be in touch shortly.
              </p>
            </section>
            <footer className="mt-8">
              <button
                onClick={() => navigate("/")}
                className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                aria-label="Return to homepage"
              >
                Return Home
              </button>
            </footer>
          </article>
        </main>
      </motion.div>
    </>
  );
};

export default ThankYouPage; 