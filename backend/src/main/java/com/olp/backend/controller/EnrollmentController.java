package com.olp.backend.controller;

import com.olp.backend.entity.Course;
import com.olp.backend.service.EnrollmentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/enroll")
public class EnrollmentController {
    private final EnrollmentService enrollmentService;

    public EnrollmentController(EnrollmentService enrollmentService) {
        this.enrollmentService = enrollmentService;
    }

    @PostMapping("/course/{courseId}")
    public void enrollCourse(@PathVariable Long courseId) {
        enrollmentService.enrollCourse(courseId);
    }

    @DeleteMapping("/course/{courseId}")
    public void disenrollCourse(@PathVariable Long courseId) {
        enrollmentService.disenrollCourse(courseId);
    }

    @GetMapping("/student/{studentId}")
    public List<Course> getCoursesEnrolledByStudent(@PathVariable Long studentId) {
        return enrollmentService.getCoursesEnrolledByStudent(studentId);
    }

    @GetMapping("/course/{courseId}/is-enrolled")
    public boolean checkEnrollment(@PathVariable("courseId") Long courseId) {
        return enrollmentService.checkEnrollment(courseId);
    }
}
