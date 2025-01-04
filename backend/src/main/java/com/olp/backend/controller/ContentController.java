package com.olp.backend.controller;

import com.olp.backend.entity.Assignment;
import com.olp.backend.entity.Content;
import com.olp.backend.entity.Quiz;
import com.olp.backend.entity.Video;
import com.olp.backend.service.ContentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/content")
public class ContentController {
    private final ContentService contentService;

    @Autowired
    public ContentController(ContentService contentService) {
        this.contentService = contentService;
    }

    @PostMapping("/video/section/{sectionId}")
    public void createVideo(@PathVariable Long sectionId, @RequestParam MultipartFile file, @RequestBody Video video) {
        contentService.createVideo(sectionId, file, video);
    }

    @PostMapping("/quiz/section/{sectionId}")
    public void createQuiz(@PathVariable Long sectionId, @RequestBody Quiz quiz) {
        contentService.createQuiz(sectionId, quiz);
    }

    @PostMapping("/assignment/section/{sectionId}")
    public void createAssignment(@PathVariable Long sectionId, @RequestBody Assignment assignment) {
        contentService.createAssignment(sectionId, assignment);
    }

    @GetMapping("/section/{sectionId}")
    public List<Content> getContentsBySection(@PathVariable Long sectionId) {
        return contentService.getContentsBySection(sectionId);
    }

    @GetMapping("/{id}")
    public Content getContent(@PathVariable Long id) {
        return contentService.getContent(id);
    }


}
