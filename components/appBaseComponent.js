export class AppBaseComponent extends HTMLElement {
  #mounted = false;
  #refs = {};
  #props = {};

  /**
   * OVERRIDE
   *
   * Define an array of events to listen to. Subclasses should override this.
   * Static to improve Memory Efficiency
   *
   * @protected
   */
  static get observedEvents() {
    return [];
  }

  // ── Lifecycle
  constructor() {
    super();
  }

  /**
   * ! DO NOT OVERRIDE
   *
   * @private
   */
  connectedCallback() {
    if (!this.#mounted) {
      this._render();
      this._hydrate();
      this.#mounted = true;
    }

    this.#bindEvents();
  }

  /**
   * ! DO NOT OVERRIDE
   *
   * @private
   */
  disconnectedCallback() {
    this.#unbindEvents();
    this._teardown();
  }

  // ── Event dispatch

  /**
   * Single entry point for every event this component handles.
   * Both internal component events and external DOM events route here.
   * Subclasses override and switch on event.type.
   *
   * @param {Event} event
   */
  handleEvent(event) {
    // Subclass implementation:
    //
    //   switch (event.type) {
    //     case AppTableHelper.COMPONENT_EVENTS.DATA_LOADED.name:
    //       this.#onDataLoaded(event.detail);
    //       break;
    //     case 'click':
    //       this.#onClick(event);
    //       break;
    //   }
  }

  /**
   * Register all listeners — always passing `this` as the handler object.
   * Subclasses override to declare which events they want to receive.
   *
   * @private
   */
  #bindEvents() {
    // Access the static array from the instance using `this.constructor`
    this.constructor.observedEvents.forEach((eventName) => {
      this.addEventListener(eventName, this);
    });
  }

  /**
   * Mirror of #bindEvents — must remove exactly the same set.
   *
   * @private
   */
  #unbindEvents() {
    this.constructor.observedEvents.forEach((eventName) => {
      this.removeEventListener(eventName, this);
    });
  }

  // ── Internal emit

  /**
   * Dispatch a component-scoped event.
   * bubbles:false keeps it local — it won't propagate up the DOM.
   *
   * @protected
   */
  _emit(eventName, payload = {}) {
    this.dispatchEvent(
      new CustomEvent(eventName, {
        detail: payload,
        bubbles: false,
        composed: false,
      }),
    );
  }

  // ── Rendering pipeline

  /**
   * Renderiza el esqueleto del componente.
   *
   */
  _render() {}

  /**
   * Populate the DOM with live / async data.
   * Called once after the first _render, and each time props update.
   *
   * @protected
   * @returns {Promise<void> | void}
   */
  async _hydrate() {}

  _syncToDOM(k, v) {}

  _teardown() {}

  // Props

  /**
   * Subclasses read/write DOM refs through this accessor.
   *
   * @protected
   * @type {Record<string, HTMLElement | null>}
   */
  get _refs() {
    return this.#refs;
  }

  /**
   * Subclasses read/write props through this accessor.
   *
   * @protected
   * @type {Record<string, unknown>}
   */
  get _props() {
    return this.#props;
  }

  set _props(v) {
    this.#props = v;
  }

  /**
   * Update a single prop key inside a group, then call _syncToDOM.
   * Use this for lightweight, targeted updates that don't need a full rebuild.
   *
   * @protected
   * @param {string} group  Top-level props key (e.g. 'tableProps').
   * @param {string} key    Property name inside that group.
   * @param {unknown} value New value.
   *
   * @example
   *   this._setProp('tableProps', 'height', '500px');
   */
  // _setProp(group, key, value) {
  //   if (!this.#props[group]) this.#props[group] = {};
  //   this.#props[group][key] = value;
  //   this._syncToDOM(key, value);
  // }

  /**
   * Read-only access to the full props object.
   * Write through the setter or _setProp for granular changes.
   *
   */
  // get props() {
  //   return this.#props;
  // }

  /**
   * Replace props wholesale (deep-merges each top-level group).
   * Triggers a full _render + _hydrate cycle.
   *
   * @param {Record<string, unknown>} incoming
   */
  // set props(incoming) {
  //   this.#props = this._mergeProps(this.#props, incoming);
  //   if (this.#mounted) {
  //     this._render();
  //     this._hydrate();
  //   }
  // }

  /**
   * Deep-merge strategy: each top-level group is spread-merged.
   * Subclasses can override for a different strategy.
   *
   * @protected
   */
  // _mergeProps(current, incoming) {
  //   const merged = { ...current };
  //   for (const group of Object.keys(incoming)) {
  //     merged[group] = { ...(current[group] ?? {}), ...incoming[group] };
  //   }
  //   return merged;
  // }
}
