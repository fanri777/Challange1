import Items from "../models/ItemModel.js";

export const getItems = async(req, res) =>   { 
    try{
         const items = await Items.findAll({
            attributes:['kode_produk', 'kategori_produk', 'nama_produk', 'stok_produk', 'harga_produk']
         });
         res.json(items);
    } catch (error) {
        console.log(error); 
    }
}

export const createItem = async(req, res) => {
    const { kode_produk, kategori_produk, nama_produk, stok_produk, harga_produk } = req.body;
    //For check User already exist or not
    const isItemExist = await Items.findOne({
        where: {
            kode_produk: req.body.kode_produk
        }
    });

    if(isItemExist) return res.status(400).json ({msg: "Item sudah ada!"});

    try {
        await Items.create ({
            kode_produk : kode_produk,
            kategori_produk : kategori_produk,
            nama_produk : nama_produk,
            stok_produk : stok_produk,
            harga_produk : harga_produk
        });
        res.json({msg: "Create Item Berhasil"})
    } catch  (error) {
        console.log(error);
    }
}


export const updateItem = async (req, res) => {
     //For check User already exist or not
     const isItemExist = await Items.findOne({
        where: {
            kode_produk: req.params.kode_produk
        }
    });
    console.log("step 1:",isItemExist);
    if(!isItemExist) return res.status(400).json ({msg: "Item yang akan diupdate tidak terdaftar!"});

    try {
        await Items.update(req.body, {
            where: {
                kode_produk: req.params.kode_produk
            }
        });
        res.json({"message": "Item Updated"});
    } catch (err) {
        console.log(err);
    }
}

export const getItemById = async (req, res) => {
    try {
        const items = await Items.findOne({
            where: {
                kode_produk: req.params.kode_produk
            }
        });

        if(items) {
            res.send(items);
        } else {
            return res.status(200).json ({msg: "Item tidak ditemukan!"});
        }
    } catch (err) {
        console.log(err);
    }
}

export const deleteItem = async (req, res) => {
    try {
        await Items.destroy({
            where: {
                kode_produk: req.params.kode_produk
            }
        });
        res.json({
            "message": "Item Deleted"
        });
    } catch (err) {
        console.log(err);
    }
}