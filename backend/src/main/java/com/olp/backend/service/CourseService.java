package com.olp.backend.service;

import com.olp.backend.entity.Course;
import com.olp.backend.entity.User;
import com.olp.backend.exception.ResourceNotFoundException;
import com.olp.backend.exception.ResourceType;
import com.olp.backend.repository.CourseRepository;
import com.olp.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseService {
    private final CourseRepository courseRepository;
    private final UserRepository userRepository;
    private final UserService userService;

    public CourseService(CourseRepository courseRepository, UserRepository userRepository, UserService userService) {
        this.courseRepository = courseRepository;
        this.userRepository = userRepository;
        this.userService = userService;
    }

    public Course createCourse(Course course) {
        User instructor = userService.getAuthenticatedUser().orElseThrow(() -> new ResourceNotFoundException(ResourceType.USER));
        course.setUser(instructor);
        return courseRepository.save(course);
    }

    public Course getCourse(Long id) {
        return courseRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException(ResourceType.COURSE));
    }

    public List<Course> getCourses() {
        return courseRepository.findAll();
    }

    public List<Course> getCoursesByInstructor(Long instructorId) {
        User instructor = userRepository.findById(instructorId).orElseThrow(() -> new ResourceNotFoundException(ResourceType.USER));
        return courseRepository.findByUser(instructor);
    }

    public void deleteCourse(Long id) {
        User instructor = userService.getAuthenticatedUser().orElseThrow(() -> new ResourceNotFoundException(ResourceType.USER));
        Course course = courseRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException(ResourceType.COURSE));

        if (course.getUser().equals(instructor)) {
            courseRepository.delete(course);
        }
    }


}
