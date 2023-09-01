import createError from 'http-errors';
import express, {Request, Response, NextFunction} from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors'
import account from './routes/account';
import dotenv from 'dotenv'
import db from './config/db.config';

import pageRouter from "./routes/page"

dotenv.config()

/*************** Database sync *******************/
db.sync().then(() => {
  console.log("Database connected successfully")
}).catch(err => {
  console.log(err)
})

const localhost = process.env.SOURCE as string
const global = process.env.GLOBAL as string

const app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

/***************** MIDDLEWARES ************/
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use(cors({origin: [localhost, global]}))



/*********** ROUTES ************/
app.use("/account", account);
app.use("/", pageRouter )

// catch 404 and forward to error handler
app.use(function(req:Request, res:Response, next:NextFunction) {
  next(createError(404));
});

// error handler
app.use((err:createError.HttpError, req:Request, res:Response, next:NextFunction)=> {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
