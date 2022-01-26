"use strict";

module.exports = {
    Count: (result) => {
        return parseInt(result[0].count);
    },

    Exists: (result) => {
        if (result.length && result[0].count ) return parseInt(result[0].count) >= 1;

        return false;
    }
}