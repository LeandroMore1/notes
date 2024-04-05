import logger from "../config/logger.config.js"
import { userController } from "../service/users.service.js"
import { generateToken } from "../middlewares/jwt.middleware.js"
import jwt from 'jsonwebtoken'



export const login = async (req,res) =>{
        try{
            const {username, password} = req.body
            const user = await userController.getUserByUsername(username)
            if (!user ||user.password !== password  ) return res.status(400).send("wrong credentials")
            user.password = ""
            const token = generateToken(user)
            res.cookie('token', token, {
                maxAge: 300000,
            })
    
            return res.status(200).send(user)
        } catch(err){   
            logger.error(err)
            return res.status(500).send(err)
        }
}

export const getUserNotes = async (req,res)=>{
    try{
        const token = req.cookies.token
        logger.info(token)
        const user = jwt.verify(token, "privateKey")
        logger.info(user)
        user = user.user
        const notes = await userController.getUserNotes(user.userID)
        return res.status(200).send(notes)
    } catch(err){
        logger.error(err)
        return res.status(500).send(err)
    }
}


