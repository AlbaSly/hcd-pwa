import { TransactionCategory } from "../interfaces";
import data from "../assets/transaction-categories.json";

export class TransactionCategoriesService {
    constructor() {}

    getCatalog(): TransactionCategory[] {
        return data as TransactionCategory[];
    }
}