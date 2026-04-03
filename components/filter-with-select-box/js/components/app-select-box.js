export const SELECT_BOX_TAG = 'app-select-box';

export class AppSelectBox extends HTMLElement {
  #options = [];
  #selectedOption = null;

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  #renderOptions() {
    if (this.#options.length === 0) {
      return ['<option value="-1">Sin opciones</option>'];
    } else {
      const options = [];

      for (const option of this.#options) {
        const { key, value } = option;

        let selected = '';

        if (this.#selectedOption === key) {
          selected = 'selected';
        }

        options.push(`<option ${selected} value="${key}">${value}</option>`);
      }

      return options;
    }
  }

  render() {
    const options = this.#renderOptions();

    this.shadowRoot.innerHTML = `
      <select size="3" style="width: 100px">
        ${options.join('')}
      </select>
    `;
  }

  set options(value) {
    this.#options = value;
    this.render();
  }

  set selectedOption(value) {
    this.#selectedOption = value;
    this.render();
  }
}

export function defineSelectBox() {
  if (!customElements.get(SELECT_BOX_TAG)) {
    customElements.define(SELECT_BOX_TAG, AppSelectBox);
  }
}
