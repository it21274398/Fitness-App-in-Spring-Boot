package com.example.server.service;

import com.example.server.model.Comment;

import java.util.List;

public interface CommentService {
    Comment create(Comment comment);
    
    List<Comment> getByImageId(long imageId);
    
    Comment findById(long commentId);
    
    void delete(Comment comment);
}