package com.olp.backend.controller;

import com.olp.backend.entity.Course;
import com.olp.backend.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/course")
public class CourseController {
    private final CourseService courseService;

    @Autowired
    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }

    @PostMapping
    public Course createCourse(@RequestBody Course course) {
        return courseService.createCourse(course);
    }

    @GetMapping("/{id}")
    public Course getCourse(@PathVariable Long id) {
        return courseService.getCourse(id);
    }

    @GetMapping
    public List<Course> getCourses() {
        return courseService.getCourses();
    }

    @GetMapping("/instructor/{instructorId}")
    public List<Course> getCoursesByInstructor(@PathVariable Long instructorId) {
        return courseService.getCoursesByInstructor(instructorId);
    }

    @DeleteMapping("/{id}")
    public void deleteCourse(@PathVariable Long id) {
        courseService.deleteCourse(id);
    }

}
