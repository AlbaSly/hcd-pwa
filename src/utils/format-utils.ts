import { MAX_DECIMAL_LENGTH } from "../constants/app-constants";

export namespace FormatUtils {

    export const formatMoney = (amount: number, decimal_digits?: number): string => {
        if (decimal_digits) return amount.toFixed(decimal_digits);

        return amount.toFixed(MAX_DECIMAL_LENGTH);
    }
}