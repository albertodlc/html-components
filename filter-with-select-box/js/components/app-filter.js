import { regions, utds, zones } from '../../data/data.js';
import { SELECT_BOX_TAG } from './app-select-box.js';

export const FILTER_TAG = 'app-filter';

export class AppFilter extends HTMLElement {
  #regionOptions = regions;
  #selectedRegion = null;
  #zoneOptions = [];
  #selectedZone = null;
  #utdOptions = [];
  #selectedUtd = null;

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
  }

  handleEvent(event) {
    const { type, target, originalTarget } = event;

    if (type === 'click') {
      const changedElementId = target.id;
      const changedElementValue = Number(originalTarget.value);

      if (changedElementId === 'region') {
        // Clean UTDs
        this.#utdOptions = [];
        this.#selectedUtd = null;

        // Clean Zones
        this.#zoneOptions = [];
        this.#selectedZone = null;

        // Render Zones
        this.#zoneOptions = zones[changedElementValue];
        this.#selectedRegion = changedElementValue;

        this.render();
      } else if (changedElementId === 'zone') {
        this.#utdOptions = utds[this.#selectedRegion][changedElementValue];
        this.#selectedZone = changedElementValue;

        this.render();
      }
    }
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = '';

    const selectBoxRegion = document.createElement(SELECT_BOX_TAG);
    selectBoxRegion.id = 'region';
    selectBoxRegion.options = this.#regionOptions;
    selectBoxRegion.selectedOption = this.#selectedRegion;

    const selectBoxZone = document.createElement(SELECT_BOX_TAG);
    selectBoxZone.id = 'zone';
    selectBoxZone.options = this.#zoneOptions;
    selectBoxZone.selectedOption = this.#selectedZone;

    const selectBoxUtd = document.createElement(SELECT_BOX_TAG);
    selectBoxUtd.id = 'utd';
    selectBoxUtd.options = this.#utdOptions;
    selectBoxUtd.selectedOption = this.#selectedUtd;

    this.shadowRoot.appendChild(selectBoxRegion);
    this.shadowRoot.appendChild(selectBoxZone);
    this.shadowRoot.appendChild(selectBoxUtd);

    this.shadowRoot.addEventListener('click', this);
  }
}

export function defineAppFilter() {
  if (!customElements.get(FILTER_TAG)) {
    customElements.define(FILTER_TAG, AppFilter);
  }
}
