# #13 Red Entities delete sentences

Deleting entities with Red Entities is fast using D() selector:

```js
await db.users.D().DeleteById(userIdToRemove);

await db.users.D().W("mail=?",mail).R();
```

D() selectors returns the number of rows removed.

[Next - #14 Iterating over values](/docs/14-iterating.md)

#### Credits

`RedEntities` has been fully written by  [Rafael Gómez Blanes](https://github.com/gomezbl)

Professional site at [Rafablanes.com](https://www.rafablanes.com)

Have a look to my books at [Rafa G. Blanes books](https://www.rafablanes.com/mislibros)