import { notesController } from "../service/notes.service.js";
import logger from "../config/logger.config.js";
import jwt from 'jsonwebtoken'

export const createNote = async (req, res) => {
    try{
        const {tag , note , category} = req.body;
        const token = req.cookies.token
        if (!tag || !note || !category ) {
            return res.status(400).send({ code: 1, message: "All fields are required" });
        } else if (note.length >500) {
            return res.status(400).send({ code: 2, message: "Exceeded maxium characters" });
        }
        let user = jwt.verify(token, "privateKey")
        user = user.user
        const creation = await notesController.createNote(note,category, tag, user.userID)
        return res.status(201).send(creation);
    } catch(err){
        logger.error(err)
        return res.status(500).send(err)
    }
}

export const getNotes = async (req,res) =>{
    try{
        const notes = await notesController.getNotes()
        return res.status(200).send(notes)
    } catch(err){
        logger.error(err)
        return res.status(500).send(err)
    }
}

export const updateNote = async (req, res) =>{
    try{
        const {columnName, value, noteID} = req.body
        if(value.length > 500) return res.status(400).send({code: 2, message: "Exceeded maxium characters"})
        const update = await notesController.updateNote(columnName, value, noteID)
        return res.status(200).send(update)
    } catch (err){
        logger.error(err)
        return res.status(500).send(err)
    }
}

export const deleteNote = async (req, res) =>{
    try{
        const {id} = req.params
        logger.info(id)
        const deleteNote = await notesController.deleteNoteById(id)
        return res.status(200).send(deleteNote)
    } catch (err){
        logger.error(err)
        return res.status(500).send(err)
    } 
}