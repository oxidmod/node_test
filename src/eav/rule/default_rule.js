module.exports = {
    required: function (limit, value) {
        return typeof value !== 'undefined';
    },
    min: function (limit, value) {
        return typeof value === 'number' && value >= limit;
    },
    max: function (limit, value) {
        return typeof value === 'number' && value <= limit;
    },
    email: function (limit, value) {
        return typeof value === 'string' && /\S+@\S+\.\S+/.test(value);
    },
};
