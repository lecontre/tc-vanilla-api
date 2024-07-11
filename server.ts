import express from 'express';
import mongoose from "mongoose";
import Cards from './DataAccess/dbCards';
import Cors from 'cors';

// App Config
const app = express();
const port = process.env.PORT || 8001;
const connection_url = 'mongodb+srv://jorgeC:SGMDeqg0MoiDO0Ws@desperadoventureapps.qxsjfnc.mongodb.net/tinderDB?retryWrites=true&w=majority&appName=DesperadoVentureApps';


// Middlewares
app.use(express.json());
app.use(Cors());

// DB Config
mongoose.connect(connection_url);

// API Endpoints
app.get('/', (req, res) => res.status(200).send("HELLO CLEVER PROGRAMMERS, THIS IS NODE!!!"));

app.post('/tinder/cards', async (req, res) => {
    const dbCard = req.body;
    try {
        const data = await Cards.create(dbCard);
        res.status(201).send(data);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.get('/tinder/cards', async (req, res) => {
    try {
        const data = await Cards.find();
        res.status(200).send(data);
    }
    catch (err) {
        res.status(500).send(err);
    }
})

// Listener
app.listen(port, () => console.log(`listening on localhost: ${port}`));