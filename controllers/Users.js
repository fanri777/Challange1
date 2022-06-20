import Users from "../models/UserModel.js";
import bcrypt from "bcrypt"; //hash password
import jwt from "jsonwebtoken";

export const getUsers = async(req, res) =>   { 
    try{
         const users = await Users.findAll({
            attributes:['id', 'name', 'email']
         });
         res.json(users);
    } catch (error) {
        console.log(error); 
    }
}

export const Register = async(req, res) => {
    const { name, email, password, confPassword } = req.body;
    //check if confPassword not matched
    if(password !== confPassword) return res.status(400).json ({msg: "Password dan Confirm Password tidak cocok"});
    
    //For check User already exist or not
    const isUserExist = await Users.findOne({
        where: {
            email: req.body.email
        }
    });
    if(isUserExist) return res.status(400).json ({msg: "User sudah ada!"});

    //Password
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        await Users.create ({
            name: name,
            email: email,
            password: hashPassword
        });
        res.json({msg: "Register Berhasil"})
    } catch  (error) {
        console.log(error);
    }
}

export const Login = async(req, res) => {
    try {
        const user = await Users.findAll({
            where: {
                email: req.body.email
            }
        });
        console.log(":Step 1")
        const match = await bcrypt.compare(req.body.password, user[0].password);
        console.log(":Step 2")
        if(!match) return res.status(400).json({msg: "Password salah"});
        const userId = user[0].id;
        const name = user[0].name;
        const email = user[0].email;
        console.log(":Step 2.1")
        const accessToken = jwt.sign({userId, name, email}, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '20s'
        });
        console.log(":Step 3")
        const refreshToken = jwt.sign({userId, name, email}, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d'
        });
        console.log(":Step 4")
        await Users.update({refresh_token: refreshToken}, {
            where: {
                id:userId
            }
        });
        
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000  
        });
        res.json({ accessToken });
    }catch (error) {
        res.status(404).json(error.message);

    }
}

export const Logout = async(req, res) => {
    const refreshToken = req.cookies.refreshToken;
        if(!refreshToken) return res.sendStatus(204);
        const user = await Users.findAll({
            where: {
                refresh_token: refreshToken
            }
        });
        if(!user[0]) return res.sendStatus(204);
        const userId = user[0].id;
        await Users.update({refreshToken: null}, {
            where:{
                id: userId
            }
        });
        res.clearCookie('refreshToken');
        return res.sendStatus(200);

}