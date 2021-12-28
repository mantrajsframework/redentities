## #01 Introduction

Red Entities is a simple object-mapper & sql builder for building quickly model schemas and accessing data with fast and minimal code.

It has been design with optimization and extensibility in mind. Future versions will improve and add more database providers.

Current version supports MySql (and all its flavours) and Sqlite 3. Currently is fully tested only with MySql 5.x, 8.x, Aurora and AWS RDS Mysql based databases.

## Design intention

The design intention behind Red Entities is to keep data in data repositories (databases) with minimal design and no relations between entities, avoiding complex sql syntax typing in production code.

This can be sound weird to hear, but this is one of the principles to follow for radical componetization of large applications that will evolve and will be change continuosly with changes in the business layer, database design, etc.

Minimal design in data repositories: Yes, is a principle to afford big projects with models which change constantly. Just use repositories as... a way to store, modify an retrieve data.

Each component in the system should use and manage its own simple data repositories (just a few tables).

That's the reason that Red Entities doesn't support joins... (but maybe in the future).

Is some kind of analytics should be performed over data, then these data should be placed in a way to *allow* data analysis in a different repository, but production data should be placed in a simple storage as posible: fast to insert and fast to retrieve with minimal syntax to do this.

The way you explote your data, determines the way it should be stored.

This project is part of Mantra Framework, which uses fully Red Entities as its object-mapper data access layer to build its components.

[Next - #02 Providers config](/docs/02-providers.md)

#### Credits

`RedEntities` has been fully written by  [Rafael Gómez Blanes](https://github.com/gomezbl)

Professional site at [Rafablanes.com](https://www.rafablanes.com)

Have a look to my books at [Rafa G. Blanes books](https://www.rafablanes.com/mislibros)