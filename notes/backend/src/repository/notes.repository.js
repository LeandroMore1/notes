export default class notesRepository{
    constructor(dao){
        this.dao = dao
    }

    getNotes = async () => {
        return await this.dao.get()
    }

    getNoteById = async(value) => {
        return await this.dao.getBy("noteID", value)
    }

    createNote = async(note, category, tag, userId) => {
        return await this.dao.create(note, category, tag,userId)
    }

    updateNote = async(columnName, value, noteID) => {
        return await this.dao.update(columnName, value, noteID)
    }

    deleteNoteById = async(value) => {
        return await this.dao.delete(value) 
    }

}