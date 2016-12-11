interface Date {
    roundUpTime: () => Date;
    datePart: () => Date;
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
}

Date.prototype.datePart = function(): Date {
    var date: Date = this;
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}