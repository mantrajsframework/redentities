const assert = require("chai").assert;
const ShortId = require("shortid");

const RedEntitiesConfig = require("../providersconfig.json").mysqlproviderconfig;
const testSchema = require("../testschema.json");

const RedEntities = require("../../lib/redentities")(RedEntitiesConfig);
const db = RedEntities.Entities(testSchema);

function EntityShortId() {
    ShortId.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZñÑ');
    return ShortId.generate();
}

describe( 'Mysql Indexes tests', () => {
    before( async () => {
        await db.RemoveAndCreateDatabase( RedEntitiesConfig.database );
    });

    it( '# Mysql check index creation with type key', async () => {
        let schema = {
            entities: [
                {
                    name: EntityShortId(),
                    fields: [
                        { "name": "f0", "type": "key" },
                        { "name": "name", "type": "string" }
                    ],
                    indexes: [ ["f0"] ]
                }
            ]
        }

        let db = RedEntities.Entities( schema );
        await db.CreateSchema();
        let exists = await db.ExistsSchema();

        assert.isTrue( exists );
    });

    it( '# Mysql check index creation with type integer', async () => {
        let schema = {
            entities: [
                {
                    name: EntityShortId(),
                    fields: [
                        { "name": "f0", "type": "integer" },
                        { "name": "name", "type": "string" }
                    ],
                    indexes: [ ["f0"] ]
                }
            ]
        }

        let db = RedEntities.Entities( schema );
        await db.CreateSchema();
        let exists = await db.ExistsSchema();

        assert.isTrue( exists );
    });

    it( '# Mysql check index creation with type string', async () => {
        let schema = {
            entities: [
                {
                    name: EntityShortId(),
                    fields: [
                        { "name": "f0", "type": "string" },
                        { "name": "name", "type": "string" }
                    ],
                    indexes: [ ["f0"] ]
                }
            ]
        }

        let db = RedEntities.Entities( schema );
        await db.CreateSchema();
        let exists = await db.ExistsSchema();

        assert.isTrue( exists );
    });

    it( '# Mysql check index creation with type multiple keys', async () => {
        let schema = {
            entities: [
                {
                    name: EntityShortId(),
                    fields: [
                        { "name": "f0", "type": "key" },
                        { "name": "f1", "type": "key" },
                        { "name": "name", "type": "string" }
                    ],
                    indexes: [ ["f0","f1"] ]
                }
            ]
        }

        let db = RedEntities.Entities( schema );
        await db.CreateSchema();
        let exists = await db.ExistsSchema();

        assert.isTrue( exists );
    });

    it( '# Mysql check index creation with type multiple indexes', async () => {
        let schema = {
            entities: [
                {
                    name: EntityShortId(),
                    fields: [
                        { "name": "f0", "type": "key" },
                        { "name": "f1", "type": "key" },
                        { "name": "f2", "type": "string" },
                        { "name": "name", "type": "string" }
                    ],
                    indexes: [ ["f0","f1"], ["f2"] ]
                }
            ]
        }

        let db = RedEntities.Entities( schema );
        await db.CreateSchema();
        let exists = await db.ExistsSchema();

        assert.isTrue( exists );
    });
});