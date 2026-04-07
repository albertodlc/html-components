import { AppBaseComponent } from '../appBaseComponent.js';

export class AppSelect extends AppBaseComponent {
  constructor() {
    super();

    this._props = AppSelectHelper.props({});
  }

  // Events
  static get observedEvents() {
    return ['change', 'mousedown'];
  }

  handleEvent(event) {
    const { type, target, button } = event;

    // Option Change
    if (type === 'change') {
      this.#handleOptionChange(event);
    }

    // Single selection (Click)
    if (type === 'mousedown' && button === 0 && target.tagName === 'OPTION') {
      this.#handleOptionClick(event);
    }

    this.#debugSelectedOptions();
  }

  /**
   * Distpatch custom event => Value updated
   *
   * @param {*} event
   */
  #handleOptionChange(event) {
    const { target } = event;
    const selectedValue = target.value;

    // Dispatch a custom event to the document
    const customEvent = new CustomEvent('selectChanged', {
      detail: { value: selectedValue },
      bubbles: true,
      composed: true,
    });

    this.dispatchEvent(customEvent);
  }

  /**
   * Unselect option (if it was selected previously)
   *
   * @param {*} event
   */
  #handleOptionClick(event) {
    const { multiple, size } = this._props;
    const { target: targetOption } = event;
    const { select } = this._refs;

    // Selected (Multiple)
    if (targetOption.selected && multiple && size > 1) {
      // Toggle the selected state
      targetOption.selected = !targetOption.selected;

      event.preventDefault();
      // Manually trigger the change event if needed for other scripts
      select.dispatchEvent(new Event('change'));
    }
  }

  // Render Skeleton
  _render() {
    // Props
    const { id, name, title, size, multiple } = this._props;

    // Component
    let label = null;
    if (title) {
      label = document.createElement('label');
      label.for = id;
      label.innerHTML = title;
    }

    const select = document.createElement('select');
    select.id = id;
    select.name = name;
    if (multiple) select.multiple = multiple;
    if (size) select.size = size;

    if (title) {
      this.appendChild(label);

      this._refs.label = label;
    }

    this.appendChild(select);
    this._refs.select = select;

    // Styles
    this.classList.add('app-select');
  }

  async _hydrate() {
    const { url, selected } = this._props;

    if (url) {
      const selectOptions = await fetch(url)
        .then((res) => {
          if (!res.ok) {
            throw new Error('HTTP Error: ' + res.statusText);
          }

          return res.json();
        })
        .catch((err) => console.error(err));

      for (const selectOption of selectOptions) {
        const { key, value } = selectOption;

        const option = document.createElement('option');
        option.value = key;
        option.innerHTML = value;

        if (Number(selected) === Number(key)) {
          option.selected = true;
        }

        this._refs.select.appendChild(option);
      }
    }
  }

  // Public API
  selectOption({ selected }) {
    let selectedOption = this.querySelectorAll(`#${this._id} > option`).forEach(
      (option) => {
        if (option.value == selected) {
          option.selected = true;
        } else {
          option.selected = false;
        }
      },
    );
  }

  cleanList() {
    this.querySelector(`#${this.id}`).innerHTML = '';
  }

  // Debug
  /**
   * Debug function: Current selected Options
   *
   */
  #debugSelectedOptions() {
    const { select } = this._refs;
    const options = Array.from(select.options);

    // Get an array of values for all selected options
    const selectedValues = options
      .filter((opt) => opt.selected)
      .map((opt) => opt.value);

    console.log(selectedValues);
  }
}

/**
 * Helper class related with the 'AppSelect' component
 *
 */
export class AppSelectHelper {
  static TAG = 'app-select';

  static props({ id, name, title, url, selected, multiple = false, size }) {
    return { id, name, title, url, selected, multiple, size };
  }

  static define() {
    if (!customElements.get(this.TAG)) {
      customElements.define(this.TAG, AppSelect);
    }
  }
}
