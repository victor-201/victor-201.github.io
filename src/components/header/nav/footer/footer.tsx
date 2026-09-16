import { translate } from '../../anim';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <div className="flex items-end flex-wrap text-[12px] uppercase mt-10 lg:justify-between">
      <ul className="w-1/2 mt-2.5 overflow-hidden list-none p-0 lg:w-auto">
        <motion.li
          custom={[0.3, 0]}
          variants={translate}
          initial="initial"
          animate="enter"
          exit="exit"
        >
          {/* space */}
          <span className="text-muted-foreground">Inspired by:</span> Studio Lumio
        </motion.li>
      </ul>
      <ul className="w-1/2 mt-2.5 overflow-hidden list-none p-0 lg:w-auto">
        <motion.li
          custom={[0.3, 0]}
          variants={translate}
          initial="initial"
          animate="enter"
          exit="exit"
        >
          <span className="text-muted-foreground">Typography:</span> Inter
        </motion.li>
      </ul>
      <ul className="w-1/2 mt-2.5 overflow-hidden list-none p-0 lg:w-auto">
        <motion.li
          custom={[0.3, 0]}
          variants={translate}
          initial="initial"
          animate="enter"
          exit="exit"
        >
          <span className="text-muted-foreground">Images:</span> Unsplash
        </motion.li>
      </ul>
      <ul className="w-1/2 mt-2.5 overflow-hidden list-none p-0 lg:w-auto">
        <motion.li
          custom={[0.3, 0]}
          variants={translate}
          initial="initial"
          animate="enter"
          exit="exit"
        >
          Blog
        </motion.li>
        <motion.li
          custom={[0.3, 0]}
          variants={translate}
          initial="initial"
          animate="enter"
          exit="exit"
        >
          Newsletter
        </motion.li>
      </ul>
    </div>
  );
}
