"use strict";

const RedEntitiesUtils = require("../redentitiesutils");

const PAGESIZE = 10;

class SelectQueryBuilder {
    constructor( entityName, sqlEntities, fields, formatters) {
        this.sqlEntities = sqlEntities;
        this.selectProperties = {
            entityName: entityName,
            where: "",
            fields: fields,
            limitStart: -1,
            limitCount: -1,
            take: -1,
            orderBy: []
        }

        this.Formatters = formatters;
    }

    Query() {
        return this.Formatters.FormatSelect(this.selectProperties);
    }    

    Q() {
        return this.Query();
    }
    
    async Run() {
        const sql = this.Formatters.FormatSelect(this.selectProperties);

        return this.sanitizeValues( await this.sqlEntities.RunQuery(sql), sql );
    }

    async R() { return this.Run() }

    async IterateAll( fnc ) {
        const fields = this.selectProperties.fields;
        const count = await this.Count();

        this.selectProperties.fields = fields;
        this.selectProperties.limitCount = PAGESIZE;

        for( let i = 0; i < count; i+= PAGESIZE ) {
            this.selectProperties.limitStart = i;
            
            const entities = await this.sqlEntities.RunQuery( this.Formatters.FormatSelect(this.selectProperties) );
            
            for( let entity of entities ) { 
                await fnc(this.sanitizeValue(entity)); 
            }
        }
    }

    async IA( fnc ) {
        return this.IterateAll( fnc );
    }

    async SingleById( entityId ) {
        this.selectProperties.where = this.Formatters.FormatWhere( "ID=?", [entityId] );
        
        const entity = await this.sqlEntities.RunQuery( this.Formatters.FormatSelect(this.selectProperties) ) 

        return this.sanitizeValue(entity[0]);
    }

    async Single() {               
        const entity = await this.sqlEntities.RunQuery( this.Formatters.FormatSelect(this.selectProperties) );

        return this.sanitizeValue(entity[0]);
    }

    async S() {
        return this.Single(); 
    }

    async Count() {
        this.selectProperties.fields = this.Formatters.GetCountAll();

        const result = await this.sqlEntities.RunQuery( this.Formatters.FormatSelect(this.selectProperties) );

        return result[0][this.Formatters.GetCountAll()];
    }
    
    C() { return this.Count() }

    Limit( start, count ) {
        this.selectProperties.limitStart = start;
        this.selectProperties.limitCount = count;

        return this;
    }

    L( start, count ) {
        return this.Limit( start, count );
    }

    Take( count ) {
        this.selectProperties.take = count;
        
        return this;
    }

    T( count ) {
        return this.Take(count);
    }

    OrderBy( field, isAsc ) {
        this.selectProperties.orderBy.push( { field:field, isAsc: isAsc != undefined ? isAsc : true } );

        return this;
    }

    OB( field, isAsc ) {
        return this.OrderBy( field, isAsc );
    }

    O( field, isAsc ) {
        return this.OrderBy( field, isAsc );
    }

    async Exists() {
        this.selectProperties.fields = this.Formatters.GetCountAll();

        const result = await this.sqlEntities.RunQuery( this.Formatters.FormatSelect(this.selectProperties) );
        
        return result[0][this.Formatters.GetCountAll()] == 1;
    }

    E() { return this.Exists() }

    Where( expression, values ) {
        this.selectProperties.where = this.Formatters.FormatWhere(expression, values);

        return this;
    }

    W( e, v ) { return this.Where(e,v) }

    sanitizeValues(entities, sql) {
        let result = [];
        
        try {
            for( const entity of entities ) {
                let newEntity = this.sanitizeValue(entity);
    
                result.push( newEntity );
            }
    
            return result;
        } catch(err) {
            throw Error(`Exception on sanitizeValues with ${sql}`);
        }
    }

    sanitizeValue(entity) {
        let newEntity = {};

        for( const property of Object.keys(entity) ){
            if ( property == "ID" ) {
                newEntity[property] = entity[property];
            } else {
                let valueTypeInModel = this.sqlEntities.GetFieldDefinitionInSchema( this.selectProperties.entityName, property );
                
                switch( valueTypeInModel.type ) {
                    case "boolean": {
                        newEntity[property] = entity[property] == 1;    
                        break;    
                    }
                    case "datetime": {
                        newEntity[property] = new Date(entity[property]);
                        break;
                    }
                    case "json": {                
                        newEntity[property] = RedEntitiesUtils.FromBase64ToJson(entity[property]);
                        break;
                    }
                    default: {
                        newEntity[property] = entity[property];
                    }
                }
            } 
        }

        return newEntity;
    }
}

module.exports = SelectQueryBuilder;