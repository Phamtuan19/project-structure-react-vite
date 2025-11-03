declare module 'three/examples/jsm/loaders/OBJLoader' {
   import { Loader, Group } from 'three';
   export class OBJLoader extends Loader {
      constructor();
      load(
         url: string,
         onLoad: (obj: Group) => void,
         onProgress?: (ev: ProgressEvent) => void,
         onError?: (err: any) => void,
      ): void;
      parse(text: string): Group;
   }
}
