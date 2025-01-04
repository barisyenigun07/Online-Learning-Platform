package com.olp.backend.repository;

import com.olp.backend.entity.Course;
import com.olp.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
    List<Course> findByUser(User user);
}
