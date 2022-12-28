import { Component } from './components/component.js';
import {
  InputDialog,
  MediaData,
  TextData,
} from './components/dialog/dialog.js';
import { MediaSectionInput } from './components/dialog/input/media-input.js';
import { TextSectionInput } from './components/dialog/input/text-input.js';
import { ImageComponent } from './components/page/item/image.js';
import { NoteComponent } from './components/page/item/note.js';
import { TodoComponent } from './components/page/item/todo.js';
import { VideoComponent } from './components/page/item/video.js';
import {
  Composable,
  PageComponent,
  PageItemComponent,
} from './components/page/page.js';

type InputComponentConstructor<T = MediaSectionInput | TextSectionInput> = {
  new (): T;
};
class App {
  private readonly page: Component & Composable;

  constructor(appRoot: HTMLElement, private dialogRoot: HTMLElement) {
    this.page = new PageComponent(PageItemComponent);
    this.page.attachTo(appRoot);

    // For demo :)
    this.page.addChild(
      new ImageComponent('Image Title', 'https://picsum.photos/800/400')
    );
    this.page.addChild(
      new VideoComponent(
        'Video Title',
        'https://www.youtube.com/watch?v=wcIf3huwFhc'
      )
    );
    this.page.addChild(
      new NoteComponent('Note Title', 'Checklist before the demo')
    );
    this.page.addChild(new TodoComponent('Todo Title', 'Pay the bill!'));
    this.page.addChild(
      new ImageComponent('Image Title', 'https://picsum.photos/600/300')
    );
    this.page.addChild(
      new VideoComponent(
        'Video Title',
        'https://www.youtube.com/watch?v=WBMhOZqhQbU'
      )
    );
    this.page.addChild(new NoteComponent('Note Title', 'DO NOT MULTITASKING'));
    this.page.addChild(new TodoComponent('Todo Title', 'Create a project!'));

    this.bindElementToDialog(
      '#new-image',
      MediaSectionInput,
      (input: MediaSectionInput) => new ImageComponent(input.title, input.url)
    );

    this.bindElementToDialog(
      '#new-video',
      MediaSectionInput,
      (input: MediaSectionInput) => new VideoComponent(input.title, input.url)
    );

    this.bindElementToDialog(
      '#new-note',
      TextSectionInput,
      (input: TextSectionInput) => new NoteComponent(input.title, input.body)
    );

    this.bindElementToDialog(
      '#new-todo',
      TextSectionInput,
      (input: TextSectionInput) => new TodoComponent(input.title, input.body)
    );
    // TODO: console.table
  }

  private bindElementToDialog<T extends (MediaData | TextData) & Component>(
    selector: string,
    InputComponent: InputComponentConstructor<T>,
    makeSection: (input: T) => Component
  ) {
    const element = document.querySelector(selector)! as HTMLButtonElement;
    element.addEventListener('click', () => {
      const dialog = new InputDialog();
      const input = new InputComponent();
      dialog.addChild(input);
      dialog.attachTo(this.dialogRoot);
      dialog.setOnCloseListener(() => {
        dialog.removeFrom(this.dialogRoot);
      });
      dialog.setOnSubmitListener(() => {
        const image = makeSection(input);
        this.page.addChild(image);
        dialog.removeFrom(this.dialogRoot);
      });
    });
  }
}

// type assertion - document is not dynamic
new App(document.querySelector('.document')! as HTMLElement, document.body);
