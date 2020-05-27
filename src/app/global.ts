export class Constants {
  public static dummyOwnerId = 'c6a4f782-9aa2-11ea-bb37-0242ac130002';
}

export class StringUtils {
  public static isEmptyOrNull(value: string): boolean { return !(value !== undefined && (value.length > 0)); }
}

export class EnumUtils {
  /**
   * Get value by key through enum key iteration as no reverse mapping for enums are offered.
   * @param enum$ Enum whose keys are to be iterated
   * @param value Value of key to be found
   */
  public static getKeyByValue(enum$: any, value: any): any {
    const keys = Object.keys(enum$);

    for (const key in keys) {
      if (key === value) {
        return key;
      }
    }

    return undefined;
  }
}
