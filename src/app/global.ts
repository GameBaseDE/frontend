export class Constants {
    public static dummyOwnerId: string = 'c6a4f782-9aa2-11ea-bb37-0242ac130002';
}

export class StringUtils {
    public static isEmptyOrNull(value: string): boolean { return !(value !== null && (value.length > 0)); }
}