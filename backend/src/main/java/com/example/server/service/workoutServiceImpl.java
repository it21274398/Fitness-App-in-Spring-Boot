//Implements the image service interface for image related options
package com.example.server.service;

import com.example.server.model.workout;
import com.example.server.repository.workoutRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class workoutServiceImpl implements workoutService {

    @Autowired
    private workoutRepository workoutRepository;

    @Override
    public workout create(workout image) {
        return workoutRepository.save(image);
    }

    @Override
    public List<workout> viewAll() {
        return (List<workout>) workoutRepository.findAll();
    }

    @Override
    public workout viewById(long id) {
        return workoutRepository.findById(id).orElse(null);
    }

    @Override
    public workout updateImage(workout updatedImage) {
        // Implement the update logic here
        // For example:
        // Get the existing image from the repository based on ID
        // Update its fields with the data from updatedImage
        // Save the updated image back to the repository
        workout existingImage = workoutRepository.findById(updatedImage.getId())
                .orElseThrow(() -> new IllegalArgumentException("Image not found with ID: " + updatedImage.getId()));
        existingImage.setImage(updatedImage.getImage());
        existingImage.setDescription(updatedImage.getDescription());

        return workoutRepository.save(existingImage);
    }


    @Override
    public void deleteImage(workout image) {
        workoutRepository.delete(image);
    }
}
