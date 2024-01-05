export default class WeatherTime {
    constructor(year, month, day, hour, minute) {
        this.year = year;
        this.month = month;
        this.day = day;
        this.hour = hour;
        this.minute = minute;
    }

    formatNoMinutes() {
        return `${this.year}-${this.month}-${this.day}T${this.hour}:00`;
    }

    twelveHourTime() {
        const hour = this.hour % 12 == 0 ? 12 : this.hour % 12;
        const meridiem = Number(this.hour) < 12 ? 'AM' : 'PM';
        return `${hour}:${this.minute} ${meridiem}`
    }

    monthDay() {
        return `${this.month}-${this.day}`
    }
}
