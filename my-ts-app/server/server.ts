import express, { Request, Response } from 'express';

import sqlite3 from 'sqlite3';

const app = express();

const port = process.env.PORT || 5000;
//app.set('trust proxy', 'http://localhost:5000');
//app.get('/', (req: Request, res: Response) => { res.send('Hello from Express!'); });
app.get('/', (_req: Request, res: Response) => { res.send('Welcome to your backend!');});

app.listen(port, () => { console.log(`Server is running on port ${port}`); });

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const helmet = require('helmet');
const cors = require('cors');

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(cookieParser());
app.use(bodyParser.json());

//res.sendFile('Welcome to your backend!');

const db = new sqlite3.Database('./db/typescript database.db', (err) => {
    if(err){
        console.error('Error opening database:', err.message);
    }else{
        console.log('Connected to the SQLite database.');
    }
});

app.get('/api/data', (req: Request, res: Response) => {
    db.all('SELECT * FROM Projects', [], (err, rows) => {
        if (err){
            res.status(400).json({error: err.message});
            return;
        }
        res.json(rows);
    });
});

