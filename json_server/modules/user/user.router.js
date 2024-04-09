const { addUser, getuser, getAllNotes, addNote, deleteNote } = require("./controllers/getAllUsers.controllers");

const router = require("express").Router();
router.post('/user',getuser)
router.post('/register',addUser)




router.get('/getallnotes',getAllNotes)
router.post('/addnote',addNote)
router.delete('/delete/:id/:user_id', deleteNote);

module.exports=router
