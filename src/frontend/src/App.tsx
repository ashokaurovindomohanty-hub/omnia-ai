import { Toaster } from "@/components/ui/sonner";
import AdvancedFeatures from "./components/AdvancedFeatures";
import CoreCapabilities from "./components/CoreCapabilities";
import DemoRequest from "./components/DemoRequest";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <HeroSection />
        <CoreCapabilities />
        <AdvancedFeatures />
        <DemoRequest />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;
