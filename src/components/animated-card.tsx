import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Card } from '@/components/ui/card';
type Direction = 'left' | 'right' | 'bottom';
export const AnimatedCard = ({
  children,
  direction,
  className,
}: {
  children: React.ReactNode;
  direction: Direction;
  className?: string;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });
  const directionMap = {
    left: {
      start: { opacity: 0, x: -50 },
      end: { opacity: 1, x: 0 },
    },
    right: {
      start: { opacity: 0, x: 50 },
      end: { opacity: 1, x: 0 },
    },
    bottom: {
      start: { opacity: 0, y: 50 },
      end: { opacity: 1, y: 0 },
    },
  };
  const start = directionMap[direction].start;
  const end = directionMap[direction].end;
  return (
    <motion.div
      ref={ref}
      initial={start}
      animate={isInView ? end : start}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={className}
    >
      <Card className='overflow-hidden'>{children}</Card>
    </motion.div>
  );
}
