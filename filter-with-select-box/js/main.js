import { defineAppFilter } from './components/app-filter.js';
import { defineSelectBox } from './components/app-select-box.js';

export class Main {
  init() {
    defineSelectBox();
    defineAppFilter();
  }
}

const main = new Main();
main.init();
