const app = require('./app');
const connectMongo = require('./db/connection');

require('dotenv').config();

const {DEV_PORT} = process.env
const PORT = DEV_PORT || 3000;

const start = async () => {
    try {
        await connectMongo();
        console.log('Database connection successful');
        
        app.listen(PORT, () => {
            console.log("Server running. Use our API on port: 3000")
          })
    } catch (error) {
        // todo - normal error type
        console.log('status 500, server or db error' + error);
        process.exit()
    }
}

start();
