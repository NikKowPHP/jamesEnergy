import { motion } from "framer-motion";
import Form from "@components/form/Form";

const LandingPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-white"
    >
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-2xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Welcome to Energy Solutions
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Transform your energy management with our innovative solutions
            </p>
          </div>

          {/* Form Section */}
          <Form />
        </div>
      </main>
    </motion.div>
  );
};

export default LandingPage; 