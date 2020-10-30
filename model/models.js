import models from 'express-cassandra';

const cassContactPoint = process.env.CASS_ADDRESS || '127.0.0.1'
const cassPort = process.env.CASS_PORT || 9042
const cassKeyspace = process.env.CASS_KEYSPACE || 'mykeyspace'

// Express-cassandra ORM : Load models from /models
models.setDirectory(__dirname + '/models').bind(
    {
        clientOptions: {
            contactPoints: [cassContactPoint],
            protocolOptions: { port: cassPort },
            keyspace: cassKeyspace,
            queryOptions: {consistency: models.consistencies.one}
        },
        ormOptions: {
            defaultReplicationStrategy : {
                class: 'SimpleStrategy',
                replication_factor: 1
            },
            migration: 'safe',
            createTable: false
        }
    },
    function(err) {
        if (err) {
            console.log("Failed to bind to Cassandra." + __dirname + '/model')
            throw err;
        }
    }
)

export default models;