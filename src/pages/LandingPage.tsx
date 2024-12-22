import { motion } from "framer-motion";
import Form from "@components/form/Form";
import Image from "@components/common/Image";
import heroImage from "@/assets/hero.webp"; // Make sure to add your image to this path
import logoImage from "@/assets/logo.webp"; // Make sure to add your image to this path

const LandingPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-gray-100"
    >
      <header className="py-4 shadow-sm bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
          <Image 
            src={logoImage} 
            alt="Company Logo" 
            width={150} 
            height={50} 
            priority
          />
        </div>
      </header>
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Hero Section */}
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl leading-tight">
              Find The Best Commercial Energy Rates in Texas
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Integrity Energy works with over 30 suppliers to provide businesses with the best rates for commercial electricity and gas. Our experts work to understand your business needs, provide the best plan options, and ensure smooth ongoing energy service.
            </p>
            <div className="mt-8">
              {/* Step-by-Step Guide */}
              <div className="flex items-center justify-center md:justify-start space-x-6">
                <div className="flex items-center">
                  <span className="text-white bg-yellow-500 rounded-full p-2 mr-2">1</span>
                  <span className="text-gray-700">Connect in 15 minutes</span>
                </div>
                <div className="flex items-center">
                  <span className="text-white bg-yellow-500 rounded-full p-2 mr-2">2</span>
                  <span className="text-gray-700">Compare 30+ Providers</span>
                </div>
                <div className="flex items-center">
                  <span className="text-white bg-yellow-500 rounded-full p-2 mr-2">3</span>
                  <span className="text-gray-700">Find Your Best Rate</span>
                </div>
              </div>
              {/* Hero Image */}
              <div className="mt-8">
                <Image
                  src={heroImage}
                  alt="Energy Solutions Hero"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-lg object-cover w-full"
                />
              </div>
              {/* Trusted By Section */}
              <div className="mt-8">
                <p className="text-gray-600">Trusted By:</p>
                <div className="flex items-center justify-center md:justify-start space-x-4 mt-2">
                  <Image src="/images/partner1.png" alt="Partner 1" width={80} height={40} />
                  <Image src="/images/partner2.png" alt="Partner 2" width={80} height={40} />
                  <Image src="/images/partner3.png" alt="Partner 3" width={80} height={40} />
                </div>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Get a Free Quote</h2>
            <Form />
          </div>
        </div>
      </main>
    </motion.div>
  );
};

export default LandingPage;