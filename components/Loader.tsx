"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { PawPrint } from "lucide-react";

export default function Loader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(10px)" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          // DÜZELTME:
          // bg-[#FDFBF7]/80 -> Rengi koyulaştırdık (Daha tok, sisli görünür).
          // backdrop-blur-3xl -> Arkadaki her şeyi birbirine sokan güçlü blur.
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#FDFBF7]/80 backdrop-blur-3xl"
        >
          <div className="flex flex-col items-center gap-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ 
                scale: [0.8, 1.1, 0.8], 
                opacity: 1, 
                rotate: [0, 10, -10, 0] 
              }}
              transition={{ 
                duration: 1.5, 
                ease: "easeInOut",
                repeat: Infinity, 
              }}
            >
              <PawPrint className="w-16 h-16 md:w-20 md:h-20 text-black fill-black/10 stroke-[1.5]" />
            </motion.div>

            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-[10px] font-bold tracking-[0.4em] uppercase text-black/60"
            >
              GavgavPet
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}