const express = require('express');
const edumyControllers = require('../controllers/edumyControllers')
const router = express.Router();

// @route - /api/v1/edumy/
router.route('/').get(edumyControllers.getAllCourses).post(edumyControllers.createNewCourses);

// @route - api/v1/edumy/someid
router.route('/:id').put(edumyControllers.updateCoursesById).delete(edumyControllers.deleteCoursesCoursesById);

module.exports = router;