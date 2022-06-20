import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Keranjangs = db.define('keranjangs',{
    id_keranjang: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    kode_produk:{   
        type: DataTypes.STRING
    },
    no_order:{
        type: DataTypes.INTEGER
    },
    quantity: {
        type: DataTypes.INTEGER
    },
    harga: {
        type: DataTypes.INTEGER
    }

},{
    freezeTableName:true
} );

export default Keranjangs;