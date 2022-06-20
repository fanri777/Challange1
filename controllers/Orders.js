import Orders from "../models/OrderModel.js";

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
    const { email, alamat_penerima, total_pembayaran } = req.body;

    try {
        await Orders.create ({
            email : email, 
            alamat_penerima : alamat_penerima, 
            total_pembayaran : total_pembayaran
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
