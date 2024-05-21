package com.example.server.controller;

import com.example.server.DTO.PostDTO;
import com.example.server.model.Comment;
import com.example.server.model.Image;
import com.example.server.service.CommentService;
import com.example.server.service.ImageService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import javax.sql.rowset.serial.SerialBlob;
import java.io.IOException;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.List;
import java.util.stream.Collectors;

@Controller
public class ClientController {

    private final ImageService imageService;
    private final CommentService commentService;

    public ClientController(ImageService imageService, CommentService commentService) {
        this.imageService = imageService;
        this.commentService = commentService;
    }

    // Image handling endpoints

    @GetMapping("/display")
    public ResponseEntity<byte[]> displayImage(@RequestParam("id") String idParam) {
        try {
            long id = Long.parseLong(idParam);
            Image image = imageService.viewById(id);
            if (image != null) {
                Blob imageData = image.getImage();
                if (imageData != null) {
                    byte[] imageBytes = imageData.getBytes(1, (int) imageData.length());
                    return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(imageBytes);
                }
            }
        } catch (NumberFormatException | SQLException e) {
            e.printStackTrace();
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/")
    public ModelAndView home() {
        ModelAndView mv = new ModelAndView("index");
        List<Image> imageList = imageService.viewAll();
        mv.addObject("imageList", imageList);
        return mv;
    }

    @GetMapping("/add")
    public ModelAndView addImageForm() {
        return new ModelAndView("addimage");
    }

    @PostMapping("/add")
    public ResponseEntity<Long> addImagePost(@RequestParam("image") MultipartFile file, @RequestParam("description") String description) {
        try {
            byte[] bytes = file.getBytes();
            Blob blob = new SerialBlob(bytes);
            Image image = new Image();
            image.setImage(blob);
            image.setDescription(description);
            imageService.create(image);
            return ResponseEntity.ok(image.getId());
        } catch (IOException | SQLException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(-1L);
        }
    }

    @GetMapping("/description")
    public ResponseEntity<String> getImageDescription(@RequestParam("id") String idParam) {
        try {
            long id = Long.parseLong(idParam);
            Image image = imageService.viewById(id);
            if (image != null) {
                return ResponseEntity.ok(image.getDescription());
            }
        } catch (NumberFormatException e) {
            e.printStackTrace();
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/update-description")
    public ResponseEntity<Void> updateImageDescription(@RequestParam("id") String idParam, @RequestBody UpdateDescriptionRequest request) {
        try {
            long id = Long.parseLong(idParam);
            Image image = imageService.viewById(id);
            if (image != null) {
                image.setDescription(request.getDescription());
                imageService.updateImage(image);
                return ResponseEntity.ok().build();
            }
        } catch (NumberFormatException e) {
            e.printStackTrace();
        }
        return ResponseEntity.notFound().build();
    }

    static class UpdateDescriptionRequest {
        private String description;

        public String getDescription() {
            return description;
        }

        public void setDescription(String description) {
            this.description = description;
        }
    }

    // Video handling endpoints

    @GetMapping("/videos")
    public ResponseEntity<List<PostDTO>> getAllVideos() {
        List<Image> videos = imageService.getAllVideos();
        if (!videos.isEmpty()) {
            List<PostDTO> posts = videos.stream()
                    .filter(video -> video.getVideo() != null)
                    .map(video -> new PostDTO(video.getId(), video.getVideo(), video.getDescription(), true))
                    .collect(Collectors.toList());
            return ResponseEntity.ok(posts);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/video/{id}")
    public ResponseEntity<byte[]> getVideoById(@PathVariable("id") long id) {
        try {
            Image video = imageService.getVideoById(id);
            if (video != null) {
                Blob videoData = video.getVideo();
                if (videoData != null) {
                    byte[] videoBytes = videoData.getBytes(1, (int) videoData.length());
                    return ResponseEntity.ok().contentType(MediaType.APPLICATION_OCTET_STREAM).body(videoBytes);
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/video/{id}")
    public ResponseEntity<Void> deleteVideo(@PathVariable("id") long id) {
        try {
            Image video = imageService.getVideoById(id);
            if (video != null) {
                imageService.deleteImage(video);
                return ResponseEntity.ok().build();
            }
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @SuppressWarnings("null")
    @PostMapping(value = "/add-video", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    public ResponseEntity<Long> addVideoPost(@RequestParam("video") MultipartFile file, @RequestParam("description") String description) {
        try {
            if (!file.getContentType().startsWith("video/")) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(-1L);
            }

            byte[] bytes = file.getBytes();
            Blob blob = new SerialBlob(bytes);
            Image video = new Image();
            video.setVideo(blob);
            video.setDescription(description);
            imageService.create(video);

            return ResponseEntity.ok(video.getId());
        } catch (IOException | SQLException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(-1L);
        }
    }

    @GetMapping("/all-posts")
    public ResponseEntity<List<PostDTO>> getAllPosts() {
        List<Image> images = imageService.viewAll();
        if (!images.isEmpty()) {
            List<PostDTO> posts = images.stream()
                    .filter(image -> image.getVideo() == null) // Filter out images with videos
                    .map(image -> new PostDTO(image.getId(), image.getImage(), image.getDescription()))
                    .collect(Collectors.toList());
            return ResponseEntity.ok(posts);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/delete-post/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable("id") long id) {
        try {
            Image image = imageService.viewById(id);
            if (image != null) {
                imageService.deleteImage(image);
                return ResponseEntity.ok().build();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return ResponseEntity.notFound().build();
    }

    // Comment handling endpoints

    @PostMapping("/add-comment/{id}")
    public ResponseEntity<Comment> addComment(@PathVariable("id") long imageId, @RequestBody String commentContent) {
        try {
            Image image = imageService.viewById(imageId);
            if (image != null) {
                Comment comment = new Comment();
                comment.setImage(image);
                comment.setContent(commentContent);
                Comment savedComment = commentService.create(comment);
                return ResponseEntity.ok(savedComment);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/comments/{id}")
    public ResponseEntity<List<Comment>> getCommentsByImageId(@PathVariable("id") long imageId) {
        List<Comment> comments = commentService.getByImageId(imageId);
        if (comments != null) {
            return ResponseEntity.ok(comments);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/delete-comment/{commentId}")
    public ResponseEntity<Void> deleteComment(@PathVariable("commentId") long commentId) {
        try {
            Comment comment = commentService.findById(commentId);
            if (comment != null) {
                commentService.delete(comment);
                return ResponseEntity.ok().build();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return ResponseEntity.notFound().build();
    }

}

