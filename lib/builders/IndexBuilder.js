"use strict";

class IndexBuilder {
    constructor( tableName, fieldNames, indexCount, formatters ) {
        this.TableName = tableName;
        this.Fields = fieldNames;
        this.IndexCount = indexCount;
        this.Formatters = formatters;
    }

    Query() {
        return this.Formatters.FormatIndex( this.TableName, this.Fields, this.IndexCount );
    }
}


module.exports = IndexBuilder;