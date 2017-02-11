
class Utils {

  public static uuid(): string {
    /*jshint bitwise:false */
    let i, random;
    let uuid = '';

    for (i = 0; i < 32; i++) {
      random = Math.random() * 16 | 0;
      if (i === 8 || i === 12 || i === 16 || i === 20) {
        uuid += '-';
      }
      uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random))
        .toString(16);
    }

    return uuid;
  }

  public static pluralize(count: number, word: string) {
    return count === 1 ? word : word + 's';
  }

  public static isEmpty(obj): boolean {
    return Object.keys(obj).length === 0;
  }

  public static omit<T, K extends keyof T>(obj: T, ...properties: K[]): Partial<T> {
    const newObj: any = {};
    Object.keys(obj).forEach((k: K) => {
      if (properties.indexOf(k) === -1) {
        newObj[k] = obj[k];
      }
    });
    return newObj;
  }

  public static pick<T, K extends keyof T>(obj: T, ...properties: K[]): Pick<T, K> {
    const newObj: any = {};
    for (let k of properties) {
      newObj[k] = obj[k];
    }
    return newObj;
  }

}

export { Utils };
