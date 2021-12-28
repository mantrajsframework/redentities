# #02 Red Entities schemas

(Remember: best documentation in software should be found at... tests)

When creating Red Entities instance, you need to set the provider config (Mysql, Sqlite, etc).

This provider info is a json object with some credentials (if needed) of data that the provider needs.

For Mysql based engines, json configuration object is like this:

```js
{
    provider: "mysql",
    host: <mysql host, localhost, ip, domain, etc.>,
    user: <user name>,
    password: <user password>
}
```

For Sqlite instance, the json configuration is simple:

```js
{
    provider: "sqlite",
    databasepath: <full path to the database file>
}
```

Given a configuration json object, you get a new Red Entities instance with:

```js
const RedEntities = require("redentities")( config );
```

Some samples of config files:

```js
const config = {
    provider: "mysql",
    host: "localhost",
    user: "myuser",
    password: "mypassword"
}
```

```js
const config {
    provider: "sqlite",
    databasepath: "/mnt/files/mydatabase.db"
}
```

[Next - #03 Defining schemas](/docs/03-schemas.md)

#### Credits

`RedEntities` has been fully written by  [Rafael Gómez Blanes](https://github.com/gomezbl)

Professional site at [Rafablanes.com](https://www.rafablanes.com)

Have a look to my books at [Rafa G. Blanes books](https://www.rafablanes.com/mislibros)