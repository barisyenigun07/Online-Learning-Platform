package com.olp.backend.controller;


import com.olp.backend.entity.Section;
import com.olp.backend.service.SectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/section")
public class SectionController {
    private final SectionService sectionService;

    @Autowired
    public SectionController(SectionService sectionService) {
        this.sectionService = sectionService;
    }

    @PostMapping("/course/{courseId}")
    public Section createSection(@PathVariable Long courseId, @RequestBody Section section) {
        return sectionService.createSection(courseId, section);
    }

    @GetMapping("/course/{courseId}")
    public List<Section> getSectionsByCourse(@PathVariable Long courseId) {
        return sectionService.getSectionsByCourse(courseId);
    }

    @GetMapping("/{id}")
    public Section getSection(@PathVariable Long id) {
        return sectionService.getSection(id);
    }
}
