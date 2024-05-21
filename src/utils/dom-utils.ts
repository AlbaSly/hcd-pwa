import tinycolor from "tinycolor2";

export namespace DOMUtils {

    export const addBodyOverflowClass = () => {
        document.querySelector('body')?.classList.add('overflow-hidden');
    }

    export const removeBodyOverflowClass = () => {
        document.querySelector('body')?.classList.remove('overflow-hidden');
    }

    export const darkifyHexColor = (hex: string) => {
        return '#' + tinycolor('#'+hex).darken(50).toHex().toString();
    }
}