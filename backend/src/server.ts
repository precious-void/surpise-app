import express from 'express';
import { connect } from 'mongoose';
import dotenv from 'dotenv';
import { middlewares } from './middlewares/middlewares';

dotenv.config({ path: '../.env' });

const app = express();
const PORT = process.env.PORT || 9080;

app.use(middlewares);

async function Start() {
    if (process.env.MONGODB_URI !== undefined) {
        try {
            await connect(process.env.MONGODB_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
            });
            app.listen(PORT, () => {
                console.log('Server has been started on port ' + PORT);
            });
        } catch (err) {
            console.log(err);
        }
    } else {
        console.log('MongoDB is not connected');
    }
}

Start();
