"use strict";

class UniqueIndexBuilder {
    constructor( tableName, fieldNames, indexCount, formatters ) {
        this.TableName = tableName;
        this.Fields = fieldNames;
        this.IndexCount = indexCount;
        this.Formatters = formatters;
    }

    Query() {
        return this.Formatters.FormatUniqueIndex( this.TableName, this.Fields, this.IndexCount);
    }
}

module.exports = UniqueIndexBuilder;