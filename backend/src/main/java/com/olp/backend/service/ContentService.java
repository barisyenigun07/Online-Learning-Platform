package com.olp.backend.service;

import com.olp.backend.entity.*;
import com.olp.backend.exception.ResourceNotFoundException;
import com.olp.backend.exception.ResourceType;
import com.olp.backend.repository.AssignmentRepository;
import com.olp.backend.repository.QuizRepository;
import com.olp.backend.repository.SectionRepository;
import com.olp.backend.repository.VideoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;


import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;

@Service
public class ContentService {
    private final VideoRepository videoRepository;
    private final QuizRepository quizRepository;
    private final AssignmentRepository assignmentRepository;
    private final SectionRepository sectionRepository;

    private String uploadDir = "";


    @Autowired
    public ContentService(VideoRepository videoRepository, QuizRepository quizRepository, AssignmentRepository assignmentRepository, SectionRepository sectionRepository) {
        this.videoRepository = videoRepository;
        this.quizRepository = quizRepository;
        this.assignmentRepository = assignmentRepository;
        this.sectionRepository = sectionRepository;
    }

    public void createVideo(Long sectionId, MultipartFile file, Video video) {
        Section section = sectionRepository.findById(sectionId).orElseThrow(() -> new ResourceNotFoundException(ResourceType.SECTION));

        if (file.isEmpty()) {
            throw new IllegalArgumentException("Video should not be empty");
        }

        try (InputStream inputStream = file.getInputStream()) {
            Files.copy(inputStream, Paths.get(uploadDir), StandardCopyOption.REPLACE_EXISTING);
            String fileUrl = "http://localhost:8080/" + UUID.randomUUID() + "-" + file.getOriginalFilename();
            video.setUrl(fileUrl);
        }
        catch (Exception e) {
            System.out.println("Error!");
        }
        video.setSection(section);
        videoRepository.save(video);
    }

    public void createQuiz(Long sectionId, Quiz quiz) {
        Section section = sectionRepository.findById(sectionId).orElseThrow(() -> new ResourceNotFoundException(ResourceType.SECTION));
        quiz.setSection(section);
        quizRepository.save(quiz);
    }

    public void createAssignment(Long sectionId, Assignment assignment) {
        Section section = sectionRepository.findById(sectionId).orElseThrow(() -> new ResourceNotFoundException(ResourceType.SECTION));
        assignment.setSection(section);
        assignmentRepository.save(assignment);
    }

    public List<Content> getContentsBySection(Long sectionId) {
        Section section = sectionRepository.findById(sectionId).orElseThrow(() -> new ResourceNotFoundException(ResourceType.SECTION));
        return section.getContents();
    }

    public byte[] getVideoContent() {
        return null;
    }

    public Content getContent(Long id) {
        return videoRepository.findById(id).map(content -> (Content) content)
                .or(() -> quizRepository.findById(id).map(content -> (Content) content))
                .or(() -> assignmentRepository.findById(id).map(content -> (Content) content))
                .orElseThrow(() -> new ResourceNotFoundException(ResourceType.CONTENT));
    }

}
