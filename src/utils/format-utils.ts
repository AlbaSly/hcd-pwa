import { MAX_DECIMAL_LENGTH } from "../constants/app-constants";
import { Account } from "../interfaces";

export namespace FormatUtils {

    export const formatToMoney = (account: Account): string => {
        if (account.currency.decimal_digits) {
            return account.amount.toFixed(account.currency.decimal_digits);
        }

        return account.amount.toFixed(MAX_DECIMAL_LENGTH);
    }
}