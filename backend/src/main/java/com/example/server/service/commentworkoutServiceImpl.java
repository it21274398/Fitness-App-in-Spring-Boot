package com.example.server.service;

import com.example.server.model.commentworkout;
import com.example.server.repository.commentworkoutRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class commentworkoutServiceImpl implements commentworkoutService {

    @Autowired
    private commentworkoutRepository commentworkoutRepo;

    @Override
    public Optional<commentworkout> addComment(long id, String comment) {
        try {
            Optional<commentworkout> existingCommentworkout = commentworkoutRepo.findById(id);
            if (existingCommentworkout.isPresent()) {
                commentworkout workout = existingCommentworkout.get();
                workout.addComment(comment);
                commentworkoutRepo.save(workout);
                return Optional.of(workout);
            }
            return Optional.empty();
        } catch (Exception e) {
            e.printStackTrace(); // Log the error
            return Optional.empty();
        }
    }

    @Override
    public List<String> showComments(long id) {
        try {
            Optional<commentworkout> existingCommentworkout = commentworkoutRepo.findById(id);
            return existingCommentworkout.map(commentworkout::getComments).orElse(null);
        } catch (Exception e) {
            e.printStackTrace(); // Log the error
            return null;
        }
    }

    @Override
    public boolean editComment(long id, int index, String newComment) {
        try {
            Optional<commentworkout> existingCommentworkout = commentworkoutRepo.findById(id);
            if (existingCommentworkout.isPresent()) {
                commentworkout workout = existingCommentworkout.get();
                if (index >= 0 && index < workout.getComments().size()) {
                    workout.getComments().set(index, newComment);
                    commentworkoutRepo.save(workout);
                    return true;
                }
            }
            return false;
        } catch (Exception e) {
            e.printStackTrace(); // Log the error
            return false;
        }
    }

    @Override
    public boolean deleteComment(long id, int index) {
        try {
            Optional<commentworkout> existingCommentworkout = commentworkoutRepo.findById(id);
            if (existingCommentworkout.isPresent()) {
                commentworkout workout = existingCommentworkout.get();
                if (index >= 0 && index < workout.getComments().size()) {
                    workout.deleteComment(index);
                    commentworkoutRepo.save(workout);
                    return true;
                }
            }
            return false;
        } catch (Exception e) {
            e.printStackTrace(); // Log the error
            return false;
        }
    }
}
