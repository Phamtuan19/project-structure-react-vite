import { ThreeElements } from '@react-three/fiber';

declare global {
   namespace JSX {
      type IntrinsicElements = ThreeElements;
   }
}
