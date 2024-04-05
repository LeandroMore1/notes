import connection from "./db.initialization.js"

class usersDAO{
    constructor(){
        this.model = connection
    }

    async get(){
        const [rows] = await this.model.query('SELECT * FROM users')
        return rows
    }

    async getBy(param,value){
            const [rows] = await this.model.query(`SELECT * FROM users WHERE ${param} = ?`, [value])
            return rows[0]
    }

    async getNotes(userID){
        const [rows] = await this.model.query(`SELECT * FROM notes WHERE userID = ?`, [userID])
        return rows
    }
}

const userDAO = new usersDAO()

export default userDAO