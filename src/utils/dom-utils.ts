export namespace DOMUtils {

    export const addBodyOverflowClass = () => {
        document.querySelector('body')?.classList.add('overflow-hidden');
    }

    export const removeBodyOverflowClass = () => {
        document.querySelector('body')?.classList.remove('overflow-hidden');
    }
}