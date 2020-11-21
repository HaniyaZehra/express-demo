const express = require('express');
const router = express.Router();
const Joi = require('joi');

const courses = [
  {id: 1, name: 'Math'},
  {id: 2, name: 'Science'},
  {id: 3, name: 'History'},
];

router.get('/', (req, res) => {
  res.send(courses);
});

// *****GET****
router.get('/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if(!course) return res.status(404).send('Course not found!');
  res.send(course);
});

//*****POST*****
router.post('/', (req, res) => {
  const {error} = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  }
  courses.push(course);
  res.send(course);
});

//*****PUT*****
router.put('/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if(!course) return res.status(404).send('Course not found!');

  const {error} = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  course.name = req.body.name;
  res.send(course);
});


//******DELETE******
router.delete('/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if(!course) return res.status(404).send('Course not found!');

  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.send(course);
});

// ****VALIDATION FUNCTION****
function validateCourse(course){
  const schema = {
    name: Joi.string().min(3).required()
  }
  return Joi.validate(course, schema);
}

module.exports = router;
