import express,{Express} from 'express'
import dotenv from "dotenv";
import {DataSource} from 'typeorm'
import cors from 'cors'
import bodyparser from 'body-parser'
import {Task} from "./src/tasks/tasks.entitiy"
import {tasksRouter} from "./src/tasks/tasks.router"

dotenv.config()
const app:Express= express();

app.use(bodyparser.json());

app.use(cors())

export const AppDataSource= new DataSource({
  type:'postgres',
  host:'localhost',
  port:5432,
  username:process.env.POSTGRE_SQL_USER,
  password:process.env.POSTGRES_SQL_PASSWORD,
  database:process.env.POSTGRES_SQL_DB,
  entities:[Task],
  synchronize:true

})

const port = process.env.PORT;

AppDataSource.initialize().then(()=> {
  // console.log(/data/,AppDataSource);
  
  app.listen(port);
  console.log('Data Source has been initialized');
  
}).catch((err) =>{
  
  console.error('Error during Data Source initializing Data Source',err);
}) ;


app.use("/",tasksRouter)