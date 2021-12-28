# #05 Red Entities indexes

You can create any number of indexes in the definition of the schemas for your entities.

Two types indexes: regular ones and unique ones.

Just add atribute "indexes" and set an array with the names of the fields to index.

Unique indexes are added under "restrictions" attibute (cause in future versions, this will evolve with richer funcionality).

Following the sample schema used in this documentation, just have a look to "indexes" and "restrictions" properties.

```js
const sampleSchema = {
    entities: [
        {
            name : "users",
            fields: [
                { name : "mail", type : "string" },
                { name : "password", type : "string" },
                { name : "created", type : "datetime"}
            ],
            indexes: [ ["mail"], ["created"] ],
            restrictions: {
                unique: [ ["mail"] ]
            }
        }
    ]
}
```

In this sample, three indexes will be created when installing the schema in the database: one for "mail", one for "created" and another (and unique) for "mail".

You can create indexes for more than one field, like ["mail","alias"], ie.

[Next - #06 Rows ids](/docs/06-ids.md)

#### Credits

`RedEntities` has been fully written by  [Rafael Gómez Blanes](https://github.com/gomezbl)

Professional site at [Rafablanes.com](https://www.rafablanes.com)

Have a look to my books at [Rafa G. Blanes books](https://www.rafablanes.com/mislibros)