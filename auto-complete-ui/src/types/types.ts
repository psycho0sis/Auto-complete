export interface IPage {
  body: HTMLBodyElement;
  render(): void;
}

export interface IHTMLInputElement extends HTMLInputElement {
  type: string;
  placeholder: string;
}

export interface IResults {
  data: string[];
  getResults: Function;
  showResult(array: string[], prefix: string): void;
  getInfo(func: Function, data: string[]): void;
}
