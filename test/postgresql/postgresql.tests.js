const assert = require("chai").assert;
const ShortId = require("shortid");

const RedEntitiesConfig = require("../providersconfig.json").postgresqlproviderconfig;
const testSchema = require("../testschema.json");

const RedEntities = require("../../lib/redentities")(RedEntitiesConfig);
const db = RedEntities.Entities(testSchema);

function EntityShortId() {
    ShortId.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZñÑ');

    // In Postgres, table names and entities should be lower case.
    return "pg"+ShortId.generate().toLowerCase();
}

describe( 'Postgres Redentities tests', () => {
    before( async () => {
        await require("../../lib/providers/postgres/PostgresConnector").ClearPool();

        await db.RemoveAndCreateDatabase( RedEntitiesConfig.database );
    });

    it( '# Postgres Check if no existing schema exists', async () => {
        let schema = {
            entities: [
                {   name: EntityShortId(),
                    fields: [
                        { name: "Name", type: "string" },
                        { name: "Age", type : "integer" }
                    ]
                }
            ]
        }

        let exists = await RedEntities.Entities( schema ).ExistsSchema();

        assert.isFalse( exists );
    });


    it( '# Postgres Check existing schema', async () => {
        let testSchema = {
            entities: [
                {
                    name: EntityShortId(),
                    fields: [
                        { name: "title", type: "string" }
                    ]
                }
            ]
        }

        let db = RedEntities.Entities( testSchema );
        await db.CreateSchema();
        
        let exists = await db.ExistsSchema();
        assert.isTrue( exists );
    });

    it( '# Postgres Create schema with one entity', async () => {
        let testSchema = {
            entities: [
                {
                    name: EntityShortId(),
                    fields: [
                        { name: "title", type: "string" },
                        { name: "alias", type: "string" }
                    ]
                }
            ]
        }

         await RedEntities.Entities( testSchema ).CreateSchema();
    });

    it( '# Postgres Create schema with multiple entities', async () => {
        let testSchema = {
            entities: [
                {
                    name: EntityShortId(),
                    fields: [
                        { name: "title", type: "string" },
                        { name: "alias", type: "string" }
                    ]
                },
                {
                    name: EntityShortId(),
                    fields: [
                        { name: "userx", type: "string" },
                        { name: "password", type: "string" }
                    ]
                },
            ]
        }

        await RedEntities.Entities( testSchema ).CreateSchema();
    });

    it( '# Postgres GetFieldDefinitionInSchema test', () => {
        let testSchema = {
            entities: [
                {
                    name: "book",
                    fields: [
                        { name: "title", type: "string" },
                        { name: "alias", type: "string" }
                    ]
                }
            ]
        }

        let db = RedEntities.Entities(testSchema);

        let definition = db.GetFieldDefinitionInSchema( "book", "title" );

        assert.equal( definition.name, "title" );
        assert.equal( definition.type, "string" );
    });

    it( '# Postgres RenameSchemaEntities test', async () => {
        let testSchema = {
            entities: [
                {
                    name: "book",
                    fields: [
                        { name: "title", type: "string" },
                        { name: "alias", type: "string" }
                    ]
                }
            ]
        }

        let re = RedEntities.Entities(testSchema);
        await re.CreateSchema();
        await re.RenameSchemaEntities( "t" );
        let exists = await re.ExistsTable( "bookt" );

        assert.isTrue(exists);
    });
    
    it( '# Postgres check entities populated', async () => {
        let testSchema = {
            entities: [
                {
                    name: "book",
                    fields: [
                        { name: "title", type: "string" },
                        { name: "alias", type: "string" }
                    ]
                }
            ]
        }

        let re = await RedEntities.Entities(testSchema);
        
        await re.CreateSchema();

        assert.isTrue( typeof re.book.I == 'function' );
        assert.isTrue( typeof re.book.S == 'function' );
        assert.isTrue( typeof re.book.D == 'function' );
        assert.isTrue( typeof re.book.U == 'function' );
    })

    it( '# Postgres NewId test', () => {
        let newId = db.NewId();

        assert.isString( newId );
    });

    it( '# Postgres RenameSchemaEntities', async() => {
        let entityName = EntityShortId();
        let sufix = "_n";

        let schema = {
            entities: [
                {   name: entityName,
                    fields: [
                        { name: "Name", type: "string" },
                        { name: "Age", type : "integer" }
                    ] 
                }   
            ]
        }

        let db = RedEntities.Entities( schema );
        await db.CreateSchema();

        assert.isTrue( await db.ExistsSchema() );

        await db.RenameSchemaEntities( sufix );

        assert.isTrue(await db.ExistsTable( entityName+sufix ));
    });

    it( '# Postgres Exists database', async() => {
        assert.isTrue( await db.ExistsDatabase( RedEntitiesConfig.database ) );
    });
});