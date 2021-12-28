# #15 Advanced topics

Here you can found some *advanced* topics.

## Renaming tables
To rename one specific entity (table):

```js
await db.RenameSchemaEntity( "users", "users_temp" );
```

To rename all entities of schema at once given a *sufix*:

```js
await db.RenameSchemaEntities( "_temp" );
```

This will rename all tables to "<table_name>_temp".

## Getting final sql query formatter

All selectors ( S(), I(), D(), U() ) provides the selector Q() to get the string of the query formatted:

```js
let sqlQuery = db.users.S().W("mail=?", "rd@redentities.com").Q();
```

With its synonimous .Query():

```js
let sqlQuery = db.users.S().W("mail=?", "rd@redentities.com").Query();
```

#### Credits

`RedEntities` has been fully written by  [Rafael Gómez Blanes](https://github.com/gomezbl)

Professional site at [Rafablanes.com](https://www.rafablanes.com)

Have a look to my books at [Rafa G. Blanes books](https://www.rafablanes.com/mislibros)