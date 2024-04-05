export default class usersRepository {
    constructor(dao) {
        this.dao = dao
    }

    getUsers = async () => {
        return await this.dao.get()
    }

    getUserById = async (value) => {
        return await this.dao.getBy("userID", value)
    }

    getUserByUsername = async (value) => {
        return await this.dao.getBy("username", value)
    }

    getUserNotes = async (userID) => {
        return await this.dao.getNotes(userID)
    }


}