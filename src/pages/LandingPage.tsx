import { motion } from "framer-motion";
import Form from "@components/form/Form";
import Image from "@components/common/Image";
import heroImage from "@/assets/images/hero.webp";
import logoImage from "@/assets/images/logo.webp";
const LandingPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="min-h-screen bg-[#FAFAFA]"
    >
      <header className="sticky top-0 z-10 backdrop-blur-sm bg-white/70 border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Image 
            src={logoImage} 
            alt="Company Logo" 
            width={120} 
            height={40} 
            priority
            className="h-8 w-auto"
          />
          <nav className="hidden md:flex space-x-8">
            {["About", "Services", "Contact"].map((item) => (
              <button 
                key={item}
                className="text-sm text-gray-600 hover:text-black transition-colors"
              >
                {item}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-black">
                Find The Best Commercial{' '}
                <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  Energy Rates
                </span>{' '}
                in Texas
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
                Integrity Energy works with over 30 suppliers to provide businesses with the best rates for commercial electricity and gas.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { step: "1", text: "Connect in 15 minutes" },
                { step: "2", text: "Compare 30+ Providers" },
                { step: "3", text: "Find Your Best Rate" }
              ].map(({ step, text }) => (
                <div 
                  key={step}
                  className="group relative p-6 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center justify-center w-8 h-8 text-sm font-medium text-blue-600 bg-blue-50 rounded-full">
                      {step}
                    </span>
                    <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                      {text}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="relative rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-transparent z-10" />
              <Image
                src={heroImage}
                alt="Energy Solutions Hero"
                width={800}
                height={500}
                className="w-full h-auto object-cover rounded-xl shadow-2xl"
                priority
              />
            </div>

            <div className="pt-8 border-t border-gray-100">
              <p className="text-sm text-gray-500 mb-4">Trusted By Industry Leaders</p>
              <div className="flex flex-wrap items-center gap-8">
                {[1, 2, 3].map((partner) => (
                  <Image
                    key={partner}
                    src={`/images/partner${partner}.png`}
                    alt={`Partner ${partner}`}
                    width={100}
                    height={40}
                    className="h-8 w-auto grayscale hover:grayscale-0 transition-all"
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="lg:pl-8">
            <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Get Your Free Quote
              </h2>
              <Form />
            </div>
          </div>
        </div>
      </main>
    </motion.div>
  );
};

export default LandingPage;