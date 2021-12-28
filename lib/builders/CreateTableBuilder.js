"use strict";

class CreateTableBuilder {
    constructor( tableName, formatters ) {
        this.TableName = tableName;
        this.Fields = [];
        this.Formatters = formatters;
    }

    AddField( name, type ) {
        this.Fields.push( { name: name, type: type } );
    }

    Query() {
        return this.Formatters.FormatCreateTable( this.TableName, this.Fields );
    }
}

module.exports = CreateTableBuilder