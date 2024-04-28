import incomesData from "../assets/income-types.json";
import outcomesData from "../assets/outcome-types.json";
import { IncomeType, OutcomeType } from "../interfaces";

export class IncomeAndOutComesService {
    constructor() {}

    getDefaultIncomeTypeValue(): IncomeType {
        return incomesData[0];
    }

    getDefaultOutcomeTypeValue(): OutcomeType {
        return outcomesData[0]
    }

    getIncomeTypesCatalog(): IncomeType[] {
        return incomesData;
    }

    getOutcomeTypesCatalog(): OutcomeType[] {
        return outcomesData;
    }
}