import { PageComponent } from './components/page.js';

class App {
  private readonly page: PageComponent;
  constructor(appRoot: HTMLElement) {
    this.page = new PageComponent();
    this.page.attachTo(appRoot);
  }
}

// type assertion - document is not dynamic
new App(document.querySelector('.document')! as HTMLElement);
