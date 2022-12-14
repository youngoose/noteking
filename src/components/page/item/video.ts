import { BaseComponent } from '../../component.js';

export class VideoComponent extends BaseComponent<HTMLElement> {
  constructor(title: string, url: string) {
    super(`<section class="video">
            <div class="video__player"><iframe class="video__iframe"></iframe></div>
            <h3 class="video__title"></h3>
          </section>`);

    const iframe = this.element.querySelector(
      '.video__iframe'
    )! as HTMLIFrameElement;
    iframe.src = this.convertToEmbeddedURL(url);

    const titleElement = this.element.querySelector(
      '.video__title'
    )! as HTMLHeadingElement;
    titleElement.textContent = title;
  }

  // input
  // https://www.youtube.com/watch?v=zsu2n-SbTrY
  // https://youtu.be/zsu2n-SbTrY
  // output
  // https://www.youtube.com/embed/zsu2n-SbTrY
  // Regex

  private convertToEmbeddedURL(url: string): string {
    const embed = `https://www.youtube.com/embed/`;
    const regExp =
      /^(?:https?:\/\/)?(?:www\.)?(?:(?:youtube.com\/(?:(?:watch\?v=)|(?:embed\/))([a-zA-Z0-9-]{11}))|(?:youtu.be\/([a-zA-Z0-9-]{11})))/;
    const match = url.match(regExp);

    const videoId = match ? match[1] || match[2] : undefined;
    if (videoId) {
      return `${embed}${videoId}`;
    }
    return url;
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
