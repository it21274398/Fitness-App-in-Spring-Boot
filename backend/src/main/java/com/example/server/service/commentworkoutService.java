package com.example.server.service;

import com.example.server.model.commentworkout;

import java.util.List;
import java.util.Optional;

public interface commentworkoutService {
    Optional<commentworkout> addComment(long id, String comment);
    List<String> showComments(long id);
    boolean editComment(long id, int index, String newComment);
    boolean deleteComment(long id, int index);
}
