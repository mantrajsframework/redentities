/*
 * This code file belongs to Mantra Framework project (www.mantrajs.com)
 * in the scope of MIT license. More info at support@mantrajs.com. Enjoy :-)
 */ 

const assert = require("chai").assert;

const RedEntitiesConfig = require("../providersconfig.json").postgresqlproviderconfig;
const RedEntities = require("../../lib/redentities")(RedEntitiesConfig);
const RedEntitiesTestUtils = require("../lib/redentitiestestutils");

const testSchema = require("../testschema.json");
const db = RedEntities.Entities(testSchema);

describe( 'Postgres Redentities update tests', () => {
    before( async () => {
        await require("../../lib/providers/postgresql/PostgresqlConnector").ClearPool();

        await db.RemoveAndCreateDatabase( RedEntitiesConfig.database );
        await RedEntities.Entities( testSchema ).CreateSchema();            
    });

    it( '# Postgres Update simple entity', async () => {
        let newAlias = RedEntitiesTestUtils.EntityShortId();
        let user = await RedEntitiesTestUtils.InsertSampleUserEntity(db);
        await db.users.U().W("ID = ?", user.ID).V( ["alias"], [newAlias] ).R();
        let entity = await db.users.S().SingleById(user.ID);

        assert.equal( newAlias, entity.alias );
    });

    it( '# Postgres Update simple entity with object', async () => {
        let newAlias = RedEntitiesTestUtils.EntityShortId();
        let user = await RedEntitiesTestUtils.InsertSampleUserEntity(db);
        await db.users.U().W("ID = ?", user.ID).V( { alias: newAlias } ).R();
        let entity = await db.users.S().SingleById(user.ID);

        assert.equal( newAlias, entity.alias );
    });

    it( '# Postgres Update date time entity', async() => {
        let now = new Date(new Date().toUTCString())

        let entityId = await db.datetimetype.I().V( { value: now } ).R();
    
        let newDateTime = new Date(new Date().toUTCString())

        await db.datetimetype.U().W("ID=?",entityId).V( ["value"], [newDateTime]).R();
    });

    it( '# Postgres get update query string', async () => {
        let newAlias = RedEntitiesTestUtils.EntityShortId();
        let user = await RedEntitiesTestUtils.InsertSampleUserEntity(db);
        let sqlQuery = await db.users.U().W("ID = ?", user.ID).V( { alias: newAlias } ).Q();

        assert.isString( sqlQuery );
    });

    it( '# Postgres update and check JSON stringified', async () => {
        let v = [];
        let values = { name: JSON.stringify(v), alias: v };
        let id = await db.users.I().V( values ).R();

        v.push("element");

        await db.users.U().W("ID=?",id).V({ name: JSON.stringify(v) }).R();

        let entity = await db.users.S().SingleById(id);

        let v2 = JSON.parse(entity.name);

        assert.equal(v[0], v2[0]);
    });
});