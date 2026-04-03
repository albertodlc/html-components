import { IconConfig } from '../config/iconConfig.js';
import { ContextUtil } from '../utils/contextUtil.js';

import { TabulatorFull as Tabulator } from '../libs/tabulator_esm.min.mjs';
import { AppBaseComponent } from './appBaseComponent.js';

/**
 * Componente de Tabla. Implementa 'Tabulator' como librería.
 * ! Usamos estilos globales conun tema base
 *
 */
export class AppTable extends AppBaseComponent {
  constructor() {
    super();

    this._props = AppTableHelper.props({});
  }

  // * --- Renderiza el esqueleto del componente
  _render() {
    // Limpiar en re-render
    this.innerHTML = '';

    const { tableProps, tableTitleProps } = this._props;

    // MERGE: Todos los props para inicializar tabla
    const tableConfig = {
      // ...remoteConfig,
      ...tableProps,
      data: [],
      columns: [],
    };

    this.#renderTable({ tableConfig, tableTitleProps });

    // * COMPONENT CSS CLASS
    this.classList.add('flex-container--available', 'full-height');

    // TODO: Clases CSS?
    // ANCHURA tabla, controlado por el contenedor <div>
    if (tableProps) {
      this.style.width = tableProps.width;
      this.style.maxWidth = tableProps.maxWidth;
    }
  }

  /**
   * Renderiza la tabla
   *
   * @param {*} tableConfig props necesarios para inicializar la tabla
   * @param {*} tableTitleProps props necesarios para inicializar la cabecera de la tabla
   *
   * @returns elemento HTML del DOM
   *
   */
  #renderTable({ tableConfig, tableTitleProps }) {
    // 1. Generar titulo (si corresponde)
    const { title } = tableTitleProps;

    if (title) {
      const tableTitle = document.createElement('div');
      tableTitle.innerHTML = title;
      tableTitle.classList.add('table__titlebar');

      this.appendChild(tableTitle);
    }

    // 2. Generar tabla
    const divWrap = document.createElement('div');
    this.appendChild(divWrap);
    this._refs.table = new Tabulator(divWrap, tableConfig);
  }

  // * --- Event wiring

  _bindEvents() {
    // Internal component events
    // this.addEventListener(
    //   AppTableHelper.COMPONENT_EVENTS.DATA_LOADED.name,
    //   this,
    // );
    // this.addEventListener(AppTableHelper.COMPONENT_EVENTS.ERROR.name, this);
    // DOM events on internal elements (set up after _render populates _refs)
    // this._refs.reloadBtn.addEventListener('click', this);
  }

  _unbindEvents() {
    this.removeEventListener(
      AppTableHelper.COMPONENT_EVENTS.DATA_LOADED.name,
      this,
    );
    this.removeEventListener(AppTableHelper.COMPONENT_EVENTS.ERROR.name, this);

    this._refs.reloadBtn.removeEventListener('click', this);
  }

  // * ── Single dispatch point

  handleEvent(event) {
    switch (event.type) {
      case AppTableHelper.COMPONENT_EVENTS.DATA_LOADED.name:
        this.#onDataLoaded(event.detail);
        break;

      case AppTableHelper.COMPONENT_EVENTS.ERROR.name:
        this.#onError(event.detail);
        break;

      case 'click':
        if (event.currentTarget === this._refs.reloadBtn) {
          this.#onReloadClick();
        }
        break;
    }
  }

  // * ── Handlers

  #onDataLoaded({ rowCount }) {}

  #onError({ message }) {}

  #onReloadClick() {}

  // * ── Hydrate emits the events

  async _hydrate() {
    const { remoteDataProps } = this._props;
    const { url, columnsFormatter } = remoteDataProps;

    if (!url) return;

    // ...populate table...
    // this._emit(
    //   AppTableHelper.COMPONENT_EVENTS.DATA_LOADED.name,
    //   AppTableHelper.COMPONENT_EVENTS.DATA_LOADED.generatePayload({
    //     rowCount: data.length,
    //   }),
    // );

    // this._emit(
    //   AppTableHelper.COMPONENT_EVENTS.ERROR.name,
    //   AppTableHelper.COMPONENT_EVENTS.ERROR.generatePayload({
    //     message: err.message,
    //   }),
    // );
  }

  /**
   * Rellenar la tabla con datos
   *
   */
  async _hydrate() {
    const { localDataProps, remoteDataProps } = this._props;

    // LOCAL
    const isLocalData =
      localDataProps?.columns &&
      localDataProps?.columns?.length > 0 &&
      localDataProps?.data &&
      localDataProps?.data.length > 0;

    if (isLocalData) {
      const { data, columns } = localDataProps;

      // Data array values
      if (data && data.length > 0) {
        this._refs.table.data = data;
      }

      // Columns values
      if (columns) {
        this._refs.table.columns = columns;
      }
    }

    // REMOTE
    const { url, columnsFormatter } = remoteDataProps;

    // Necesitamos tener 1 formatter => antes del fetch
    if (columnsFormatter) {
      /**
       * TRIGGER PRE-RENDERIZAR TABLA (adaptar formato del REQUEST)
       * - Recuperamos del RESPONSE 'data' => que son las FILAS de la tabla
       * - Recuperamos del RESPONSE 'columns' => Inicializamos las COLUMNAS de la tabla
       */
      this._refs.table.options.ajaxResponse = (url, params, response) => {
        return this.AJAX_RESPONSE_TRIGGER({
          url,
          params,
          response,
          columnsFormatter,
        });
      };
    }

    // Cargamos la URL de datos remotos
    if (columnsFormatter && url) {
      // * URL a la que llama para recuperar los datos
      // this._refs.table.options.ajaxURL = url;
      this._refs.table.setData(url);
      // ! La columna se inicializa en la respuesta al hacer el FETCH
      // ...
    }
  }

  /**
   * Parseamos al respuesta recibida del AJAX gestionado por
   * 'Tabulator' acorde al formato que necesita.
   *
   * @param {*} url
   * @param {*} params
   * @param {*} response respuesta a parsear
   * @param {*} columnsFormatter función específica para formatear la lista de columnas
   *
   * @returns datos y número de páginas
   */
  AJAX_RESPONSE_TRIGGER({ url, params, response, columnsFormatter }) {
    const { columns, data, pagination, tableOrder } = response;

    // HACK: Esto se puede mejorar seguro => Estado interno del componente o algo
    // INICIALIZAR COLUMNAS (Solo si no lo hemos hecho antes)
    const hasColumns = this._refs.table.getColumnDefinitions().length > 0;
    if (!hasColumns) {
      const formattedColumns = columnsFormatter(columns);
      this._refs.table.setColumns(formattedColumns);
    }

    // ORDEN TABLA
    const tableOrderProps = {
      sorters: tableOrder?.sorters || [],
    };

    // ACTUALIZAR PAGINACIÓN
    const paginationProps = {
      last_page:
        pagination?.totalPages || AppTableHelper.TABLE_PAGINATION.INITIAL.PAGE,
      last_row:
        pagination?.lastRow || AppTableHelper.TABLE_PAGINATION.INITIAL.ROWS,
    };

    // ACTUALIZAR FILAS
    return {
      data,
      ...paginationProps,
      ...tableOrderProps,
    };
  }

  // * --- EXTERNAL API
  /**
   * Recupera las filas seleccionadas por el usuario
   *
   * @returns [] array con los datos de las columnas
   *
   */
  retrieveSelectedRowsData() {
    return this._refs.table.getSelectedData();
  }
  /**
   * Borrar las filas de la tabla y reiniciar la paginación
   *
   */
  clearData() {
    // TODO: Por evitar que se pueda relanzar desde el boton de paginacion

    // Reset internal pagination state WITHOUT triggering a request
    const pageModule = this._refs.table.modules.page;

    if (pageModule) {
      pageModule.page = 1;
      pageModule.remoteRowCountEstimate = 0;
      pageModule.max = 1;
      pageModule.size = 25;
    }

    // Clear the table data
    this._refs.table.replaceData([]);
    this._refs.table.redraw();
  }

  /**
   * * GET
   *
   * Actualiza los datos de la tabla, relanzando la petición. Se le puede
   * no pasar ningún parámetro, pero se tienen que haber inicializado previamente.
   *
   * @param url endpoint al que llamar
   * @param columnsFormatter en caso de tener diferentes columnas, se tienen que re-declarar
   *
   */
  updateRemoteData({ url, columnsFormatter }) {
    if (columnsFormatter) {
      this._props.remoteDataProps.columnsFormatter = columnsFormatter;
    }

    if (url) {
      this._props.remoteDataProps.url = url;
    }

    // this.#hydrate();
  }

  // GETTERs && SETTERs
  get props() {
    return this._props;
  }

  set props(values) {
    // SOLO se reemplazan los nuevos que se pasen
    this._props.tableProps = {
      ...this._props.tableProps,
      ...values.tableProps,
    };

    this._props.localDataProps = {
      ...this._props.localDataProps,
      ...values.localDataProps,
    };

    this._props.remoteDataProps = {
      ...this._props.remoteDataProps,
      ...values.remoteDataProps,
    };

    this._props.tableTitleProps = {
      ...this._props.tableTitleProps,
      ...values.tableTitleProps,
    };

    if (this._mounted) this._render();
  }
}

/**
 * Clase helper asociada al componente de 'AppTable'
 *
 */
export class AppTableHelper {
  static TAG = 'app-table';

  // ! FORMATTERS
  // ! Formatters estándar (de uso habitual)
  // https://tabulator.info/docs/6.3/format#overview
  static STD_FORMATTERS = {
    DEFAUlT: (cell, formatterParams) => {
      const value = cell.getValue();

      // ! EARLY RETURN: Valor no valido
      if (!value) {
        return '--';
      }

      return value;
    },
    CONDITIONAL_BG_COLOR: (cell, formatterParams) => {
      const FONT_CONTRAST = '#FFF';

      const value = Number(cell.getValue());
      const cellElem = cell.getElement();

      if (value > 0 && value <= 1.0) {
        cellElem.style.backgroundColor = 'var(--accent-green)';
      }

      if (value > 1.0 && value <= 5.0) {
        cellElem.style.backgroundColor = 'var(--gold)';
      }

      if (value > 5.0 && value <= 10.0) {
        cellElem.style.backgroundColor = 'var(--red)';
      }

      if (value > 10.0) {
        cellElem.style.backgroundColor = 'var(--dark-red)';
        cellElem.style.color = FONT_CONTRAST;
      }

      return value;
    },
    CONDITIONAL_FONT_COLOR: (cell, formatterParams) => {
      const value = Number(cell.getValue());
      const cellElem = cell.getElement();

      if (value > 0 && value <= 1.0) {
        cellElem.style.color = 'var(--accent-green)';
      }

      if (value > 1.0 && value <= 5.0) {
        cellElem.style.color = 'var(--gold)';
      }

      if (value > 5.0 && value <= 10.0) {
        cellElem.style.color = 'var(--red)';
      }

      if (value > 10.0) {
        cellElem.style.color = 'var(--dark-red)';
      }

      return value;
    },
    SPANISH_DATE: (cell, formatterParams) => {
      const value = cell.getValue();

      return DateUtil.parseToSpanish(value);
    },
    LINK: (cell, formatterParams) => {
      const value = cell.getValue();

      // ! EARLY RETURN: Valor no valido
      if (!value) {
        return '--';
      }

      return `<a href='#'>${value}</a>`;
    },
    ACTION: (cell, formatterParams) => {
      const { actionName } = formatterParams;

      return `<a href='#'>${actionName}</a>`;
    },
    TICKBOX: () => {
      return {
        formatter: 'rowSelection',
        titleFormatter: 'rowSelection',
        titleFormatterParams: {
          // only toggle the values of the active filtered rows
          rowRange: 'active',
        },
        hozAlign: 'center',
        headerSort: false,
        cellClick: (e, cell) => {},
      };
    },
  };

  // ! TABLE PROPS
  static TABLE_LAYOUT = {
    FIT_DATA: 'fitData', // Fit columns to data
    FIT_DATA_TABLE: 'fitDataTable', // Fit columns and table to data
    FIT_DATA_FILL: 'fitDataFill', // Fit columns and data and fill
    FIT_DATA_STRETCH: 'fitDataStretch', // Fit Columns to Data and Stretch Last Column
    FIT_COLUMNS: 'fitColumns', // Fit Columns to Table Width
  };

  // ! LOCALES
  static ES_LOCAL = {
    data: {
      loading: '',
      error: '',
    },
    groups: {
      item: 'elemento',
      items: 'elementos',
    },
    pagination: {
      page_size: 'Filas',
      page_title: 'Mostrar página',
      first: 'Primera',
      first_title: 'Primera página',
      last: 'Última',
      last_title: 'Última página',
      prev: 'Anterior',
      prev_title: 'Página anterior',
      next: 'Siguiente',
      next_title: 'Página siguiente',
      all: 'Todos',
      counter: {
        showing: '',
        of: 'de',
        rows: 'filas',
        pages: 'páginas',
      },
    },
  };

  // ! TABLE COLUMNS PROPS
  static COLUMN_SORTER = {
    STRING: 'string',
    NUMERIC: 'number',
    ALPHANUMERIC: 'alphanum',
    BOOLEAN: 'boolean',
    EXISTS: 'exists',
  };

  // ! CUSTOM EVENTS
  static TABLE_CUSTOM_EVENTS = {
    RELOAD: {
      name: 'appTable:reload',
      generatePayload: ({ tableId }) => {
        return { tableId: tableId };
      },
    },
  };

  // ! PAGINATION ATTR.
  static TABLE_PAGINATION = {
    INITIAL: {
      PAGE: 0,
      RECORD: 0,
      ROWS: 0,
      SIZE: 25,
      SIZE_SELECTOR: [10, 15, 25, 50],
    },
    TYPE: {
      LOCAL: 'local',
      REMOTE: 'remote',
    },
    OUT_OF_RANGE: {
      // show the last page if pagination is out of range
      LAST: 'last',
    },
    SORT: {
      REMOTE: 'remote',
    },
    COUNTER: {
      ROWS: 'rows',
      PAGES: 'pages',
    },
  };

  static TABLE_ROWS = {
    SELECTABLE: {
      ONE: 1,
      MULTIPLE: true,
    },
  };

  // ! DEFAULT => 'Loading' Template
  static DATA_LOADER = () => {
    return `
      <div class='flex-row  flex--gapped-7 flex--centered flex-self--centered' style='font-weight:bold; font-size: 12px; color:var(--dark-green) !important;'>
        <img src="${ContextUtil.getFullContext()}/img/loaders/loading.gif" alt="loader" height="40" />
        <span class='flex-row flex--centered flex-self--centered'>Cargando...</span>
      </div>`;
  };

  static ERROR_LOADER = () => {
    return `      
      <div class='flex-row  flex--gapped-7 flex--centered flex-self--centered' style='font-weight:bold; font-size: 12px;'>
      <span>${IconConfig.ERROR}</span>  
      <span class='flex-row flex--centered flex-self--centered'>Error...</span>
      </div>`;
  };

  /**
   * Adaptamos la URL del AJAX dinámicamente según los valores recibidos en el request
   *
   * @param {*} url the url from the ajaxURL property or setData function
   * @param {*} config the request config object from the ajaxConfig property
   * @param {*} params the params object from the ajaxParams property, this will also include any pagination, filter and sorting properties based on table setup
   *
   * @returns
   */
  static AJAX_URL_TRIGGER = (url, config, params) => {
    // FIXME: Limitación de 'Tabulator' parece que tiene los selectores de la paginación empiezan en 1 siempre
    // HACK: Hacemos esto para que empiecen en 0 y asi el backend los procese correctamente
    // HACK: En caso de NO recibir un valor por defecto del backend => Se lo ponemos en el frontend
    const pageParam = params?.page
      ? params?.page - 1
      : AppTableHelper.TABLE_PAGINATION.INITIAL.PAGE;

    const pageSize = params?.size
      ? params?.size
      : AppTableHelper.TABLE_PAGINATION.INITIAL.SIZE;

    // OPTIMIZE: Parse Tabulator sort array to Springboot REST format
    const sortParams = params.sort
      .map((s) => `sort=${s.field},${s.dir}`)
      .join('&');

    const sortParamUri = sortParams ? `&${sortParams}` : sortParams;

    // FIXME: En caso de que ya vengan parámetros en la URL los mantenemos
    return url.includes('?')
      ? `${url}&page=${pageParam}&size=${pageSize}${sortParamUri}`
      : `${url}?page=${pageParam}&size=${pageSize}${sortParamUri}`;
  };

  static AJAX_REQUEST_TRIGGER = (url, config, params) => {
    // * Sustituye a 'ajaxURLGenerator'
    const finalUrl = AppTableHelper.AJAX_URL_TRIGGER(url, config, params);

    return fetch(finalUrl, { redirect: 'manual' }).then((response) => {
      if (response.status === 302 || response.type === 'opaqueredirect') {
        PageUtil.redirectToErrorPage({
          errors: [new CustomError({ title: 'Ha caducado la sesión' })],
        });
      }

      if (!response.ok) {
        PageUtil.redirectToErrorPage({
          errors: [new CustomError({ title: 'Ha caducado la sesión' })],
        });
      }

      return response.json();
    });
  };

  /**
   *  Propiedades de datos remotos para renderizar la tabla de resultados
   *
   * @param {*} url string que realiza un fetch al backend y devuelve los datos en un formato compatible con 'Tabulator'
   * @param {*} columnsFormatter formatters de las columnas de la tabla. Generalmente un callback que indica como
   * se tiene que renderizar la celda
   *
   * @returns objeto parseado con los datos de entrada
   *
   */
  static remoteDataProps({ url = null, columnsFormatter = null }) {
    return { url, columnsFormatter };
  }

  /**
   * Propiedades de datos locales para renderizar la tabla de resultados
   *
   * @param {*} data array de {} que representan cada fila de la tabla
   * @param {*} columns array de {} que representan cada columna de la tabla
   *
   * @returns objeto parseado con los datos de entrada
   *
   */
  static localDataProps({ data = [], columns = [] }) {
    return { data, columns };
  }

  /**
   * Propiedades de la tabla. Inicializa con los valores por defecto
   * y actualiza con los valores que pasa el usuario.
   *
   * @param {*} param0 parámetros de la tabla a sobreescribir
   *
   * @returns propiedades finales mergeadas en 1 único objeto
   *
   */
  static tableProps(customProps = {}) {
    const tableLayoutProps = {
      layoutColumnsOnNewData: true,
      height: '311px',
      // ! Añadido al Style de la tabla manualmente, la LIB no lo gestiona
      width: '100%',
      maxWidth: '1150px',
      maxHeight: '70vh',
      layout: AppTableHelper.TABLE_LAYOUT.FIT_DATA_FILL,
      placeholder: 'Sin datos...',
      // FIXME: https://github.com/olifolkerd/tabulator/issues/3654
      renderVertical: 'basic',
      // ! https://tabulator.info/docs/6.3/layout#virtual-dom-buffer
      // renderVerticalBuffer: 200, // ! px
    };

    const rowsProps = {
      selectableRows: AppTableHelper.TABLE_ROWS.SELECTABLE.ONE,
    };

    // * PAGINATION
    const paginationProps = {
      pagination: true,
      paginationMode: AppTableHelper.TABLE_PAGINATION.TYPE.LOCAL,
      paginationSize: AppTableHelper.TABLE_PAGINATION.INITIAL.SIZE,
      paginationSizeSelector:
        AppTableHelper.TABLE_PAGINATION.INITIAL.SIZE_SELECTOR,
      paginationCounter: AppTableHelper.TABLE_PAGINATION.COUNTER.ROWS,
      paginationOutOfRange: AppTableHelper.TABLE_PAGINATION.OUT_OF_RANGE.LAST,
    };

    // * LOADERs
    const loadersProps = {
      dataLoaderLoading: AppTableHelper.DATA_LOADER(),
      dataLoaderError: AppTableHelper.ERROR_LOADER(),
    };

    // * LOCALIZATION
    const localizationProps = {
      locale: true,
      langs: {
        'es-es': AppTableHelper.ES_LOCAL,
      },
    };

    // * AJAX REMOTE SERVER
    const ajaxProps = {
      // ajaxURLGenerator: AppTableHelper.AJAX_URL_TRIGGER,
      ajaxRequestFunc: AppTableHelper.AJAX_REQUEST_TRIGGER,
      // send sort data to the server instead of processing locally
      sortMode: AppTableHelper.TABLE_PAGINATION.SORT.REMOTE,
    };

    const defaultProps = {
      ...tableLayoutProps,
      ...rowsProps,
      ...paginationProps,
      ...ajaxProps,
      ...localizationProps,
      ...loadersProps,
    };

    return {
      ...defaultProps,
      ...customProps,
    };
  }

  /**
   * ! TABLA
   * ! TS
   *
   * Propiedades del título de la tabla
   *
   * @param {*} title título a renderizar
   *
   * @returns propiedades finales mergeadas en 1 único objeto
   *
   */
  static tableTitleProps({ title = '' }) {
    return { title };
  }

  /**
   * Genera un objeto con los props de entrada del componente.
   *
   * @param {*} tableProps propiedades de la tabla. Se rellena con el TS de .tableProps({ })
   * @param {*} tableTitleProps propiedades del título de la tabla. Se rellena con el TS de .tableTitleProps({ })
   * @param {*} localDataProps propiedades de los datos (locales) de la tabla. Se rellena con el TS de .localDataProps({ })
   * @param {*} remoteDataProps propiedades de los datos (remotos) de la tabla. Se rellena con el TS de .remoteDataProps({ })
   *
   * @returns objeto con los props en el formato del WebComponent
   *
   */
  static props({
    tableProps = this.tableProps({}),
    tableTitleProps = this.tableTitleProps({}),
    localDataProps = this.localDataProps({}),
    remoteDataProps = this.remoteDataProps({}),
  }) {
    return {
      tableProps,
      tableTitleProps,
      localDataProps,
      remoteDataProps,
    };
  }

  /**
   * Ayuda a parsear la columna del 'Tabulator' según el formato que se tiene
   * que pasar
   *
   * @param column datos de la columna
   * @param sorter el tipo de columna de cara a permitir ordenarla
   * @param formatter el formato que tiene la columna. Por defecto es texto, pero puede modificarse usando los de STD_FORMATTERS
   * @param extraProps propiedades que se pueden pasar para cambiar su funcionalidad
   * @param onClick callback a ejecutar cuando se presione una celda de la columna
   *
   * @return objeto con el formato de columna que puede procesar 'Tabulator'
   *
   */
  static parseTabulatorColumn({
    column,
    sorter = AppTableHelper.COLUMN_SORTER.STRING,
    formatter = AppTableHelper.STD_FORMATTERS.DEFAUlT,
    extraProps = {},
    onClick,
  }) {
    const { title, field } = column;

    const optionalProps = {
      ...extraProps,
    };

    if (formatter) {
      optionalProps.formatter = formatter;
    }

    if (onClick) {
      optionalProps.cellClick = onClick;
    }

    return {
      title: title,
      field: field,
      sorter: sorter,
      ...optionalProps,
    };
  }

  /**
   * ! Load the WebComponent to the DOM
   */
  static define() {
    if (!customElements.get(this.TAG)) {
      customElements.define(this.TAG, AppTable);
    }
  }
}
