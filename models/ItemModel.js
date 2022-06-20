import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Items = db.define('items',{
    kode_produk: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    kategori_produk:{
        type: DataTypes.STRING
    },
    nama_produk:{
        type: DataTypes.STRING
    },
    stok_produk: {
        type: DataTypes.INTEGER
    },
    harga_produk: {
        type: DataTypes.INTEGER
    }

},{
    freezeTableName:true
} );

export default Items;