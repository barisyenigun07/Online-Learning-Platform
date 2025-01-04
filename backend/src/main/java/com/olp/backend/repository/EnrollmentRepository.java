package com.olp.backend.repository;

import com.olp.backend.entity.Course;
import com.olp.backend.entity.Enrollment;
import com.olp.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {
    boolean existsByUserAndCourse(User user, Course course);
    Optional<Enrollment> findByUserAndCourse(User user, Course course);
}
