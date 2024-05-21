package com.example.server.service;

import com.example.server.model.Comment;
import com.example.server.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentServiceImpl implements CommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Override
    public Comment create(Comment comment) {
        return commentRepository.save(comment);
    }

    @Override
    public List<Comment> getByImageId(long imageId) {
        return commentRepository.findByImageId(imageId);
    }
    
    @Override
    public Comment findById(long commentId) {
        return commentRepository.findById(commentId).orElse(null);
    }

    @Override
    public void delete(Comment comment) {
        commentRepository.delete(comment);
    }
}