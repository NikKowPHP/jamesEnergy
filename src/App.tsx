import './App.css'
import { FormProvider } from "@context/FormProvider";
import LandingPage from './pages/LandingPage';

function App() {

  return (
    <FormProvider>
      <LandingPage />
    </FormProvider>
  )
}

export default App
