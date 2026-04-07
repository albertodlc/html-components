import { IconConfig } from '../../config/iconConfig.js';
import { AppBaseComponent } from '../appBaseComponent.js';

export class AppButton extends AppBaseComponent {
  constructor() {
    super();

    this._props = AppButtonHelper.props({});
  }

  // Events
  static get observedEvents() {
    return ['click'];
  }

  handleEvent(event) {
    const { type } = event;
    const hasClicked = type === 'click';

    event.preventDefault();

    if (hasClicked) {
      const { callbacks } = this._props;

      for (const callback of callbacks) {
        callback();
      }
    }
  }

  // RENDERs
  _render() {
    const { btnIconText, btnInnerText, eventAttributes, btnType } = this._props;

    // BTN
    this._refs.btn = document.createElement('button');
    this._refs.btn.setAttribute('role', 'button');

    // ICON
    if (btnIconText) {
      this._refs.btn.innerHTML = btnIconText;
    }

    // TEXT
    const btnText = document.createElement('span');
    btnText.innerHTML = btnInnerText;

    this._refs.btn.appendChild(btnText);

    // ! Event management
    for (const eventAttribute of eventAttributes) {
      const { attributeName, attributeValue } = eventAttribute;

      // TODO: Reducir a un string con el nombre del data-action
      btnText.setAttribute(attributeName, attributeValue);
      this._refs.btn.setAttribute(attributeName, attributeValue);
    }

    let btnCssClass = btnType.CSS_CLASS;

    this._refs.btn.classList.add('app-btn');
    this._refs.btn.classList.add(btnCssClass);

    this.appendChild(this._refs.btn);
  }
}

export class AppButtonHelper {
  static TAG = 'app-btn';

  static BTN_TYPE = {
    DEFAULT: {
      TYPE: 'DEFAULT',
      CSS_CLASS: 'app-btn--default',
    },
    ACCEPT: {
      TYPE: 'ACCEPT',
      CSS_CLASS: 'app-btn--accept',
    },
    QUERY: {
      TYPE: 'QUERY',
      CSS_BASE_CLASS: 'app-btn--query',
    },
  };

  static define() {
    if (!customElements.get(this.TAG)) {
      customElements.define(this.TAG, AppButton);
    }
  }

  static props({
    btnIconText,
    btnInnerText = 'Click me!',
    btnType = AppButtonHelper.BTN_TYPE.DEFAULT.TYPE,
    eventAttributes = [],
    callbacks = [],
  }) {
    return {
      btnIconText,
      btnInnerText,
      eventAttributes,
      btnType,
      callbacks,
    };
  }
}

/**
 * ! FACTORY FUNCTION
 *
 * Generador de Botones estandar. Se añaden los más comunes en la aplicación.
 *
 */
export class AppButtonFactory {
  static acceptModalBtn({ eventAttributes = [], callbacks = [] }) {
    const acceptBtn = new AppButton();
    acceptBtn._props = AppButtonHelper.props({
      btnIconText: IconConfig.CHECK,
      btnInnerText: 'Aceptar',
      eventAttributes: eventAttributes,
      btnType: AppButtonHelper.BTN_TYPE.ACCEPT,
      callbacks,
    });

    return acceptBtn;
  }

  static closeModalBtn() {
    const closeBtn = new AppButton();
    closeBtn._props = AppButtonHelper.props({
      btnIconText: IconConfig.CLOSE,
      btnInnerText: 'Cerrar',
      eventAttributes: [
        // {
        //   // TODO: Estos eventos igual van en otro lado, o se definen a nivel de boton
        //   attributeName: 'data-action',
        //   attributeValue: AppModalHelper.INNER_ACTIONS.CLOSE,
        // },
      ],
    });

    return closeBtn;
  }

  static managementBtn({ callbacks = [] }) {
    const managementBtn = new AppButton();
    managementBtn._props = AppButtonHelper.props({
      btnInnerText: 'Consultar',
      btnType: AppButtonHelper.BTN_TYPE.QUERY,
      callbacks,
    });

    return managementBtn;
  }
}
