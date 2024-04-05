import connection from "./db.initialization.js";

class notesDAO{

    constructor(){
        this.model = connection
    }

    async get(){
        const [rows] = await this.model.query('SELECT * FROM notes')
        return rows
    }

    async getBy(param,value){
            const [rows] = await this.model.query(`SELECT * FROM notes WHERE ${param} = ?`, [value])
            return rows[0]
    }

    async create(note, category, tag,userID ){
        const result = await this.model.query(`
        INSERT INTO notes 
        (NOTE, CATEGORY, TAG ,userID) 
        VALUES (?,?,?,?)
        `, [note, category, tag,userID])
        return result
    }

    async update(columnName, value, noteID){
        const update = await this.model.query( `UPDATE notes SET ${columnName} = ? WHERE noteID = ?`, [value, noteID])
        return update
    }

    async delete(noteID){
        const deleteNote = await this.model.query(`DELETE FROM notes WHERE noteID = ?`, [noteID])
        return deleteNote
    }

}

const noteDAO = new notesDAO()

export default noteDAO