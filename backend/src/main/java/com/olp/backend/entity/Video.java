package com.olp.backend.entity;

import jakarta.persistence.*;


@Entity
@Table(name = "video")
@DiscriminatorValue("video")
public class Video extends Content {
    @Column(name = "url")
    private String url;

    public Video() {
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}
