import { v4 as uuid } from "uuid";

export namespace UUIDHelpers {
    export const generate = () => {
        return uuid();
    }
}