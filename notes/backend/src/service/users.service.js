import userDAO from "../dao/users.dao.js";
import usersRepository from "../repository/users.repository.js";

export const userController = new usersRepository(userDAO)