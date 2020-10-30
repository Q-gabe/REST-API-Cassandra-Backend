import express from 'express';
import bodyParser from 'body-parser';
import cassandra from 'cassandra-driver';
import routes from './routes/routes';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.status(200).json('Connected to API server!');
})

app.use('/api', routes);

app.listen(port, () => console.log (`Server listening on port ${port}!`));

export default app;