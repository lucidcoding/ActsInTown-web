import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Option } from '../../../common/option.common';

@Component({
    moduleId: module.id,
    selector: 'sd-date-selector',
    templateUrl: 'dateSelectorComponent.html',
    styleUrls: ['dateSelectorComponent.css']
})
export class DateSelectorComponent implements OnInit, OnChanges {
    @Input() value: Date;
    @Output() valueChange: EventEmitter<Date> = new EventEmitter<Date>();
    day: number;
    days: Option[];
    month: number;
    months: Option[];
    year: number;
    years: Option[];

    ngOnInit() {
        this.value = new Date();
        this.days = [];
        this.months = [];
        this.years = [];
        this.roundUpTime();
        this.day = this.value.getDate();
        this.month = this.value.getMonth();
        this.year = this.value.getFullYear();

        for (var yearOffset = 0; yearOffset < 12; yearOffset++) {
            var year = this.value.getFullYear() + yearOffset;

            this.years.push(new Option(
                year.toString(), year.toString(), yearOffset === 0
            ));
        }

        var months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 
            'August', 'September', 'October', 'November', 'December'];

        for (var monthIndex = 0; monthIndex < 12; monthIndex++) {
            this.months.push(new Option(months[monthIndex], monthIndex.toString(), monthIndex === this.month));
        }

        this.setDays();
    }

    roundUpTime() {
        var date = this.value;
        var extraMinutes = date.getMinutes() % 5;

        if(extraMinutes > 0) {
            this.value =new Date(date.getTime() + (5 - extraMinutes) * 60000); 
        }
    }

    ngOnChanges(changes: any) {
        //This needs implementing for when value is changed externally.
    }

    dayChanged(day: string) {
        this.day = parseInt(day);
        this.updateDate();
    }

    monthChanged(month: string) {
        this.month = parseInt(month);
        this.changeDayIfNeeded();
        this.setDays();
        this.updateDate();
    }

    yearChanged(year: string) {
        this.year = parseInt(year);
        this.changeDayIfNeeded();
        this.setDays();
        this.updateDate();
    }

    changeDayIfNeeded() {
        var daysInMonth = this.getDaysInMonth();

        if(this.day > daysInMonth) {
            this.day = 1;
        }
    }

    updateDate() {
        this.value = new Date(this.year, this.month, this.day, 0, 0, 0);
        this.valueChange.emit(this.value);
    }

    setDays() {
        var daysInMonth = this.getDaysInMonth();
        this.days = [];

        for (var dayIndex = 1; dayIndex <= daysInMonth; dayIndex++) {
            this.days.push(new Option(dayIndex.toString(), dayIndex.toString(), dayIndex === this.day));
        }
    }

    getDaysInMonth(): number {
        var daysInMonth: number = 31;

        if (this.month === 3
            || this.month === 5
            || this.month === 8
            || this.month === 10) {
            daysInMonth = 30;
        }

        if (this.month === 1) {
            if (((this.year % 4 === 0) && (this.year % 100 !== 0)) || (this.year % 400 === 0)) {
                daysInMonth = 29;
            } else {
                daysInMonth = 28;
            }
        }

        return daysInMonth;
    }
}
