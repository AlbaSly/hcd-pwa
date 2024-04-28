import { Periodicity } from "../interfaces";

import data from '../assets/periodicities.json';

export class PeriodicitiesService {

    constructor() {}

    getDefaultValue(): Periodicity {
        return data[0];
    }

    getCatalog(): Periodicity[] {
        return data;
    }
}