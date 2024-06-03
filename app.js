import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import router from './Routes/routes.js';
import { uri } from './Models/userModel.js';

const app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));

const sessionStore = MongoStore.create({
    mongoUrl: uri,
    dbName: 'jobSite',
    collectionName: 'Encryption_session'
});

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    store: sessionStore
}));

app.use('/', router);

const PORT = 7070;
app.listen(PORT, () => {
    console.log(`Server is listening at port ${PORT} !!!`);
});
