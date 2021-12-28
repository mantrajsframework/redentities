"use strict";

class DropTableBuilder {
    constructor( tableName, formatters ) {
        this.TableName = tableName;
        this.Formatters = formatters;
    }   

    Query() {
        return this.Formatters.FormatDropTable( this.TableName );
    }
}

module.exports = DropTableBuilder;