require('dotenv').config();
const express = require('express');
const { errors } = require('celebrate');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const routes = require('./routers/index');
const { MONGO_URL } = require('./config');
// const corsErr = require('./middlewares/corsErr');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const validationErrorServer = require('./middlewares/validationErrorServer');

const { PORT = 3032 } = process.env;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);
// app.use(cors({
//  origin: 'https://domainoksana.nomoredomainsrocks.ru',
//  credential: true,
// }));
app.use(cors());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(routes);
app.use(helmet());
app.use(limiter);
// app.use(corsErr);
app.use(errorLogger);

async function connect() {
  try {
    await mongoose.set('strictQuery', false);
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
    });
    console.log(`App connected ${MONGO_URL}`);
    await app.listen(PORT);
    console.log(`App listening on port ${PORT}`);
  } catch (err) {
    console.log(err);
  }
}
app.use(errors());
app.use(validationErrorServer);

connect();
