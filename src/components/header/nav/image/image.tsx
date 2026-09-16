import React from "react";
import { motion } from "framer-motion";
// next/image removed - using <img> tag
import { opacity } from "../../anim";
import { cn } from "@/lib/utils";

interface IndexProps {
  src: string;
  isActive: boolean;
}

const Index: React.FC<IndexProps> = ({ src, isActive }) => {
  return (
    <motion.div
      variants={opacity}
      initial="initial"
      animate={isActive ? "open" : "closed"}
      className={cn("hidden lg:block lg:relative lg:w-[500px] lg:h-[450px]")}
    >
      <img
        src={src}
        width={400}
        height={400}
        className="my-32 w-full h-auto object-cover"
        alt={"Image"}
      />
    </motion.div>
  );
};

export default Index;
