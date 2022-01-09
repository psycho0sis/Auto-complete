import { IResults } from "./types/types";
import { Page } from "./Page";

const page: Page = new Page();
page.render();

export class Results implements IResults {
  readonly data: string[];
  readonly getResults: Function;

  constructor(getResults: Function, data: string[]) {
    this.data = data;
    this.getResults = getResults;
  }

  list: HTMLUListElement = document.createElement("ul");

  public showResult(array: string[], prefix: string): void {
    this.list.classList.add("auto-complete__list");
    page.container.append(this.list);

    const prefixToBold = (item: string, prefix: string): string => {
      const prefixLength: number = prefix.length;
      const prefixItem: string = item.slice(0, prefixLength).bold();
      const resultItem: string = prefixItem + item.slice(prefixLength);

      return resultItem;
    };

    const loadAll = (array: string[], prefix: string): void => {
      let i = 0;
      while (i <= array.length) {
        this.list.innerHTML += `<li class="auto-complete__item">${prefixToBold(
          array[i],
          prefix
        )}</li>`;
        i++;

        if (i === array.length)
          this.list.innerHTML += `<li class="auto-complete__final-item">Finish</li>`;
      }
    };

    const loadMore = (array: string[], prefix: string): void => {
      for (let i = 0; i < array.length; i++) {
        this.list.innerHTML += `<li class="auto-complete__item">${prefixToBold(
          array[i],
          prefix
        )}</li>`;
        array.splice(i, 1);

        if (array.length === 0)
          this.list.innerHTML += `<li class="auto-complete__final-item">Finish</li>`;
      }
    };

    if (array.length > 20) {
      loadMore(array, prefix);
      this.list.addEventListener("scroll", (): void => {
        if (
          this.list.scrollTop + this.list.clientHeight >=
          this.list.scrollHeight
        ) {
          loadMore(array, prefix);
        }
      });
    } else {
      loadAll(array, prefix);
    }
  }

  public getInfo(getResults: Function, data: string[]): void {
    page.input.addEventListener("change", () => {
      const value: string = page.input.value;
      const result: string[] = getResults(data)(value);

      if (value && result.length > 0) {
        this.list.innerHTML = "";
        page.container.innerHTML = "";
        this.showResult(result, value);
      } else {
        page.container.innerHTML = `<p class="auto-complete__no-results">Nothing found...</p>`;
        this.list.innerHTML = "";
      }
    });
  }
}
