module.exports = {
    format_date: (date) => {
        const _date = date.toString().split('-');
        const dateObj = { month: _date[1], day: _date[2], year: _date[0] };
        return `${dateObj.month}/${dateObj.day}/${dateObj.year}`;
    },
};
