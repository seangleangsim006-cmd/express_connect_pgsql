import express from "express"
import productRoute from "../src/routes/product_route.js"
import pool from "../src/config/database.js"

// create express application
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json())
app.use("/api/products",productRoute);
// start server
async function startServer(){
    try{
       await pool.query("SELECT NOW()");
       console.log("Database connecting successfully");

       app.listen(PORT,()=>{
          console.log(`Server running at http://localhost:${PORT}`);
       });
    }catch(error){
        console.error("Database connection failed", error.message);
        process.exit(1);
    }
}

startServer();