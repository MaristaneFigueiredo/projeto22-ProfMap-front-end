declare module 'react-bingmaps' {
    import { Component } from 'react';
  
    interface BingMapConfig {
      center: [number, number];
      zoom: number;
    }
  
    export class BingMap extends Component<{
      bingMapsKey: string;
      mapOptions: BingMapConfig;
      style?: React.CSSProperties;
    }> {}
  }
  