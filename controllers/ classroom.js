'use strict'
const firebase = require('../db');
const Classroom = require('../models/classroom');
const firestore = firebase.firestore();

const addClassroom = async (req, res, next) => {
  try {
    const data = req.body;
    await firestore.collection('classrooms').doc().set(data);
    res.status(201).json({
      message: 'add classroom success'
    })
  } catch (error) {
    res.status(400).send(error.message);
  }
}

const getAllClassroom = async (req, res, next) => {
  try {
      const classrooms = await firestore.collection('classrooms');
      const data = await classrooms.get();
      const classroomsArray = [];
      if(data.empty) {
          res.status(404).send('No classroom record found');
      }else {
          data.forEach(doc => {
              const classroom = new Classroom(
                  doc.id,
                  doc.data().class_name,
              );
              classroomsArray.push(classroom);
          });
          res.status(200).json({
            message: 'Fetch classrooms data success',
            data: classroomsArray
          });
      }
  } catch (error) {
      res.status(400).send(error.message);
  }
}

const getClassroom = async (req, res, next) => {
  try {
      const id = req.params.id;
      const classroom = await firestore.collection('classrooms').doc(id);
      const data = await classroom.get();
      if(!data.exists) {
          res.status(404).send('Classroom with the given ID not found');
      }else {
          res.status(200).json({
            message: "Fetch classroom success",
            data: {
              id: data.id,
              class_name: data.data().class_name
            }
          });
      }
  } catch (error) {
      res.status(400).send(error.message);
  }
}

const updateClassroom = async (req, res, next) => {
  try {
      const id = req.params.id;
      const data = req.body;
      const classroom =  await firestore.collection('classrooms').doc(id);
      await classroom.update(data);
      res.status(200).json({
        message: 'classroom record updated successfuly'
      })
  } catch (error) {
      res.status(400).send(error.message);
  }
}

const deleteClassroom = async (req, res, next) => {
  try {
      const id = req.params.id;
      await firestore.collection('classrooms').doc(id).delete();
      res.send('Record deleted successfuly');
  } catch (error) {
      res.status(400).send(error.message);
  }
}

module.exports = {
  addClassroom,
  getAllClassroom,
  getClassroom,
  updateClassroom,
  deleteClassroom
}