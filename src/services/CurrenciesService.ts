import data from "../assets/currencies.json"
import { Currency } from "../interfaces";

export class CurrenciesService {
    constructor() {}

    getDefaultValue(): Currency {
        return {
            symbol: "MX$",
            name: "Mexican Peso",
            symbol_native: "$",
            decimal_digits: 2,
            rounding: 0,
            code: "MXN",
            name_plural: "Mexican pesos"
        }
    }

    getCatalog(): Currency[] {
        return Object.values(data) as Currency[];
    }

    updateCurrentCurrencyPosition(currency: Currency): Currency[] {
        const copy = this.getCatalog();

        const index = copy.findIndex(c => c.code === currency.code);

        if (index !== -1) {
            const indexItem = copy.splice(index, 1)[0];
            copy.unshift(indexItem);
        }

        return copy;
    }
}