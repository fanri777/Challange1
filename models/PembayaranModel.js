import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Pembayaran = db.define('pembayaran',{
    kode_pembayaran: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    no_order:{   
        type: DataTypes.INTEGER
    },
    jenis_pembayaran:{
        type: DataTypes.STRING
    },
    status_pembayaran: {
        type: DataTypes.STRING
    }

},{
    freezeTableName:true
} );

export default Pembayaran;