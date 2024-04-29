import * as fns from 'date-fns';

export namespace TimestampHelpers {
    export const generate = () => fns.format(new Date(), 'yyyy-MM-dd HH:mm:ss');
}