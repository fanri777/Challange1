import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Pengiriman = db.define('pengiriman',{
    no_resi: {
        type: DataTypes.INTEGER
    },
    no_order:{   
        type: DataTypes.INTEGER
    },
    kurir:{
        type: DataTypes.STRING
    },
    ongkir: {
        type: DataTypes.INTEGER
    },
    status: {
        type: DataTypes.STRING
    }

},{
    freezeTableName:true
} );

export default Pengiriman;