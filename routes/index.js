import  express  from "express";
import { getUsers, Register, Login, Logout } from "../controllers/Users.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import { createItem, deleteItem, getItemById, getItems, updateItem } from "../controllers/Items.js";
import { createOrder, getOrderById, getOrders, updateOrder } from "../controllers/Orders.js";


const router = express.Router();

router.get('/users', verifyToken, getUsers);
router.post('/register', Register);
router.post('/login', Login);
router.get('/token', refreshToken);
router.delete('/logout', Logout);

router.get('/items', getItems);
router.post('/items', createItem);
router.put('/items/:kode_produk', updateItem);
router.get('/items/:kode_produk', getItemById);
router.delete('/items/:kode_produk', deleteItem);

router.get('/orders', getOrders);
router.post('/orders', createOrder);
router.put('/orders/:no_order', updateOrder);
router.get('/orders/:no_order', getOrderById);




export default router;