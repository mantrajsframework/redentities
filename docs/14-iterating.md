# #14 Red Entities iterating over values

When formatting a query, you can iterate over the results using IA() selector.

This selector expects a function which recieves as parameter the instance of the entity.

```js
// Iterater over all users

let fnc = async (entity) => {
    // Do something with entity :)
}

await db.users.S().IA(fnc);
```

[Next - #15 Advanced topics](/docs/15-advanced-topics.md)

#### Credits

`RedEntities` has been fully written by  [Rafael Gómez Blanes](https://github.com/gomezbl)

Professional site at [Rafablanes.com](https://www.rafablanes.com)

Have a look to my books at [Rafa G. Blanes books](https://www.rafablanes.com/mislibros)