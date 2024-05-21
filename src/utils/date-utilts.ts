import * as fns from "date-fns";

export namespace DateUtils {

    export const mergeDateAndTime = (a: Date, b: Date) => {
        const year = a.getFullYear();
        const month = a.getMonth();
        const day = a.getDate();

        const hours = b.getHours();
        const minutes = b.getMinutes();
        const seconds = b.getSeconds();
        const ms = b.getMilliseconds();

        const newDate = new Date(year, month, day, hours, minutes, seconds, ms);

        return newDate;
    }

    export const mergeDateAndTime_String = (a: Date, b: Date) => {
        const date = fns.format(a, 'yyyy-MM-dd');
        const time = fns.format(b, 'HH:mm:ss');

        const newDateString = `${date} ${time}`;

        return newDateString;
    }
}