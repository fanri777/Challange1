import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Orders = db.define('orders',{
    no_order: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    email:{   
        type: DataTypes.STRING
    },
    alamat_penerima:{
        type: DataTypes.STRING
    },
    total_pembayaran: {
        type: DataTypes.INTEGER
    }

},{
    freezeTableName:true
} );

export default Orders;