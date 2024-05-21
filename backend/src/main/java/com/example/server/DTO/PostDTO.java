package com.example.server.DTO;

import java.sql.Blob;

public class PostDTO {
    private long id;
    private Blob image;
    private Blob video;
    private String description;

    // Constructor for images
    public PostDTO(long id, Blob image, String description) {
        this.id = id;
        this.image = image;
        this.description = description;
    }

    // Constructor for videos
    public PostDTO(long id, Blob video, String description, boolean isVideo) {
        this.id = id;
        this.video = video;
        this.description = description;
    }

    // Getters and setters
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Blob getImage() {
        return image;
    }

    public void setImage(Blob image) {
        this.image = image;
    }

    public Blob getVideo() {
        return video;
    }

    public void setVideo(Blob video) {
        this.video = video;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}