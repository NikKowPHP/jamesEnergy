import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FormProvider } from "@context/FormProvider";
import LandingPage from './pages/LandingPage';
import ThankYouPage from './pages/ThankYouPage';

function App() {
  return (
    <BrowserRouter>
      <FormProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/thank-you" element={<ThankYouPage />} />
        </Routes>
      </FormProvider>
    </BrowserRouter>
  )
}

export default App;
