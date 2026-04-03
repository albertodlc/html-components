/**
 * Clase para gestionar temas de seguridad y criptográfia
 * del frontend.
 */
export class CryptoUtil {
  /**
   * Converts a standard Base64 string to an ArrayBuffer.
   * @param {string} base64String The standard Base64 encoded string.
   * @returns {ArrayBuffer} The decoded ArrayBuffer.
   */
  static base64ToArrayBuffer(base64String) {
    const binaryString = window.atob(base64String);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
  }

  /**
   * Converts an ArrayBuffer to a standard Base64 string.
   * @param {ArrayBuffer} buffer The ArrayBuffer to encode.
   * @returns {string} The standard Base64 encoded string.
   */
  static arrayBufferToBase64(buffer) {
    const bytes = new Uint8Array(buffer);
    let binary = '';

    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }

    return window.btoa(binary);
  }

  /**
   * Generador de UUIDs en entornos legacy/sin HTTPS
   * ! En entornos HTTPs se puede utilizar la API crypto.
   * @returns UUID
   */
  static uuidGeneratorV4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        let r = (Math.random() * 16) | 0,
          v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      },
    );
  }
}
