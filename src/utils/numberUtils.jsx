export default {
    formatGBP(figure) {
        var formatter = new Intl.NumberFormat('en-GB', {
            style: 'currency',
            currency: 'GBP',
            minimumFractionDigits: 2,
        });
        return formatter.format(figure);
    }
}