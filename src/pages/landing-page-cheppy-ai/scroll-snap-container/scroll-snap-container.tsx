import type { FC, ReactNode } from 'react';
import styles from './scroll-snap.module.css';

interface ScrollSnapContainerProps {
   children: ReactNode;
}

export const ScrollSnapContainer: FC<ScrollSnapContainerProps> = ({ children }) => {
   return <div className={styles.container}>{children}</div>;
};

interface ScrollSnapFrameProps {
   children: React.ReactNode;
   scrollable?: boolean;
   style?: React.CSSProperties;
}

export const ScrollSnapFrame: FC<ScrollSnapFrameProps> = ({ children, scrollable, style }) => {
   return (
      <section className={scrollable ? styles.scrollableFrame : styles.frame} style={style}>
         {children}
      </section>
   );
};
