export default class Util {
    static truncateString(str : string | undefined, numberOfChars : number) {
        if (str && str.length >= numberOfChars) {
            if (str.length >= numberOfChars) {
                return `${str.slice(0, numberOfChars)}...`;
            }
            return str;
        }
        return '-';
    }
}