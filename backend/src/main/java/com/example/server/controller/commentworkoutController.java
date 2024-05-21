package com.example.server.controller;

import com.example.server.DTO.commentworkoutDTO;
import com.example.server.model.commentworkout;
import com.example.server.service.commentworkoutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/commentworkouts")
public class commentworkoutController {

    @Autowired
    private commentworkoutService commentworkoutService;

    @PostMapping("/{postId}/comments")
    public ResponseEntity<?> addComment(@PathVariable long postId, @RequestBody commentworkoutDTO comment) {
        try {
            Optional<commentworkout> updatedCommentworkout = commentworkoutService.addComment(postId, comment.getComment());
            if (updatedCommentworkout.isPresent()) {
                return ResponseEntity.ok(updatedCommentworkout.get());
            } else {
                return ResponseEntity.status(404).body("Post not found");
            }
        } catch (Exception e) {
            e.printStackTrace(); // Log the error
            return ResponseEntity.status(500).body("Internal Server Error");
        }
    }

    @GetMapping("/{postId}/comments")
    public ResponseEntity<?> showComments(@PathVariable long postId) {
        try {
            List<String> comments = commentworkoutService.showComments(postId);
            if (comments != null) {
                return ResponseEntity.ok(comments);
            } else {
                return ResponseEntity.status(404).body("Post not found");
            }
        } catch (Exception e) {
            e.printStackTrace(); // Log the error
            return ResponseEntity.status(500).body("Internal Server Error");
        }
    }

    @PutMapping("/{postId}/comments/{index}")
    public ResponseEntity<?> editComment(@PathVariable long postId, @PathVariable int index, @RequestBody commentworkoutDTO newComment) {
        try {
            if (commentworkoutService.editComment(postId, index, newComment.getComment())) {
                return ResponseEntity.ok("Comment updated successfully");
            } else {
                return ResponseEntity.status(404).body("Post or comment not found");
            }
        } catch (Exception e) {
            e.printStackTrace(); // Log the error
            return ResponseEntity.status(500).body("Internal Server Error");
        }
    }

    @DeleteMapping("/{postId}/comments/{index}")
    public ResponseEntity<?> deleteComment(@PathVariable long postId, @PathVariable int index) {
        try {
            if (commentworkoutService.deleteComment(postId, index)) {
                return ResponseEntity.ok("Comment deleted successfully");
            } else {
                return ResponseEntity.status(404).body("Post or comment not found");
            }
        } catch (Exception e) {
            e.printStackTrace(); // Log the error
            return ResponseEntity.status(500).body("Internal Server Error");
        }
    }
}
