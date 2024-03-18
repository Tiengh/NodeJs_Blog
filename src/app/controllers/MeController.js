//const Me = require('../../models/Me');
const mongoose = require('../../util/mongoose');
const { multipleMongooseToObject } = require('../../util/mongoose');
const Course = require('../../models/Course')

class MeController {
  //[GET] /stored/courses
  storedCourses(req, res, next) {
    Course.find({})
      .then((courses) => {
        res.render('me/stored-courses', {
          courses: multipleMongooseToObject(courses),
        });
      })
      .catch(next);
  }
}

module.exports = new MeController();
