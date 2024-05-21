package com.example.server.service;

import com.example.server.model.Image;
import com.example.server.repository.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ImageServiceImpl implements ImageService {

    @Autowired
    private ImageRepository imageRepository;

    @Override
    public Image create(Image image) {
        return imageRepository.save(image);
    }

    @Override
    public List<Image> viewAll() {
        return (List<Image>) imageRepository.findAll();
    }

    @Override
    public Image viewById(long id) {
        return imageRepository.findById(id).orElse(null);
    }

    @Override
    public Image updateImage(Image updatedImage) {
        Image existingImage = imageRepository.findById(updatedImage.getId())
                .orElseThrow(() -> new IllegalArgumentException("Image not found with ID: " + updatedImage.getId()));
        existingImage.setImage(updatedImage.getImage());
        existingImage.setVideo(updatedImage.getVideo());
        existingImage.setDescription(updatedImage.getDescription());

        return imageRepository.save(existingImage);
    }

    @Override
    public void deleteImage(Image image) {
        imageRepository.delete(image);
    }

    // New methods for videos
    @Override
    public List<Image> getAllVideos() {
        return (List<Image>) imageRepository.findAll(); // Add proper filtering logic if needed
    }

    @Override
    public Image getVideoById(long id) {
        return imageRepository.findById(id).orElse(null); // Add proper filtering logic if needed
    }

}
