import noteDAO from "../dao/notes.dao.js";
import notesRepository from "../repository/notes.repository.js";

export const notesController = new notesRepository(noteDAO);