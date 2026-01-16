"use client";

import React from "react";
import { AuroraText } from "@/components/ui/aurora-text";
import { FlipWords } from "../ui/flip-words";
import { ArrowDown } from "lucide-react";
import { motion } from "motion/react";

const Hero = () => {
  const words = ["Signing", "Agreeing To", "Committing To"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.1 }}
      viewport={{ once: true }}
    >
      <div className="flex flex-col justify-center text-center items-center mt-18 space-y-10">
        <div className="text-4xl tracking-wide font-bold leading-13">
          Understand What You&apos;re <br />
          <span className="inline-block min-w-[280px] text-center">
            <FlipWords words={words} className="text-white" />
          </span>
        </div>
        <div className="text-lg text-gray-400">
          Detect hidden risks, unfair clauses and legal traps in contracts using
          Gemini.
        </div>
        <div className="text-2xl flex flex-col items-center font-semibold">
          Upload a PDF or picture to Analyze
          <ArrowDown className="animate-bounce mt-14" size={50} />
        </div>
      </div>
    </motion.div>
  );
};

export default Hero;
