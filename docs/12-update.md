# #12 Red Entities update sentences

Updating entities is done using U() selector and indicating the new values in V() selector.

```js
await db.U().W("ID=?", userId).V( { mail: "newmail@redentities.com" } ).R();
```

V() syntax allows to indicate values to update using arrays with field names and its fields values:

```js
await db.U().W("ID=?", userId).V(["mail"], ["newmail@redentities.com"]).R();
```

First parameters or V() is an array with the names of the fields to update; the second one is an array with the new values.

[Next - #13 Deleting values](/docs/13-delete.md)

#### Credits

`RedEntities` has been fully written by  [Rafael Gómez Blanes](https://github.com/gomezbl)

Professional site at [Rafablanes.com](https://www.rafablanes.com)

Have a look to my books at [Rafa G. Blanes books](https://www.rafablanes.com/mislibros)