const express = require('express');
const { 
  addClassroom, 
  getAllClassroom,
  getClassroom,
  updateClassroom,
  deleteClassroom
} = require('../controllers/ classroom');

const router = express.Router();

router.get('/classroom', getAllClassroom);
router.get('/classroom/:id', getClassroom);
router.post('/classroom', addClassroom);
router.put('/classroom/:id', updateClassroom);
router.delete('/classroom/:id', deleteClassroom);

module.exports = {
  routes: router
}