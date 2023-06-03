const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const router = express.Router()
const Note = require('../models/Note')
const { body, validationResult } = require('express-validator');


//Route 1 :  Get all notes using GET "/fetchallnotes", No login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {

    const note = await Note.find({ user: req.user.id })

    res.json(note)

})
//Route 2 : Add a new  notes using POST "/addnote", No login required
router.post('/addnote', fetchuser, [

    body('title', 'enter a valid title').isLength({ min: 3 }),
    body('description', 'enter a valid description').isLength({ min: 5 }),

], async (req, res) => {
    try {
        const { title, description, tag } = req.body


        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const note = new Note({
            title, description, tag, user: req.user.id
        })

        const savednote = await note.save()
        res.json(savednote)

    } catch (error) {
        
        console.error(error.message)
        res.status(500).send("internal server error")
    }

})
//Route 3 : update  notes using PUT "/updatenote", No login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {

    const { title, description, tag } = req.body
    try {
        //create a newNote object
        const newNOte = {}
        if (title) { newNOte.title = title }
        if (description) { newNOte.description = description }
        if (tag) { newNOte.tag = tag }

        //find the note to be updated to update

        let note = await Note.findById(req.params.id)
        if (!note) { return res.status(401).send("NOt Found") }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNOte }, { new: true })
        res.json({ note });

    } catch (error) {

        console.error(error.message)
        res.status(500).send("internal server error")
    }

})
//Route 4 : delete  notes using Delete "/deletenote", No login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {

    try {
        //find the note to be Deleted to Delete

        let note = await Note.findById(req.params.id)
        if (!note) { return res.status(401).send("NOt Found") }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }

        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "success": "Note Deleted successfully", note: note });

    } catch (error) {

        console.error(error.message)
        res.status(500).send("internal server error")
    }

})
module.exports = router;