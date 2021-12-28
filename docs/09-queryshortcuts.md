# #09 Red Entities query shortcuts

Red Entities has been design to minimize the code needed to access data, in a regular and coherent way, avoidind sql syntax directly with all its dialects depending on the provider.

There exists four *shorcuts* or *selectors* to write sql sentences efficiently and quickly.

Given 

```js
const db = await RedEntities.Entities(sampleSchema);
```

, you have these shorcuts:

* S() -> to create select queries
* I() -> to create insert queries
* U() -> to create update queries
* D() -> to create delete queries

Selectors are properties of entity instance of db object; in the sample, there's a 'user' entity (table):

* db.users.S()
* db.users.I()
* db.users.U()
* db.users.D()

[Next - #10 Inserting values](/docs/10-insert.md)

#### Credits

`RedEntities` has been fully written by  [Rafael Gómez Blanes](https://github.com/gomezbl)

Professional site at [Rafablanes.com](https://www.rafablanes.com)

Have a look to my books at [Rafa G. Blanes books](https://www.rafablanes.com/mislibros)