import {
  AppButton,
  AppButtonFactory,
  AppButtonHelper,
} from './components/base/appButton.js';
import { AppSelect, AppSelectHelper } from './components/base/appSelect.js';
import { AppTable, AppTableHelper } from './components/table/appTable.js';
import { API } from './config/apiConfig.js';

export class Main {
  static init() {
    this.define();
    this.load();
  }

  static define() {
    AppTableHelper.define();
    AppSelectHelper.define();
    AppButtonHelper.define();
  }

  static load() {
    this.#loadTable();
    // this.#loadSelects();
    // this.#loadBtns();
  }

  static #loadSelects() {
    const select = new AppSelect();
    select._props = AppSelectHelper.props({
      id: 'test',
      name: 'test',
      title: 'Test',
      multiple: true,
      size: 3,
      url: API.REGION_OPTIONS,
    });

    const selectTwo = new AppSelect();
    selectTwo._props = AppSelectHelper.props({
      id: 'test2',
      name: 'test2',
      title: 'Test 2',
      url: API.REGION_OPTIONS,
    });

    document.body.appendChild(select);
    document.body.appendChild(selectTwo);
  }

  static #loadBtns() {
    const btnDefault = new AppButton();
    btnDefault._props = AppButtonHelper.props({
      btnType: AppButtonHelper.BTN_TYPE.DEFAULT,
    });

    const btnAccept = new AppButton();
    btnAccept._props = AppButtonHelper.props({
      btnType: AppButtonHelper.BTN_TYPE.ACCEPT,
    });

    const btnQuery = new AppButton();
    btnQuery._props = AppButtonHelper.props({
      btnType: AppButtonHelper.BTN_TYPE.QUERY,
    });

    document.body.appendChild(btnDefault);
    document.body.appendChild(btnAccept);
    document.body.appendChild(btnQuery);

    document.body.appendChild(AppButtonFactory.acceptModalBtn({}));
    document.body.appendChild(AppButtonFactory.closeModalBtn());
    document.body.appendChild(AppButtonFactory.managementBtn({}));
  }

  static #loadTable() {
    const table = new AppTable();
    table._props = AppTableHelper.props({
      tableTitleProps: AppTableHelper.tableTitleProps({ title: 'Prueba' }),
      remoteDataProps: AppTableHelper.remoteDataProps({
        columnsFormatter: AppTableHelper.DEFAULT_COLUM_FORMATTER,
      }),
    });

    const btn = new AppButton();
    btn._props = AppButtonHelper.props({
      callbacks: [
        () => {
          table.updateRemoteData({ url: API.TABLE });
        },
      ],
    });

    document.body.appendChild(btn);
    document.body.appendChild(table);
  }
}

Main.init();
