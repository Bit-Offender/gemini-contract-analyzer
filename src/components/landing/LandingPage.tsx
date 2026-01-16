import Link from "next/link";
import React from "react";
import Header from "./Header";
import Hero from "./Hero";
import Footer from "./Footer";
import UploadSection from "./UploadSection";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-slate-950">
      <Header />
      <Hero />
      <UploadSection />
      <Footer />
    </div>
  );
};

export default LandingPage;
