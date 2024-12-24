import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FormProvider } from "@context/FormProvider";
import LandingPage from './pages/LandingPage';
import ThankYouPage from './pages/ThankYouPage';
import { HelmetProvider } from 'react-helmet-async';

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <FormProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/thank-you" element={<ThankYouPage />} />
          </Routes>
        </FormProvider>
      </BrowserRouter>
    </HelmetProvider>
  )
}

export default App;
