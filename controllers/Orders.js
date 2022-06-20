import { STRING } from "sequelize";
import Orders from "../models/OrderModel.js";
import Pengiriman from "../models/PengirimanModel.js";
import Keranjangs from "../models/KeranjangModel.js";

export const getOrders = async(req, res) =>   { 
    try{
         const orders = await Orders.findAll({
            attributes:['no_order', 'email', 'alamat_penerima', 'total_pembayaran']
         });
         res.json(orders);
    } catch (error) {
        console.log(error); 
    }
}

export const createOrder = async(req, res) => {
    
    const { email, alamat_penerima, total_pembayaran, ongkir, kurir, detail_pesanan } = req.body;

    try {
    
        const orderResult = await Orders.create ({
            email : email, 
            alamat_penerima : alamat_penerima, 
            total_pembayaran : total_pembayaran     
        });
        console.log("step 1:",orderResult);
        const pengirimanResult = await Pengiriman.create ({
            ongkir: ongkir,
            kurir: kurir,
            no_order: orderResult.get("no_order"),
            status: "NEW"

        })
        console.log("step 2:",pengirimanResult);
        const result= detail_pesanan.map(async item=> {
            return await Keranjangs.create({
                kode_produk: item.kode_produk,
                no_order: orderResult.get("no_order"),
                quantity: item.quantity,
                harga: item.total_harga
                })
          });
        

        res.json({msg: "Create Order Berhasil"})
    } catch  (error) {
        console.log(error);
    }
}


export const updateOrder = async (req, res) => {
     //For check User already exist or not
     const isOrderExist = await Orders.findOne({
        where: {
            no_order: req.params.no_order
        }
    });
    console.log("step 1:",isOrderExist);
    if(!isOrderExist) return res.status(400).json ({msg: "Order yang akan diupdate tidak terdaftar!"});

    try {
        await Orders.update(req.body, {
            where: {
                no_order: req.params.no_order
            }
        });
        res.json({"message": "Order Updated"});
    } catch (err) {
        console.log(err);
    }
}

export const getOrderById = async (req, res) => {
    try {
        const orders = await Orders.findOne({
            where: {
                no_order: req.params.no_order
            }
        });

        if(orders) {
            res.send(orders);
        } else {
            return res.status(200).json ({msg: "Order tidak ditemukan!"});
        }
    } catch (err) {
        console.log(err);
    }
}
