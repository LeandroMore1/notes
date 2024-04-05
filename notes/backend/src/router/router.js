import {Router} from "express"
import jwt from "jsonwebtoken"
import logger from "../config/logger.config.js"


export default class MyRouter {
    constructor(){
        this.router = Router()
        this.init()
    }

    init() {}
    getRouter(){
        return this.router
    }

    get(path,policies,...callback){
        this.router.get(path,
        this.handlePolicies(policies),
        this.applyCallback(callback)
        )
    }

    post(path, policies, ...callback) {
		this.router.post(
			path,
			this.handlePolicies(policies),
			this.applyCallback(callback)
		);
	}

	put(path, policies, ...callback) {
		this.router.put(
			path,
			this.handlePolicies(policies),
			this.applyCallback(callback)
		);
	}

	delete(path, policies, ...callback) {
		this.router.delete(
			path,
			this.handlePolicies(policies),
			this.applyCallback(callback)
		);
	}

    applyCallback(callbacks){
        return callbacks.map((callback)=> async(...params)=>{
            try{
                await callback.apply(this, params)
            } catch (err){
                params[1].status(500).send({status: 'Internal Server Error', err})
            }
        })
    }

    handlePolicies = (policies) => (req, res, next) => {
		try{
			if (policies[0] === 'PUBLIC') {
				return next();
			}

			const token = req.cookies.token 
			logger.info(token)
			if (!token) {
				logger.error('session expired')
				return res.status(403).send("Credentials Expired");
			}
	
			const user = jwt.verify(token, "privateKey")
			
			if (!policies.includes(user.user.role?.toUpperCase())) {
				logger.error('Unauthorized Credentials')
				return res.status(401).send('Unauthorized Credentials');
			}
			next();
		}catch(err){
			logger.warning('error con los permisos')
			return res.status(500).send('internal server error')
		}

	};
}
