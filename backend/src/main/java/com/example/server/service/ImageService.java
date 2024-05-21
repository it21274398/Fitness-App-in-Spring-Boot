package com.example.server.service;

import com.example.server.model.Image;

import java.util.List;

public interface ImageService {
    Image create(Image image);
    List<Image> viewAll();
    Image viewById(long id);
    Image updateImage(Image updatedImage);
    void deleteImage(Image image);

    // New methods for videos
    List<Image> getAllVideos();
    Image getVideoById(long id);

}
