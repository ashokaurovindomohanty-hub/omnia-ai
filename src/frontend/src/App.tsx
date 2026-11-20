import { Toaster } from "@/components/ui/sonner";
import AdvancedFeatures from "./components/AdvancedFeatures";
import CoreCapabilities from "./components/CoreCapabilities";
import DemoRequest from "./components/DemoRequest";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import Demo from "./pages/Demo";
import Generator from "./pages/Generator";
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
  const path = window.location.pathname;
  if (path === "/demo") return <div className="min-h-screen bg-background text-foreground"><Demo /><Toaster /></div>;
  if (path === "/generator") return <div className="min-h-screen bg-background text-foreground"><Generator /><Toaster /></div>;
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Home /><Toaster />
    </div>
  );
}
export default App;
