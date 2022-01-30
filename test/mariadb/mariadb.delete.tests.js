const { assert } = require("chai");
const ShortId = require("shortid");

const RedEntitiesConfig = require("../providersconfig.json").mariadbproviderconfig;
const testSchema = require("../testschema.json");

const RedEntities = require("../../lib/redentities")(RedEntitiesConfig);
const db = RedEntities.Entities(testSchema);

async function insertSampleUserEntity() {
    let entity = { name: ShortId.generate(), alias: ShortId.generate() };

    entity.ID = await db.Insert( "users" )
        .Values( entity )
        .Run()

    return entity;
}

describe( 'Mysql Redentities delete tests', () => {
    before( async () => {
        await db.RemoveAndCreateDatabase( RedEntitiesConfig.database );
        await RedEntities.Entities( testSchema ).CreateSchema();            
    });

    it( '# Mysql Delete simple entity by ID', async () => {
        let user = await insertSampleUserEntity();
        await db.Delete("users").DeleteById( user.ID );

        assert.equal( 0, await db.users.S().W("ID=?", user.ID).C() );
    });

    it( '# Mysql Delete simple entity by field', async () => {
        let user = await insertSampleUserEntity();
        await db.Delete("users").Where( "name = ?", user.name ).Run();
    });

    it( '# Mysql Delete get query string', async () => {
        let user = await insertSampleUserEntity();
        let sqlQuery = await db.Delete("users").Where( "name = ?", user.name ).Q();

        assert.isString( sqlQuery );
    });
});