package com.olp.backend.service;

import com.olp.backend.entity.Course;
import com.olp.backend.entity.Enrollment;
import com.olp.backend.entity.User;
import com.olp.backend.exception.ResourceNotFoundException;
import com.olp.backend.exception.ResourceType;
import com.olp.backend.repository.CourseRepository;
import com.olp.backend.repository.EnrollmentRepository;
import com.olp.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.zip.CheckedInputStream;

@Service
public class EnrollmentService {
    private final EnrollmentRepository enrollmentRepository;
    private final UserService userService;
    private final CourseRepository courseRepository;
    private final UserRepository userRepository;

    public EnrollmentService(EnrollmentRepository enrollmentRepository, UserService userService, CourseRepository courseRepository, UserRepository userRepository) {
        this.enrollmentRepository = enrollmentRepository;
        this.userService = userService;
        this.courseRepository = courseRepository;
        this.userRepository = userRepository;
    }

    public void enrollCourse(Long courseId){
        User student = userService.getAuthenticatedUser().orElseThrow(() -> new ResourceNotFoundException(ResourceType.USER));
        Course course = courseRepository.findById(courseId).orElseThrow(() -> new ResourceNotFoundException(ResourceType.COURSE));

        boolean alreadyEnrolled = enrollmentRepository.existsByUserAndCourse(student, course);
        if (alreadyEnrolled) {
            throw new IllegalArgumentException("User is already enrolled in this course.");
        }

        Enrollment enrollment = new Enrollment();
        enrollment.setCourse(course);
        enrollment.setUser(student);

        enrollmentRepository.save(enrollment);
    }

    public void disenrollCourse(Long courseId) {
        User student = userService.getAuthenticatedUser()
                .orElseThrow(() -> new ResourceNotFoundException(ResourceType.USER));
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException(ResourceType.COURSE));

        // Find the enrollment record
        Enrollment enrollment = enrollmentRepository.findByUserAndCourse(student, course)
                .orElseThrow(() -> new ResourceNotFoundException(ResourceType.ENROLLMENT));

        enrollmentRepository.delete(enrollment);
    }

    public List<Course> getCoursesEnrolledByStudent(Long studentId) {
        User student = userRepository.findById(studentId)
                .orElseThrow(() -> new ResourceNotFoundException(ResourceType.USER));

        return student.getEnrollments()
                .stream()
                .map(Enrollment::getCourse)
                .collect(Collectors.toList());
    }

    public boolean checkEnrollment(Long courseId) {
        User student = userService.getAuthenticatedUser().orElseThrow(() -> new ResourceNotFoundException(ResourceType.USER));
        Course course = courseRepository.findById(courseId).orElseThrow(() -> new ResourceNotFoundException(ResourceType.COURSE));
        return enrollmentRepository.existsByUserAndCourse(student, course);
    }


}
