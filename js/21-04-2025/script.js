function sum() {
    return Array.prototype.filter
        .call(arguments, function (e) {
            return typeof e === 'number';
        })
        .reduce(function (prev, curr) {
            return prev + curr;
        });
}
function filterBy(type, ...args) {
    return args.filter(function (e) {
        return typeof e === type;
    });
}  