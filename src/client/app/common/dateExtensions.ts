//import './common/numberExtensions';

interface Date {
    roundUpTime: () => Date;
    datePart: () => Date;
    getMonthString: () => string;
    getShortMonthString: () => string;
    getFormattedString: () => string;
}

Date.prototype.roundUpTime = function(): Date {
    var date = this;
    var extraMinutes = date.getMinutes() % 5;
    var newDate: Date;
    
    if (extraMinutes > 0) {
        newDate = new Date(date.getTime() + ((5 - extraMinutes) * 60000));
    } else {
        newDate = new Date(date.getTime() + (5 * 60000));
    }
    
    return new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate(), newDate.getHours(), newDate.getMinutes(), 0);
};

Date.prototype.datePart = function(): Date {
    var date: Date = this;
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

Date.prototype.getMonthString = function(): string {
    var date: Date = this;
    
    var months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 
        'July', 'August', 'September', 'October', 'November', 'December'];
            
    return months[date.getMonth()];
};

Date.prototype.getShortMonthString = function(): string {
    var date: Date = this;
    
    var months: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            
    return months[date.getMonth()];
};

Date.prototype.getFormattedString = function(): string {
    var date: Date = this;
    
    return padLeft(date.getDate()) + ' ' +
        date.getShortMonthString() + ' ' +
        date.getFullYear() + ' ' +
        padLeft(date.getHours()) + ':' +
        padLeft(date.getMinutes());
        
};
