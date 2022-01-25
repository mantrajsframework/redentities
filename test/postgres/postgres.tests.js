const assert = require("chai").assert;
const ShortId = require("shortid");

const RedEntitiesConfig = require("../providersconfig.json").postgresproviderconfig;
const testSchema = require("../testschema.json");

const RedEntities = require("../../lib/redentities")(RedEntitiesConfig);
const db = RedEntities.Entities(testSchema);

function EntityShortId() {
    ShortId.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZñÑ');
    return ShortId.generate();
}

describe( 'Mysql Redentities tests', () => {
    before( async () => {
        //console.log(RedEntitiesConfig.database);
        //await db.RemoveDatabase( RedEntitiesConfig.database );

        //await db.RemoveAndCreateDatabase( RedEntitiesConfig.database );
    });

    it( '# first', async () => {
        let schema = {};
    });
    
    
    it( '# first', async () => {
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

        await db.RemoveDatabase( RedEntitiesConfig.database );
        /*
        const re = RedEntities.Entities( schema );
        const r = await re.RunQuery( "DROP DATABASE IF EXISTS ff;" );
        */
        console.log(r);
    });
    

    // it( '# Mysql Check if no existing schema exists', async () => {
    //     let schema = {
    //         entities: [
    //             {   name: EntityShortId(),
    //                 fields: [
    //                     { name: "Name", type: "string" },
    //                     { name: "Age", type : "integer" }
    //                 ]
    //             }
    //         ]
    //     }

    //     let exists = await RedEntities.Entities( schema ).ExistsSchema();

    //     assert.isFalse( exists );
    // });

    // it( '# Mysql Check existing schema', async () => {
    //     let testSchema = {
    //         entities: [
    //             {
    //                 name: EntityShortId(),
    //                 fields: [
    //                     { name: "title", type: "string" }
    //                 ]
    //             }
    //         ]
    //     }

    //     let db = RedEntities.Entities( testSchema );
    //     await db.CreateSchema();
    //     let exists = await db.ExistsSchema();

    //     assert.isTrue( exists );
    // });

    /*
    it( '# Mysql Create schema with one entity', async () => {
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
    */

    // it( '# Mysql Create schema with multiple entities', async () => {
    //     let testSchema = {
    //         entities: [
    //             {
    //                 name: EntityShortId(),
    //                 fields: [
    //                     { name: "title", type: "string" },
    //                     { name: "alias", type: "string" }
    //                 ]
    //             },
    //             {
    //                 name: EntityShortId(),
    //                 fields: [
    //                     { name: "user", type: "string" },
    //                     { name: "password", type: "string" }
    //                 ]
    //             },
    //         ]
    //     }

    //     await RedEntities.Entities( testSchema ).CreateSchema();
    // });

    // it( '# Mysql GetFieldDefinitionInSchema test', () => {
    //     let testSchema = {
    //         entities: [
    //             {
    //                 name: "book",
    //                 fields: [
    //                     { name: "title", type: "string" },
    //                     { name: "alias", type: "string" }
    //                 ]
    //             }
    //         ]
    //     }

    //     let db = RedEntities.Entities(testSchema);

    //     let definition = db.GetFieldDefinitionInSchema( "book", "title" );

    //     assert.equal( definition.name, "title" );
    //     assert.equal( definition.type, "string" );
    // });

    // it( '# Mysql RenameSchemaEntities test', async () => {
    //     let testSchema = {
    //         entities: [
    //             {
    //                 name: "book",
    //                 fields: [
    //                     { name: "title", type: "string" },
    //                     { name: "alias", type: "string" }
    //                 ]
    //             }
    //         ]
    //     }

    //     let re = await RedEntities.Entities(testSchema);
    //     await re.CreateSchema();

    //     await re.RenameSchemaEntities( "t" );

    //     let exists = await re.ExistsTable( "bookt" );

    //     assert.isTrue(exists);
    // });
    
    // it( '# Mysql check entities populated', async () => {
    //     let testSchema = {
    //         entities: [
    //             {
    //                 name: "book",
    //                 fields: [
    //                     { name: "title", type: "string" },
    //                     { name: "alias", type: "string" }
    //                 ]
    //             }
    //         ]
    //     }

    //     let re = await RedEntities.Entities(testSchema);
        
    //     await re.CreateSchema();

    //     assert.isTrue( typeof re.book.I == 'function' );
    //     assert.isTrue( typeof re.book.S == 'function' );
    //     assert.isTrue( typeof re.book.D == 'function' );
    //     assert.isTrue( typeof re.book.U == 'function' );
    // })

    // it( '# Mysql NewId test', () => {
    //     let newId = db.NewId();

    //     assert.isString( newId );
    // });

    // it( '# Mysql RenameSchemaEntities', async() => {
    //     let entityName = EntityShortId();
    //     let sufix = "_n";

    //     let schema = {
    //         entities: [
    //             {   name: entityName,
    //                 fields: [
    //                     { name: "Name", type: "string" },
    //                     { name: "Age", type : "integer" }
    //                 ] 
    //             }   
    //         ]
    //     }

    //     let db = RedEntities.Entities( schema );
    //     await db.CreateSchema();

    //     assert.isTrue( await db.ExistsSchema() );

    //     await db.RenameSchemaEntities( sufix );

    //     assert.isTrue(await db.ExistsTable( entityName+sufix ));
    // });

    // it( '# Mysql Exists database', async() => {
    //     assert.isTrue( await db.ExistsDatabase( RedEntitiesConfig.database ) );
    // });
});