const assert = require("chai").assert;
const ShortId = require("shortid");

const RedEntitiesConfig = require("../providersconfig.json").sqliteproviderconfig;
const testSchema = require("../testschema.json");

const RedEntities = require("../../lib/redentities")(RedEntitiesConfig);
const db = RedEntities.Entities(testSchema);

async function insertSampleUserEntity() {
    let name = ShortId.generate().replace("-","A").replace("_","B"); // Avoid _ and - to test order by methods

    let entity = { Name: name, Alias: ShortId.generate() };

    entity.ID = await db.users.I().V(entity).R();

    return entity;
}

async function insertSampleUserEntities( count ) {
    let r = [];

    for( let i = 0 ; i < count; i++ ) {
        let newEntity = await insertSampleUserEntity();

        r.push( newEntity );
    }

    return r;
}

describe( 'Sqlite Redentities select tests', () => {
    before( async () => {
        await db.RemoveAndCreateDatabase( RedEntitiesConfig.database );
        await RedEntities.Entities( testSchema ).CreateSchema();            
    });

    it( '# Sqlite Insert simple entity and check entity exists', async () => {        
        let user = await insertSampleUserEntity();
        let entity = await db.users.S().SingleById( user.ID );

        assert.equal( entity.ID, user.ID );
    });

    it( '# Sqlite Try SingleById with no existing id', async () => {        
        db.users.S().SingleById( ShortId.generate() )
            .then( () => assert.fail("Should fail SingleById() method") )
            .catch( err => assert.ok(true) );
    });

    it( '# Sqlite Insert simple entity and select by field', async () => {        
        let user = await insertSampleUserEntity();        
        let entity = await db.users.S().W("Name = ?", user.Name).Single();

        assert.equal( entity.Name, user.Name );
    });

    it( '# Sqlite Try select by field with no existing field', async () => {
        await db.users.S().W("Name = ?", ShortId.generate()).Single()
            .then( () => assert.fail("Shold fail Single() method") )
            .catch( err => assert.ok(true) )
    });

    
    it( '# Sqlite Select all users', async () => {
        let entities = await db.users.S().Run();
    });

    it( '# Sqlite Select count', async () => {
        let count = await db.users.S().Count();
        assert.isNumber( count );
    });

    it( '# Sqlite Exists entity', async () => {
        let user = await insertSampleUserEntity();
        let exists = await db.users.S().W("Name = ?", user.Name).Exists();
        
        assert.isTrue(exists);
    });    

    it( '# Sqlite Check no exists no existing entity', async () => {
        let userName = ShortId.generate();
        let exists = await db.users.S().W("Name = ?", userName).Exists();
        
        assert.isFalse(exists);    
    });    

    it( '# Sqlite Check boolean value with boolean value to true', async () => {
        let entityId = await db.booleantype.I().V( { Value: "true" }).R();
        let entity = await db.booleantype.S().SingleById( entityId );

        assert.isTrue( entity.Value );
    });

    it( '# Sqlite Check boolean value with boolean value to false', async () => {
        let entityId = await db.booleantype.I().V( { Value: "false" }).R();
        let entity = await db.booleantype.S().SingleById( entityId );

        assert.isFalse( entity.Value );
    });

    it( '# Sqlite Check datetime value', async () => {
        let now = new Date(new Date().toUTCString())
        
        let entityId = await db.datetimetype.I().V( { Value: now } ).R();
    
        let entity = await db.datetimetype.S().SingleById( entityId );

        assert.equal(now.toString(), entity.Value.toString());
    });

    it( '# Sqlite Limit some values', async () => {
        await insertSampleUserEntities( 10 );

        let fiveUsers = await db.users.S().L(0,5).R();

        assert.equal( 5, fiveUsers.length );
    });

    it( '# Sqlite Limit one element', async () => {
        await insertSampleUserEntities( 10 );
        
        let fiveUsers = await db.users.S().L(0,1).R();

        assert.equal( 1, fiveUsers.length );
    });

    it( '# Sqlite Take some values', async () => {
        await insertSampleUserEntities( 10 );
        
        let fiveUsers = await db.users.S().T(5).R();

        assert.equal( 5, fiveUsers.length );
    });

    it( '# Sqlite Take one element', async () => {
        await insertSampleUserEntities( 10 );
        
        let fiveUsers = await db.users.S().T(1).R();

        assert.equal( 1, fiveUsers.length );
    });

    it( '# Sqlite Iterate all', async () => {
        await insertSampleUserEntities( 10 );

        let count = await db.users.S().Count();
        let counted = 0;

        let fnc = async (entity) => {
            counted++;
        }

        await db.users.S().IterateAll(fnc);

        assert.equal( count, counted );
    });

    it( '# Sqlite Iterate all and check all different entities', async () => {
        await insertSampleUserEntities( 10 );

        let counted = 0;
        let keys = new Set();

        let fnc = async (entity) => {
            counted++;
            keys.add( entity.ID );
        }

        await db.users.S().IA(fnc);

        assert.equal( counted, keys.size );
    });

    it( '# Sqlite Order by', async () => {
        await insertSampleUserEntities( 10 );

        await db.users.S().OrderBy("name").R();
    });

    it( '# Sqlite Order by asc and check values', async () => {
        await insertSampleUserEntities( 10 );

        let entities = await db.users.S().OrderBy("Name").R();

        for( let i = 0; i < entities.length-1; i++ ) {
            let name1 = entities[i].Name;
            let name2 = entities[i+1].Name;

            assert.equal( -1, name1.localeCompare(name2) );
        }
    });

    it( '# Sqlite Order by desc and check values', async () => {
        await insertSampleUserEntities( 10 );

        let entities = await db.users.S().OB("Name",false).R();

        for( let i = 0; i < entities.length-1; i++ ) {
            let name1 = entities[i].Name;
            let name2 = entities[i+1].Name;

            assert.equal( 1, name1.localeCompare(name2) );
        }
    });

    it( '# Sqlite Iterate all with entities ordered', async() => {
        await insertSampleUserEntities( 10 );

        let counted = 0;
        let keys = new Set();

        let fnc = async (entity) => {
            counted++;
            keys.add( entity.ID );
        }

        await db.users.S().OB("Name").IA(fnc);

        assert.equal( counted, keys.size );
    });

    it( '# Sqlite Insert key string in a key field', async() => {
        let key = ShortId.generate().replace("-","A").replace("_","B"); // Avoid _ and - to test order by methods

        let entity = { k0: key };
    
        entity.ID = await db.keytable.I().V(entity).R();
    
        assert.isString(entity.ID);
    });

    it( '# Sqlite Insert and get key string in a key field', async() => {
        let key = ShortId.generate().replace("-","A").replace("_","B"); // Avoid _ and - to test order by methods

        let entity = { k0: key };
    
        entity.ID = await db.keytable.I().V(entity).R();
    
        let entity2 = await db.keytable.S().W("ID=?", entity.ID).Single();

        assert.equal(entity.ID,entity2.ID);
        assert.equal(entity.k0,entity2.k0);
    });

    it( '# Sqlite Insert in a json field', async() => {
        let key = ShortId.generate().replace("-","A").replace("_","B"); // Avoid _ and - to test order by methods

        let entity = { j0: { value: key } };
    
        entity.ID = await db.jsontable.I().V(entity).R();
    
        assert.isString(entity.ID);
    });

    it( '# Sqlite Insert in a json field and retrieve', async() => {
        let key = ShortId.generate().replace("-","A").replace("_","B"); // Avoid _ and - to test order by methods

        let entity = { j0: { value: key } };
    
        entity.ID = await db.jsontable.I().V(entity).R();
        let entity2 = await db.jsontable.S().W("ID=?", entity.ID).Single();
        
        assert.equal(entity.ID,entity2.ID);
        assert.equal(entity.j0.value,entity2.j0.value);
    });

    it( '# Sqlite Insert in a float field and retrieve', async() => {
        let entity = { f: 1.9 };
    
        entity.ID = await db.floattable.I().V(entity).R();
        let entity2 = await db.floattable.S().W("ID=?", entity.ID).Single();
    
        assert.equal(entity.ID, entity2.ID);
        assert.equal(entity.f.value, entity2.f.value);
    });

    it( '# Sqlite get query string', async () => {
        let query = await db.users.S().L(0,5).Q();     

        assert.isString( query );
    });
});