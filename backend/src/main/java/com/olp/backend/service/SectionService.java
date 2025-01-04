package com.olp.backend.service;


import com.olp.backend.entity.Course;
import com.olp.backend.entity.Section;
import com.olp.backend.exception.ResourceNotFoundException;
import com.olp.backend.exception.ResourceType;
import com.olp.backend.repository.CourseRepository;
import com.olp.backend.repository.SectionRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SectionService {
    private final SectionRepository sectionRepository;
    private final CourseRepository courseRepository;

    public SectionService(SectionRepository sectionRepository, CourseRepository courseRepository) {
        this.sectionRepository = sectionRepository;
        this.courseRepository = courseRepository;
    }

    public Section createSection(Long courseId, Section section) {
        Course course = courseRepository.findById(courseId).orElseThrow(() -> new ResourceNotFoundException(ResourceType.COURSE));
        section.setCourse(course);
        return sectionRepository.save(section);
    }

    public List<Section> getSectionsByCourse(Long courseId) {
        Course course = courseRepository.findById(courseId).orElseThrow(() -> new ResourceNotFoundException(ResourceType.COURSE));
        return sectionRepository.findByCourse(course);
    }

    public Section getSection(Long id) {
        return sectionRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException(ResourceType.SECTION));
    }


}
