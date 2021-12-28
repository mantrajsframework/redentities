# 03 Red Entities schemas

A schema is a json object describing the data you need to persist.

One json schema object can contain different entities (tables), each one with different propeties (fields).

Each entity consists of a number of properties (fields with their types).

Red Entities maps the schema to sql table dialects, depending on the provider (Mysql, Sqlite, etc.).

In the scope of your application, create your Red Entities instances with your schemas *once*, because the process of mapping and creation of shortcut functions is heavy load.

## #03 Defining a schema

You define a schema with this sort of json object:

```js
const schema = {
    entities: [
        {
            name : <name of the entity>,
            fields: [
                { name : <name of the property>, type: <type of the property>, default: <default value> }
                ...
            ],
            indexes: [ [<name of the property>], [<name of the property 1>, <name of the property 2>] ],
            restrictions: {
                unique: [ [<name of the property>] ]
            }
        }
        ...
    ]
}
```

Each entity is mapped to a sql table. See next section [#04 Types supported](/docs/04-types.md) to check types currently supported and how they are mapped to specific engines supported.

[Next - #04 Supported types](/docs/04-types.md) 

#### Credits

`RedEntities` has been fully written by  [Rafael Gómez Blanes](https://github.com/gomezbl)

Professional site at [Rafablanes.com](https://www.rafablanes.com)

Have a look to my books at [Rafa G. Blanes books](https://www.rafablanes.com/mislibros)