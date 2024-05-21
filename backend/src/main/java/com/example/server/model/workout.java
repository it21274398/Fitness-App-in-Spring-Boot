//Propeties/Entities

package com.example.server.model;

import jakarta.persistence.*;

import java.sql.Blob;
import java.util.Date;

import com.example.server.serialization.BlobDeserializer;
import com.example.server.serialization.BlobSerializer;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

@Entity
@Table(name = "workout_table")
public class workout {
    //@id-primary key
    @Id
    //indicated tht the database should automatically generate the primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;


    //stores as large object in the databse
    @Lob
    @JsonSerialize(using = BlobSerializer.class)
    @JsonDeserialize(using = BlobDeserializer.class)
    private Blob image;

    private String description; // Add description field

    private Date date = new Date();

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

    public Date getDate() {
        return date;
    }
}



