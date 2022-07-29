

import "reflect-metadata";
import app from "./app"
import {AppDataSource} from "./db" 
require('dotenv').config();

async function main(){
    try{
        await AppDataSource.initialize();
        console.log("Database Connected");
        app.listen(5000);
        console.log('server on port ' + 5000);
    }catch(err){    
        console.log("error");
    }

}

main();

