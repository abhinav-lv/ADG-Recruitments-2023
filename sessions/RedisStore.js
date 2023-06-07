require('dotenv').config();
const RedisStore = require('connect-redis').default;
const {createClient} = require('redis');

/* FOR PRODUCTION */
const redisClient = createClient({
    url: process.env.REDIS_URL
});
// const redisClient = createClient()

try{
    redisClient.connect()
}
catch(err){
    console.error(err)
}

// Initialize store
const redisStore = new RedisStore({
    client: redisClient,
    prefix: process.env.REDIS_PREFIX,
});

module.exports = {redisStore, redisClient}