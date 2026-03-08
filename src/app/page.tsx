import Image from "next/image";
import LandingPage from "./landing-page/page";
import Navbar from "@/components/layout/Navbar";
import FloatingCTA from "@/components/shared/FloatingCTA";
import CookieConsent from "@/components/shared/CookieConsent";
import BackToTop from "@/components/shared/BackToTop";

export default function Home() {
  return (
  <div>
    <Navbar />
    <LandingPage />
    <FloatingCTA />
    <CookieConsent />
    <BackToTop />
  </div>
  );
}
