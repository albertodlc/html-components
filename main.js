import { AppTable, AppTableHelper } from './components/appTable.js';

export class Main {
  static init() {
    this.define();
    this.load();
  }

  static define() {
    AppTableHelper.define();
  }

  static load() {
    const table = new AppTable();

    document.body.appendChild(table);
  }
}

Main.init();
