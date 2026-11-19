import pool from "../config/database.js";

// GET ALL PRODUCT
export async function getAllProducts(req,res){
    try{
        const result = await pool.query(
            "SELECT * FROM products ORDER BY id ASC"
        );
        res.status(200).json({
            success: true,
            data: result.rows
        });
    }catch(error){
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

export async function getProductById(req,res){
    try{
        const {id} = req.params;
        const results = await pool.query(
            "SELECT  * FROM products WHERE id = $1",[id]
        );
        if(results.rows.lenght===0){
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }
        res.status(200).json({
             success: true,
             data: results.rows
        })

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

export async function createProduct(req,res){
    try{
        const {name,price,description,stock} = req.body;
        if(!name || price===undefined || price===null){
            return res.status(400).json({
                success: false,
                message: "name and price are required"
            })
        }
        const results = await pool.query(
            `   INSERT INTO products(name,description,price,stock)
                VALUES ($1,$2,$3,$4)
                RETURNING *
            `,
            [name,description,price,stock]
        )
        res.status(200).json({
            success: true,
            message: "Product created Successfully",
            data: results.rows
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            success:  false,
            message: "Internal server error"
        })
    }
}
export async function updateProduct(req,res){
    try{
        const {id,name,price,description,stock} = req.body;
        if(!name || price===undefined || price===null){
            return res.status(400).json({
                success: false,
                message: "name and price are required"
            })
        }
        const results = await pool.query(
            `   INSERT INTO products(name,description,price,stock)
                VALUES ($1,$2,$3,$4)
                RETURNING *
            `,
            [name,description,price,stock]
        )
        res.status(200).json({
            success: true,
            message: "Product created Successfully",
            data: results.rows
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            success:  false,
            message: "Internal server error"
        })
    }
}