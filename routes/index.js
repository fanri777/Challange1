import  express  from "express";
import { getUsers, Register, Login, Logout } from "../controllers/Users.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import { createItem, deleteItem, getItemById, getItems, updateItem } from "../controllers/Items.js";
import { createOrder, getOrderById, getOrders, updateOrder } from "../controllers/Orders.js";
import { createKeranjangs, getKeranjangs, getKeranjangsById, updateKeranjangs } from "../controllers/Keranjangs.js";
import { createPembayaran, getPembayaran, getPembayaranById } from "../controllers/Pembayaran.js";
import { createPengiriman, getPengiriman, getPengirimanById, updatePengiriman } from "../controllers/Pengiriman.js";




const router = express.Router();

router.get('/users', verifyToken, getUsers);
router.post('/register', Register);
router.post('/login', Login);

router.get('/items', verifyToken, getItems);
router.post('/items', verifyToken, createItem);
router.put('/items/:kode_produk', verifyToken, updateItem);
router.get('/items/:kode_produk', verifyToken, getItemById);
router.delete('/items/:kode_produk', verifyToken, deleteItem);

router.get('/orders', verifyToken, getOrders);
router.post('/orders', verifyToken, createOrder);
router.put('/orders/:no_order', verifyToken, updateOrder);
router.get('/orders/:no_order', verifyToken, getOrderById);

router.get('/pembayaran', verifyToken, getPembayaran);
router.post('/pembayaran', verifyToken, createPembayaran);
router.get('/pembayaran/:kode_pembayaran', verifyToken, getPembayaranById);

export default router;