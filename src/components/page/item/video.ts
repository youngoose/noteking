import { BaseComponent } from '../../component.js';

export class VideoComponent extends BaseComponent<HTMLElement> {
  constructor(title: string, url: string) {
    super(`<section class="video">
            <div class="video__player"><iframe class="video__iframe"></iframe></div>
            <h3 class="video__title"></h3>
          </section>`);

    console.log(url);

    const iframe = this.element.querySelector(
      '.video__iframe'
    )! as HTMLIFrameElement;
    iframe.src = 'https://www.youtube.com/embed/zsu2n-SbTrY'; // url -> videoId -> embed

    const titleElement = this.element.querySelector(
      '.video__title'
    )! as HTMLHeadingElement;
    titleElement.textContent = title;
  }
}

/**
<iframe
  width="1280"
  height="720"
  src="https://www.youtube.com/embed/zsu2n-SbTrY"
  title="A Christmas Coffee Shop Ambience with Relaxing Jazz Music, Cafe Sounds For Study, Work"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen
></iframe>
 */
