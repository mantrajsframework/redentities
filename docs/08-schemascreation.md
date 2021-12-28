# #08 Red Entities schemas creation

Considering sample schema, you can create it on database with the following code:

```js
const RedEntities = require("redentities")({
    provider: "mysql",
    host: "localhost",
    user: "myuser",
    password: "mypassword"
});

await RedEntities.Entities(sampleSchema).CreateSchema();
```

This work of creating a schema, obviously, only should have to be done once.

## Accessing schema instance

Once your schema is instantiated, you only have to create Red Entities instance to select, insert, update or delete entities:

```js
const RedEntities = require("redentities")({
    provider: "mysql",
    host: "localhost",
    user: "myuser",
    password: "mypassword"
});

let db = RedEntities.Entities(sampleSchema);

db.users.I().V( { mail: "foo@foo.com", password: "12345" } ).R();
```

In db instance, there's a property with the name of the entity (in this case 'users').

Remember: the purpose of Red Entities is to isolate database engines (as it do all ORMs) and to provide a way to type sql sentences in a fast and smarter way.

[Next - #09 Query shortcuts](/docs/09-queryshortcuts.md)

#### Credits

`RedEntities` has been fully written by  [Rafael Gómez Blanes](https://github.com/gomezbl)

Professional site at [Rafablanes.com](https://www.rafablanes.com)

Have a look to my books at [Rafa G. Blanes books](https://www.rafablanes.com/mislibros)