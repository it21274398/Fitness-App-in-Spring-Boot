package com.example.server.DTO;

import java.sql.Blob;

public class workoutDTO {
    private long id;
    private Blob image;
    private String description;

    // Constructor
    public workoutDTO(long id, Blob image, String description) {
        this.id = id;
        this.image = image;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
