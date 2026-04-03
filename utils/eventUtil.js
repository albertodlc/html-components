// ! BUS de eventos compartidos
export const EventBus = new EventTarget();

/**
 * Clase util para gestionar:
 * - Eventos
 * - Bus de Eventos
 *
 */
export class EventUtil {
  /**
   * GENERA y LANZA un evento personalizado con el formato de payload necesario
   *
   * @param {*} origin 'this' desde el que se lanza el evento
   * @param {*} eventName nombre del evento asociado
   * @param {*} payload carga de datos a mandar junto con el evento
   *
   */
  static createAndDispatchCustomEvent(origin, eventName, payload = {}) {
    const customEvent = EventUtil.generateCustomEvent(eventName, payload);
    EventUtil.dispatchEvent(origin, customEvent);
  }

  /**
   * Lanza el evento personalizado usando como 'this' el parámetro 'origin'
   * @param {*} origin 'this' desde el que se lanza el evento
   * @param {*} customEvent evento a lanzar
   *
   */
  static dispatchEvent(origin, customEvent) {
    origin.dispatchEvent(customEvent);
  }

  /**
   * Genera un evento personalizado con el formato de payload necesario
   *
   * @param {*} eventName nombre del evento asociado
   * @param {*} payload carga de datos a mandar junto con el evento
   *
   * @returns evento personalizado
   */
  static generateCustomEvent(eventName, payload) {
    return new CustomEvent(eventName, {
      detail: payload,
      bubbles: true,
      composed: true,
    });
  }

  /**
   * GENERA y LANZA un evento personalizado al BUS con el formato de payload necesario
   *
   * @param {*} eventName nombre del evento asociado
   * @param {*} payload carga de datos a mandar junto con el evento
   *
   */
  static createAndDispatchCustomEventToBus(eventName, payload) {
    const customEvent = EventUtil.generateCustomEvent(eventName, payload);

    EventUtil.dispatchEventToBus(customEvent);
  }

  /**
   * Lanzamos un evento personalizado al bus (para que
   * los) elementos suscritos al bus puedan gestionarlos.
   *
   * @param {*} customEvent identificador del bús de eventos
   */
  static dispatchEventToBus(customEvent) {
    EventBus.dispatchEvent(customEvent);
  }

  /**
   * Añadimos un listener a un elemento
   *
   * @param {*} eventName nombre del evento que escucha el elemento
   * @param {*} callback acción que se ejecuta cuando llega el evento
   */
  static appendListenerToBus(eventName, callback) {
    EventBus.addEventListener(eventName, callback);
  }

  /**
   * Eliminamos un listener de un elemento
   *
   * @param {*} eventName nombre del evento que escucha el elemento
   * @param {*} callback acción que se ejecuta cuando llega el evento
   */
  static removeListenerFromBus(eventName, callback) {
    EventBus.removeEventListener(eventName, callback);
  }
}
