package com.example.server.DTO;

public class commentworkoutDTO {
    private long id;
    private String comment;

    // Constructors, getters, and setters

    public commentworkoutDTO() {
    }

    public commentworkoutDTO(long id, String comment) {
        this.id = id;
        this.comment = comment;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
}
