# #10 Red Entities insert sentences

Inserting new values is easy using I() selector:

## Insert simple value

```js
const entityId = await db.users.I().V( { mail: "rd@redentities.com", password: "12345" }).R();
```

If any property of the entity is missing, the default value of the schema will be used instead.

[Next - #11 Selecting values](/docs/11-select.md)

#### Credits

`RedEntities` has been fully written by  [Rafael Gómez Blanes](https://github.com/gomezbl)

Professional site at [Rafablanes.com](https://www.rafablanes.com)

Have a look to my books at [Rafa G. Blanes books](https://www.rafablanes.com/mislibros)