package com.olp.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;


@Entity
@Table(name = "assignment")
@DiscriminatorValue("assignment")
public class Assignment extends Content {
    @Column(name = "description")
    private String description;

    public Assignment() {
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
