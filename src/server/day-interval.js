function day_interval() {

    var date2 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate())

    var date1_tomorrow = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate() + 1);
    
    if (date1_tomorrow.getFullYear() == date2.getFullYear() && date1_tomorrow.getMonth() == date2.getMonth() && date1_tomorrow.getDate() == date2.getDate()) {
        return true; // date2 is one day after date1.
    }
    else {
        return false
    }
}

module.exports = { day_interval }