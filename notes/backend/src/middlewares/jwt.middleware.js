import jwt from "jsonwebtoken"

const generateToken = (user) => {
        return jwt.sign({user}, "privateKey", {expiresIn: '5m'})
}



export {generateToken}