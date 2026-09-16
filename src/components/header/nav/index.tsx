import { useState } from "react";
import { motion } from "framer-motion";
import { height } from "../anim";
import Body from "./body/body";
import Footer from "./footer/footer";
import Image from "./image/image";

import { links } from "@/components/header/config";
import { cn } from "@/lib/utils";

interface IndexProps {
  setIsActive: (isActive: boolean) => void;
}

interface SelectedLinkState {
  isActive: boolean;
  index: number;
}

const Index: React.FC<IndexProps> = ({ setIsActive }) => {
  const [selectedLink, setSelectedLink] = useState<SelectedLinkState>({
    isActive: false,
    index: 0,
  });

  return (
    <motion.div
      variants={height}
      initial="initial"
      animate="enter"
      exit="exit"
      className="overflow-hidden"
    >
      <div className={cn('relative flex gap-[50px] mb-3 justify-end sm:justify-start lg:mb-0 lg:justify-between')}>
        <div className="flex flex-col justify-between">
          <Body
            links={links}
            selectedLink={selectedLink}
            setSelectedLink={setSelectedLink}
            setIsActive={setIsActive}
          />
          {/* <Footer /> */}
        </div>
        <Image
          src={links[selectedLink.index].thumbnail}
          isActive={selectedLink.isActive}
        />
        {/* <p>{links[selectedLink.index].thumbnail}</p> */}
      </div>
    </motion.div>
  );
};

export default Index;
