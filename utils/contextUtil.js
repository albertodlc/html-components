/**
 * Clase mediante la cual gestionar el contexto
 * actual de la aplicación. Principalmente el
 * nombre de la aplicación con el que se
 * despliega.
 */
export class ContextUtil {
  /**
   * ! Devuelve la URL COMPLETA del contexto actual
   * ie: http://localhost/app
   *
   * @returns cadena de texto con el contexto completo
   *
   */
  static getFullContext() {
    return (
      ContextUtil.getProtocol() +
      '//' +
      ContextUtil.getDomain() +
      ContextUtil.getContext()
    );
  }

  /**
   * Devuelve la parte del path de la URL sin el context (/app). ie: region/norte
   *
   * @returns cadena de texto con el path
   *
   */
  static getPath() {
    let getFullUrl = globalThis.location;
    const fullPathContext = getFullUrl.pathname.split('/');
    const fullPath = fullPathContext.slice(2);

    return fullPath.join('/');
  }

  /**
   * ! Devuelve el contexto actual
   * ie: /app
   *
   * @returns
   *
   */
  static getContext() {
    let getFullUrl = globalThis.location;

    return '/' + getFullUrl.pathname.split('/')[1];
  }

  /**
   * ! Devuelve el dominio actual
   * ie: localhost
   *
   * @returns
   *
   */
  static getDomain() {
    let getFullUrl = globalThis.location;

    return getFullUrl.host;
  }

  /**
   * ! Devuelve el procotolo
   * ie: http
   * @returns
   */
  static getProtocol() {
    let getFullUrl = globalThis.location;

    return getFullUrl.protocol;
  }
}
