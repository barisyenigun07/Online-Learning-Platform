package com.olp.backend.service;

import com.olp.backend.entity.*;
import com.olp.backend.exception.ResourceNotFoundException;
import com.olp.backend.exception.ResourceType;
import com.olp.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;


import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
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

    @Value("${upload.directory}")
    private String uploadDir;


    @Autowired
    public ContentService(VideoRepository videoRepository, QuizRepository quizRepository, AssignmentRepository assignmentRepository, SectionRepository sectionRepository) {
        this.videoRepository = videoRepository;
        this.quizRepository = quizRepository;
        this.assignmentRepository = assignmentRepository;
        this.sectionRepository = sectionRepository;
    }

    public void createVideo(Long sectionId, MultipartFile file, String title) {
        Section section = sectionRepository.findById(sectionId).orElseThrow(() -> new ResourceNotFoundException(ResourceType.SECTION));
        Video video = new Video();

        if (file.isEmpty()) {
            throw new IllegalArgumentException("Video should not be empty");
        }

        try {
            Path directoryPath = Paths.get(uploadDir);

            if (!Files.exists(directoryPath)) {
                Files.createDirectories(directoryPath);
            }

            String filename = UUID.randomUUID() + "-" + file.getOriginalFilename();
            Path filePath = directoryPath.resolve(filename);

            try (InputStream inputStream = file.getInputStream()) {
                Files.copy(inputStream, filePath, StandardCopyOption.REPLACE_EXISTING);
            }
            video.setUrl(filename);
        } catch (Exception e) {
            throw new RuntimeException("Failed to upload!");
        }

        video.setTitle(title);
        video.setSection(section);
        videoRepository.save(video);
    }

    public void createQuiz(Long sectionId, Quiz quiz) {
        Section section = sectionRepository.findById(sectionId).orElseThrow(() -> new ResourceNotFoundException(ResourceType.SECTION));
        quiz.setSection(section);
        if (quiz.getQuestions() != null) {
            for (Question question : quiz.getQuestions()) {
                question.setQuiz(quiz);
            }
        }
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

    public ResponseEntity<Resource> getVideoContent(String filename, String rangeHeader) {
        try {
            Path filePath = Paths.get(uploadDir).resolve(filename);
            if (!Files.exists(filePath)) {
                throw new ResourceNotFoundException(ResourceType.CONTENT);
            }

            File videoFile = filePath.toFile();
            long fileLength = videoFile.length();

            // Handle byte-range requests
            if (rangeHeader != null && rangeHeader.startsWith("bytes=")) {
                String[] ranges = rangeHeader.replace("bytes=", "").split("-");
                long start = Long.parseLong(ranges[0]);
                long end = ranges.length > 1 ? Long.parseLong(ranges[1]) : fileLength - 1;

                if (end >= fileLength) {
                    end = fileLength - 1;
                }

                long contentLength = end - start + 1;
                InputStream inputStream = new FileInputStream(videoFile);
                inputStream.skip(start);

                return ResponseEntity.status(HttpStatus.PARTIAL_CONTENT)
                        .contentType(MediaTypeFactory.getMediaType(videoFile.getName()).orElse(MediaType.APPLICATION_OCTET_STREAM))
                        .header(HttpHeaders.CONTENT_RANGE, "bytes " + start + "-" + end + "/" + fileLength)
                        .header(HttpHeaders.CONTENT_LENGTH, String.valueOf(contentLength))
                        .body(new InputStreamResource(inputStream));
            }

            // Return the entire file if no range is specified
            return ResponseEntity.ok()
                    .contentType(MediaTypeFactory.getMediaType(videoFile.getName()).orElse(MediaType.APPLICATION_OCTET_STREAM))
                    .header(HttpHeaders.CONTENT_LENGTH, String.valueOf(fileLength))
                    .body(new InputStreamResource(new FileInputStream(videoFile)));

        } catch (IOException e) {
            throw new RuntimeException("Error reading video file", e);
        }
    }

    public Content getContent(Long id) {
        return videoRepository.findById(id).map(content -> (Content) content)
                .or(() -> quizRepository.findById(id).map(content -> (Content) content))
                .or(() -> assignmentRepository.findById(id).map(content -> (Content) content))
                .orElseThrow(() -> new ResourceNotFoundException(ResourceType.CONTENT));
    }

}
