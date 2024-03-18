const Course = require('../../models/Course');
const mongoose = require('../../util/mongoose');
const { multipleMongooseToObject } = require('../../util/mongoose');

class CourseController {
  //[GET] /courses/:slug
  show(req, res, next) {
    Course.findOne({ slug: req.params.slug })
      .lean()
      .then((course) => res.render('courses/show', { course }))
      .catch(next);
  }

  //[GET] /courses/create
  create(req, res, next) {
    res.render('courses/create');
  }

  //[POST] /courses/store
  store(req, res, next) {
    const formData = req.body;
    formData.image = `https://img.youtube.com/vi/${req.body.videoId}/0.jpg`;
    formData.slug = req.body.name;
    const course = new Course(req.body);
    course.save().then(() => res.redirect(`/courses/${course.slug}`));
  }

  edit(req, res, next) {
    Course.findById(req.params._id)
      .lean()
      .then((course) => {
        res.render('courses/edit', { course });
      })
      .catch(next);
  }

  update(req, res, next) {
    Course.updateOne({_id: req.params._id}, req.body)
        .then(() => res.redirect('/me/stored/courses'))
        .catch(next);
}
  
}

module.exports = new CourseController();
