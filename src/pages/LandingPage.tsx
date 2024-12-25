import { AnimatePresence, motion } from "framer-motion";
import { LandingPageHelmet } from '@components/helmets/LandingPageHelmet';
import { lazy, memo, useEffect, useState, Suspense } from "react";
import Image from "@/components/common/Image";

// Lazy load non-critical components
const Form = lazy(() => import("@components/form/Form"));

// Preload and optimize images
const images = {
  hero: {
    src: new URL('@/assets/images/hero.webp', import.meta.url).href,
    width: 600,
    height: 400,
  },
  partners: [
    { src: new URL('@/assets/images/partner/partner1.png', import.meta.url).href, id: 1 },
    { src: new URL('@/assets/images/partner/partner2.png', import.meta.url).href, id: 2 },
    { src: new URL('@/assets/images/partner/partner3.png', import.meta.url).href, id: 3 },
  ]
};

// Memoize static components
const PartnerLogos = memo(() => (
  <div className="flex flex-wrap items-center gap-12 justify-center">
    {images.partners.map(({ src, id }) => (
      <Image
        key={id}
        src={src}
        alt={`Partner ${id}`}
        width={120}
        height={48}
        className="h-8 w-auto opacity-75 hover:opacity-100 transition-opacity duration-200"
        fetchPriority="low"
      />
    ))}
  </div>
));
PartnerLogos.displayName = 'PartnerLogos';

// Memoize steps component
const Steps = memo(({ steps }: { steps: Array<{ step: string; text: string }> }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {steps.map(({ step, text }, index) => (
      <motion.div 
        key={step}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 * index }}
        className="group relative flex flex-col items-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
      >
        {/* Background accent */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Step number with animated border */}
        <div className="relative mb-4">
          <div className="absolute inset-0 bg-blue-100 rounded-full transform scale-0 group-hover:scale-125 transition-transform duration-300 opacity-50" />
          <span className="relative flex items-center justify-center w-14 h-14 text-xl font-bold text-blue-600 bg-blue-50 rounded-full border-2 border-blue-100 group-hover:border-blue-200 transition-colors duration-300">
            {step}
          </span>
        </div>

        {/* Step text with hover effect */}
        <span className="relative text-center font-medium text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
          {text}
        </span>

        {/* Connector line (hidden on mobile) */}
        {index < steps.length - 1 && (
          <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-[2px] bg-gray-200 transform -translate-y-1/2">
            <div className="absolute right-0 w-2 h-2 bg-gray-200 rounded-full transform -translate-y-1/2 translate-x-1/2" />
          </div>
        )}
      </motion.div>
    ))}
  </div>
));
Steps.displayName = 'Steps';



// Add steps data (you can move this to a separate constants file if preferred)
const STEPS_DATA = [
  { step: "1", text: "Share Your Details" },
  { step: "2", text: "Compare Rates" },
  { step: "3", text: "Choose & Save" }
];


const LandingPage = () => {

  const [isFormVisible, setIsFormVisible] = useState(false);

  // Fix: Replace new Image() constructor with proper image preloading
  useEffect(() => {
    const preloadImage = (src: string) => {
      const img = document.createElement('img');
      img.src = src;
    };
    
    preloadImage(images.hero.src);
  }, []);

  // Intersection Observer for form
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsFormVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const formSection = document.getElementById('form-section');
    if (formSection) {
      observer.observe(formSection);
    }

    return () => observer.disconnect();
  }, []);


  return (
    <>
      <LandingPageHelmet />
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className=" bg-white"
        >
          <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              {/* Left side: Info section */}
              <div className="flex flex-col  space-y-6">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="relative"
                >
                  {/* Hero image */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-6"
                  >
                    <Image
                      src={images.hero.src}
                      alt="Hero illustration"
                      width={images.hero.width}
                      height={images.hero.height}
                      className="w-full h-[280px] object-cover rounded-lg"
                      priority
                    />
                  </motion.div>

                  <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-2xl md:text-3xl font-bold text-gray-900 max-w-xl leading-tight mb-3"
                  >
                    Find The Best Commercial Energy Rates in Texas
                  </motion.h1>
                  <p className="text-base text-gray-600 leading-relaxed max-w-xl mb-6">
                    Integrity Energy works with over 30+ suppliers to provide businesses with the best rates for commercial energy.
                  </p>
                </motion.div>

                <Steps steps={STEPS_DATA} />

                {/* <div className="pt-4 border-t border-gray-100">
                  <p className="text-sm font-medium text-gray-500 mb-4">
                    Trusted by Industry Leaders
                  </p>
                  <PartnerLogos />
                </div> */}
              </div>

              {/* Right side: Form section */}
              <div className="lg:sticky lg:top-8">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: isFormVisible ? 1 : 0,
                    y: isFormVisible ? 0 : 20 
                  }}
                  transition={{ 
                    duration: 0.6,
                    ease: "easeOut"
                  }}
                  id="form-section"
                  className="bg-white p-6 rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-200"
                >
                  <h2 className="text-xl font-bold text-gray-900 mb-6">
                    Get Your Free Quote
                  </h2>
                  <Suspense fallback={
                    <div className="animate-pulse space-y-4">
                      <div className="h-10 bg-gray-200 rounded w-full"></div>
                      <div className="h-10 bg-gray-200 rounded w-full"></div>
                      <div className="h-10 bg-gray-200 rounded w-3/4"></div>
                    </div>
                  }>
                    <Form />
                  </Suspense>
                </motion.div>
              </div>
            </div>
          </main>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default LandingPage;