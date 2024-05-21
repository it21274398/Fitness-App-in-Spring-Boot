
package com.example.server.service;

import com.example.server.model.workout;

import java.util.List;

public interface workoutService {
    workout create(workout image);
    List<workout> viewAll();//retrieving all images
    workout viewById(long id);
    workout updateImage(workout updatedImage); // Add this method for updating image data
    void deleteImage(workout image); // Add this method for deleting an image
}
