"use strict";

module.exports = {
    FromJsonToBase64: function( json ) {
        return (new Buffer.from( JSON.stringify( json ) )).toString("base64");
    },

    FromBase64ToJson: function( base64string ) {
        return JSON.parse((Buffer.from( base64string, "base64" )).toString());
    }
}