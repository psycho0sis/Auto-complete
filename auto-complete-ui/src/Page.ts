import { IHTMLInputElement, IPage } from "./types/types";

import "./styles/style.scss";

export class Page implements IPage {
  readonly body: HTMLBodyElement;

  container: HTMLDivElement = document.createElement("div");
  wrapper: HTMLDivElement = document.createElement("div");
  input: IHTMLInputElement = document.createElement("input");

  constructor() {
    this.body = document.querySelector("body");
  }

  public render(): void {
    this.body.append(this.wrapper);

    this.wrapper.classList.add("auto-complete__wrapper");
    this.wrapper.innerHTML = `
      <h1 class="auto-complete__title">Auto complete</h1>
    `;

    this.input.classList.add("auto-complete__input");
    this.input.type = "text";
    this.input.placeholder = "Enter your prefix...";

    this.wrapper.append(this.input);

    this.container.classList.add("auto-complete__container");

    this.wrapper.append(this.container);
  }
}
