const assert = require("chai").assert;

const RedEntitiesConfig = require("../providersconfig.json").mysqlproviderconfig;
const RedEntitiesTestUtils = require("../lib/redentitiestestutils");
const testSchema = require("../testschema.json");

const RedEntities = require("../../lib/redentities")(RedEntitiesConfig);
const db = RedEntities.Entities(testSchema);

describe( 'Mysql Redentities insert tests', () => {
    before( async () => {
        await db.RemoveAndCreateDatabase( RedEntitiesConfig.database );
        await RedEntities.Entities( testSchema ).CreateSchema();            
    });

    it( '# Mysql Insert simple entity', async () => {
        let values = { name: RedEntitiesTestUtils.EntityShortId(), alias: RedEntitiesTestUtils.EntityShortId() };
        await db.users.I().V( values ).R();
    });

    it( '# Mysql Insert simple entity and check ID', async () => {
        let entityId = await db.users.I().V( { name: RedEntitiesTestUtils.EntityShortId(), alias: "foo" } ).R();

        assert.equal( "string", typeof entityId );
    });

    it( '# Mysql Insert boolean value with boolean value', async () => {
        let entityId = await db.booleantype.I().V( { value: true }).R();

        assert.equal( "string", typeof entityId );
    });

    it( '# Mysql Insert boolean value with string value', async () => {
        let entityId = await db.booleantype.I().V( { value: "true" }).R();

        assert.equal( "string", typeof entityId );
    });

    it( '# Mysql Insert datetime value', async () => {
        let now = new Date(new Date().toUTCString())

        let entityId = await db.datetimetype.I().V( { value: now } ).R();
    
        assert.equal( "string", typeof entityId );
    });

    it( '# Mysql Insert default values', async () => {        
        let entityId = await db.defaultvalues.I().V( { f0 : "somevalue"} ).R();

        assert.equal( "string", typeof entityId );
    });

    it( '# Mysql Insert json value', async() => {
        let entityId = await db.jsontable.I().V( { j0 : { title: "The Coder Habits"}} ).R();

        assert.equal( "string", typeof entityId );
    });

    it( '# Mysql Insert simple json value and retrieve', async() => {
        let jsonTest = { a:20 };

        let entityId = await db.jsontable.I().V( { j0 : jsonTest } ).R();

        let jsonRetrieved = await db.jsontable.S().W("ID=?", entityId).R();

        assert.equal( "string", typeof entityId );
        assert.equal( JSON.stringify(jsonTest), JSON.stringify(jsonRetrieved[0].j0) );
    });

    it( '# Mysql Insert empty json value and retrieve', async() => {
        let jsonTest = {};

        let entityId = await db.jsontable.I().V( { j0 : jsonTest } ).R();

        let jsonRetrieved = await db.jsontable.S().W("ID=?", entityId).R();

        assert.equal( "string", typeof entityId );
        assert.equal( JSON.stringify(jsonTest), JSON.stringify(jsonRetrieved[0].j0) );
    });

    it( '# Mysql Insert array of json value and retrieve', async() => {
        let jsonTest = [{a:10},{a:20},{a:30}];

        let entityId = await db.jsontable.I().V( { j0 : jsonTest } ).R();

        let jsonRetrieved = await db.jsontable.S().W("ID=?", entityId).R();

        assert.equal( "string", typeof entityId );
        assert.equal( JSON.stringify(jsonTest), JSON.stringify(jsonRetrieved[0].j0) );
    });

    it( '# Mysql Insert complex json value and retrieve', async() => {
        let jsonTest = {
            book: 'bookname',
            title: 'title',
            ISBN: '2393939202033',
            userId: '88c8c8cosls',
            owners: [{a:10},{a:20},{a:30}]
        }

        let entityId = await db.jsontable.I().V( { j0 : jsonTest } ).R();

        let jsonRetrieved = await db.jsontable.S().W("ID=?", entityId).R();

        assert.equal( "string", typeof entityId );
        assert.equal( JSON.stringify(jsonTest), JSON.stringify(jsonRetrieved[0].j0) );
    });

    it( '# Mysql Insert float value', async() => {
        let entityId = await db.floattable.I().V( { f : 1.9 } ).R();

        assert.equal( "string", typeof entityId );
    });

    it( '# Mysql Insert string with quote entity', async () => {
        let alias = "O'Brian";
        let values = { name: RedEntitiesTestUtils.EntityShortId(), alias: alias };
        let entityId = await db.users.I().V( values ).R();

        let entity = await db.users.S().SingleById(entityId);
        assert.equal( entity.alias, alias );
    });

    it( '# Mysql Insert longtext', async () => {
        let text = "Su última novela es El proyecto de mi vida.()&";
        let values = { t: text };
        let entityId = await db.longtexttype.I().V( values ).R();

        let entity = await db.longtexttype.S().SingleById(entityId);
        assert.equal( entity.t, text );
    });

    it( '# Mysql Insert longtext with accents, quotes and symbols', async () => {
        let text = "'''Su última novela es El/ proy\"ecto de<>&%$()-_ mi vida.()&";
        let values = { t: text };
        let entityId = await db.longtexttype.I().V( values ).R();

        let entity = await db.longtexttype.S().SingleById(entityId);
        assert.equal( entity.t, text );
    });

    it( '# Mysql get query string', async () => {
        let alias = "O'Brian";
        let values = { name: RedEntitiesTestUtils.EntityShortId(), alias: alias };
        let sqlQuery = await db.users.I().V( values ).Q();

        assert.isString( sqlQuery );
    });

    it( '# Sqlite insert and check JSON stringified', async () => {
        let v = ["admin"];
        let values = { name: JSON.stringify(v), alias: v };
        let id = await db.users.I().V( values ).R();

        let entity = await db.users.S().SingleById(id);
        let v2 = JSON.parse(entity.name);

        assert.equal(v[0], v2[0]);
    });
});