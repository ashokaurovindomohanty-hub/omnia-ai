import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import AdvancedFeatures from "./components/AdvancedFeatures";
import CoreCapabilities from "./components/CoreCapabilities";
import DemoRequest from "./components/DemoRequest";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import Demo from "./pages/Demo";
function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <CoreCapabilities />
        <AdvancedFeatures />
        <DemoRequest />
      </main>
      <Footer />
    </>
  );
}
function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/demo" element={<Demo />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </div>
  );
}
export default App;
