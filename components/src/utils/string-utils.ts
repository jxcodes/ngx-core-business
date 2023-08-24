export class StringUtils {
  /**
   * Example:
   * ```
   *  StringUtils.format('hello {0}', 'world');
   * ```
   *
   * @param tpl
   * @param args
   */
  static format(tpl: string, ...args: any[]) {
    args.forEach((value, idx) => {
      const re = new RegExp('\\{' + idx + '\\}', 'g');
      tpl = tpl.replace(re, value);
    });
    return tpl;
  }

  static compileTpl(tpl: string, tplData: { [key: string]: any }) {
    return tpl.replace(/\{([^}]+)\}/g, (_, key) => {
      return tplData[key];
    });
  }
}
