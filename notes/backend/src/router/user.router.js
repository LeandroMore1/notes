import MyRouter from "./router.js"
import { login , getUserNotes } from "../controllers/user.controller.js"

export default class userRouter extends MyRouter {
    init() {

        this.post('/login', ['PUBLIC'], login)
        this.get('/notes', ['PUBLIC'], getUserNotes)
    }
}
