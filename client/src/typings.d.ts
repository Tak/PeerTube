/* SystemJS module definition */
declare var module: NodeModule

interface NodeModule {
  id: string
}

/* @silvermine/video.s-chromecast */

declare module '@silvermine/videojs-chromecast' {
  export default function (videojs: any, options: any): void
}
