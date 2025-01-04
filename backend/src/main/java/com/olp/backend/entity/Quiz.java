package com.olp.backend.entity;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.util.List;


@Entity
@Table(name = "quiz")
@DiscriminatorValue("quiz")
public class Quiz extends Content {
    @OneToMany(mappedBy = "quiz", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties({"quiz"})
    private List<Question> questions;

    public Quiz() {
    }

    public List<Question> getQuestions() {
        return questions;
    }

    public void setQuestions(List<Question> questions) {
        this.questions = questions;
    }
}
