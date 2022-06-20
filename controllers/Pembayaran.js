import Pembayaran from "../models/PembayaranModel.js";
import Orders from "../models/OrderModel.js";
import Pengiriman from "../models/PengirimanModel.js";

export const getPembayaran = async(req, res) =>   { 
    try{
         const pembayaran = await Pembayaran.findAll({
            attributes:['kode_pembayaran', 'no_order', 'jenis_pembayaran', 'status_pembayaran']
         });
         res.json(pembayaran);
    } catch (error) {
        console.log(error); 
    }
}

export const createPembayaran = async(req, res) => {
    const {  no_order, jenis_pembayaran } = req.body;

    try {
    const isOrderExist = await Orders.findOne({
            where: {
                no_order: req.body.no_order
            }
        });
    
    if(!isOrderExist) return res.status(400).json ({msg: "Order yang akan dibayar tidak ada!"});

    const isPaid = await Pembayaran.findOne({
        where: {
            no_order: req.body.no_order,
            status_pembayaran: "LUNAS"
        }
    });
  
    if(isPaid) return res.status(400).json ({msg: "Order sudah dibayar sebelumnya!"});
    await Pembayaran.create ({
            no_order : no_order, 
            jenis_pembayaran : jenis_pembayaran, 
            status_pembayaran : "LUNAS"
        });
        console.log("step 2:");

    await Pengiriman.update({
            no_resi : Math.random().toString().slice(2,11),
            status: "DIKIRIM"
        }, {
            where: {
                no_order: no_order
            }
        });
        console.log("step 3:");

        res.json({msg: "Create Pembayaran Berhasil"})
    } catch  (error) {
        console.log(error);
    }
}
 

export const getPembayaranById = async (req, res) => {
    try {
        const pembayaran = await Pembayaran.findOne({
            where: {
                kode_pembayaran: req.params.kode_pembayaran
            }
        });

        if(pembayaran) {
            res.send(pembayaran);
        } else {
            return res.status(200).json ({msg: "Pembayaran tidak ditemukan!"});
        }
    } catch (err) {
        console.log(err);
    }
}

    