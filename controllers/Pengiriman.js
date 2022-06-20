import Pengiriman from "../models/PengirimanModel.js";

export const getPengiriman = async(req, res) =>   { 
    try{
         const pengiriman = await Pengiriman.findAll({
            attributes:['no_resi', 'no_order', 'kurir', 'status']
         });
         res.json(pengiriman);
    } catch (error) {
        console.log(error); 
    }
}

export const createPengiriman = async(req, res) => {
    const {  no_resi, no_order, kurir, status } = req.body;

    try {
        await Pengiriman.create ({
            no_resi : no_resi, 
            no_order : no_order, 
            kurir : kurir, 
            status : status
        });
        res.json({msg: "Create Pengiriman Berhasil"})
    } catch  (error) {
        console.log(error);
    }
}


export const updatePengiriman = async (req, res) => {
     //For check User already exist or not
     const isPengirimanExist = await Pengiriman.findOne({
        where: {
            no_resi: req.params.no_resi
        }
    });
  
    if(!isPengirimanExist) return res.status(400).json ({msg: "Pengiriman yang akan diupdate tidak terdaftar!"});

    try {
        await Pengiriman.update(req.body, {
            where: {
                no_resi: req.params.no_resi
            }
        });
        res.json({"message": "Pengiriman Updated"});
    } catch (err) {
        console.log(err);
    }
}

export const getPengirimanById = async (req, res) => {
    try {
        const pengiriman = await Pengiriman.findOne({
            where: {
                no_resi: req.params.no_resi
            }
        });

        if(pengiriman) {
            res.send(pengiriman);
        } else {
            return res.status(200).json ({msg: "Pengiriman tidak ditemukan!"});
        }
    } catch (err) {
        console.log(err);
    }
}
