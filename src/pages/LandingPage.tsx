import { motion } from "framer-motion";
import Form from "@components/form/Form";
import Image from "@components/common/Image";
import heroImage from "@/assets/images/hero.webp";
import partner1 from "@/assets/images/partner/partner1.png";
import partner2 from "@/assets/images/partner/partner2.png";
import partner3 from "@/assets/images/partner/partner3.png";
import { FiChevronDown } from 'react-icons/fi';
import { LandingPageHelmet } from '@components/helmets/LandingPageHelmet';


const LandingPage = () => {
  return (
    <>
      <LandingPageHelmet />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        className="min-h-screen bg-white dark:bg-black"
      >
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative mb-20 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20"
          >
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="relative z-10 p-8 lg:p-12">
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-black dark:text-white mb-6"
                >
                  <span className="bg-gradient-to-r from-blue-500 via-blue-600 to-cyan-500 bg-clip-text text-transparent">
                    Empowering Texas { ' ' }
                  </span>
                   with Smarter, Cleaner Energy Choices!
                
                </motion.h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-xl mb-8">
                  Compare rates from 30+ energy suppliers and find the perfect plan for your business in just minutes.
                </p>
                <motion.div
                  animate={{
                    y: [0, 12, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="hidden md:flex justify-center mt-12 mb-4"
                >
                  <FiChevronDown className="w-8 h-8 text-blue-500 dark:text-blue-400" />
                </motion.div>
                <Image
                  src={heroImage}
                  alt="Energy Solutions"
                  width={600}
                  height={400}
                  className="lg:hidden w-full rounded-xl shadow-lg"
                  priority
                />
              </div>
              <div className="hidden lg:block relative h-full min-h-[500px]">
                <Image
                  src={heroImage}
                  alt="Energy Solutions"
                  className="object-cover object-center rounded-r-2xl"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-white/80 dark:from-black/80 to-transparent" />
              </div>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-20">
            <div className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { step: "1", text: "15-Minute Setup" },
                  { step: "2", text: "Compare Providers" },
                  { step: "3", text: "Save on Energy" }
                ].map(({ step, text }, index) => (
                  <motion.div 
                    key={step}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="group p-6 bg-gray-50 dark:bg-gray-900 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
                  >
                    <div className="flex md:hidden items-center space-x-4">
                      <span className="flex items-center justify-center w-10 h-10 text-sm font-semibold text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-400 rounded-full">
                        {step}
                      </span>
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        {text}
                      </span>
                    </div>

                    <div className="hidden md:flex flex-col items-center text-center space-y-4">
                      <span className="flex items-center justify-center w-16 h-16 text-2xl font-bold text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-400 rounded-full transition-transform group-hover:scale-110 duration-200">
                        {step}
                      </span>
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        {text}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="pt-8 border-t border-gray-100 dark:border-gray-800">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-6">
                  Trusted by Industry Leaders
                </p>
                <div className="flex flex-wrap items-center gap-12 justify-center">
                  {[partner1, partner2, partner3].map((partner, index) => (
                    <Image
                      key={index}
                      src={partner}
                      alt={`Partner ${index + 1}`}
                      width={120}
                      height={48}
                      className="h-8 w-auto opacity-75 hover:opacity-100 transition-opacity duration-200"
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:sticky lg:top-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-200"
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                  Get Your Free Quote
                </h2>
                <Form />
              </motion.div>
            </div>
          </div>
        </main>
      </motion.div>
    </>
  );
};

export default LandingPage;