import MyRouter from "./router.js"
import { createNote , getNotes ,updateNote, deleteNote } from "../controllers/note.controller.js"

export default class noteRouter extends MyRouter {
    init() {
        this.post('/create', ['USER'], createNote)
        this.get('/', ['PUBLIC'], getNotes)
        this.put('/update', ['PUBLIC'], updateNote)
        this.delete('/:id', ['PUBLIC'], deleteNote)
    }
}
