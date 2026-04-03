export class AppBaseComponent extends HTMLElement {
  #mounted = false;
  #refs = {};
  #props = {};

  // ── Lifecycle

  connectedCallback() {
    if (!this.#mounted) {
      this._render();
      this._hydrate();
      this.#mounted = true;
    }

    // The component registers itself as the listener object.
    // Browser will call this.handleEvent(e) for each event.
    this._bindEvents();
  }

  disconnectedCallback() {
    this._unbindEvents();
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
   * @protected
   */
  _bindEvents() {
    // Subclass implementation:
    //
    //   this.addEventListener('click', this);
    //   this.addEventListener(AppTableHelper.COMPONENT_EVENTS.DATA_LOADED.name, this);
  }

  /**
   * Mirror of _bindEvents — must remove exactly the same set.
   *
   * @protected
   */
  _unbindEvents() {
    // Subclass implementation:
    //
    //   this.removeEventListener('click', this);
    //   this.removeEventListener(AppTableHelper.COMPONENT_EVENTS.DATA_LOADED.name, this);
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

  async _hydrate() {}

  _syncToDOM(k, v) {}

  _teardown() {}

  // ── Props

  get props() {
    return this.#props;
  }

  get _refs() {
    return this.#refs;
  }

  get _props() {
    return this.#props;
  }

  set _props(v) {
    this.#props = v;
  }

  set props(incoming) {
    this.#props = this._mergeProps(this.#props, incoming);
    if (this.#mounted) {
      this._render();
      this._hydrate();
    }
  }

  _setProp(group, key, value) {
    if (!this.#props[group]) this.#props[group] = {};
    this.#props[group][key] = value;
    this._syncToDOM(key, value);
  }

  _mergeProps(current, incoming) {
    const merged = { ...current };
    for (const group of Object.keys(incoming)) {
      merged[group] = { ...(current[group] ?? {}), ...incoming[group] };
    }
    return merged;
  }
}
