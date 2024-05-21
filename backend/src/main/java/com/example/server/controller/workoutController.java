package com.example.server.controller;

import com.example.server.DTO.workoutDTO;
import com.example.server.model.workout;
import com.example.server.service.workoutService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.rowset.serial.SerialBlob;
import javax.sql.rowset.serial.SerialException;
import java.io.IOException;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.List;
import java.util.stream.Collectors;

@Controller
public class workoutController {

    private final workoutService workoutService;

    public workoutController(workoutService workoutService) {
        this.workoutService = workoutService;
    }

    @GetMapping("/workoutping")
    @ResponseBody
    public String helloWorld() {
        return "Hello World!";
    }

    @GetMapping("/workoutdisplay")
    public ResponseEntity<byte[]> displayImage(@RequestParam("id") String idParam) {
        try {
            long id = Long.parseLong(idParam);
            workout image = workoutService.viewById(id);
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

    @GetMapping("/workout")
    public ModelAndView home() {
        ModelAndView mv = new ModelAndView("index");
        List<workout> imageList = workoutService.viewAll();
        mv.addObject("imageList", imageList);
        return mv;
    }

    @GetMapping("/workoutadd")
    public ModelAndView addImageForm() {
        return new ModelAndView("addimage");
    }

    @PostMapping("/workoutadd")
    public ResponseEntity<Long> addImagePost(@RequestParam("image") MultipartFile file, @RequestParam("description") String description) {
        try {
            byte[] bytes = file.getBytes();
            Blob blob = new SerialBlob(bytes);
            workout image = new workout();
            image.setImage(blob);
            image.setDescription(description);
            workoutService.create(image);
            return ResponseEntity.ok(image.getId());
        } catch (IOException | SQLException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(-1L);
        }
    }

    @GetMapping("/workoutdescription")
    public ResponseEntity<String> getImageDescription(@RequestParam("id") String idParam) {
        try {
            long id = Long.parseLong(idParam);
            workout image = workoutService.viewById(id);
            if (image != null) {
                String description = image.getDescription();
                return ResponseEntity.ok(description);
            }
        } catch (NumberFormatException e) {
            e.printStackTrace();
        }
        return ResponseEntity.notFound().build();
    }

    @ExceptionHandler({IOException.class, SerialException.class, SQLException.class})
    public ModelAndView handleFileUploadException(Exception ex, HttpServletRequest request, HttpServletResponse response) {
        ModelAndView mv = new ModelAndView("error");
        mv.addObject("errorMessage", "Error uploading file: " + ex.getMessage());
        return mv;
    }

    @PutMapping("/workoutupdate-description")
    public ResponseEntity<Void> updateImageDescription(@RequestParam("id") String idParam, @RequestBody UpdateDescriptionRequest request) {
        try {
            long id = Long.parseLong(idParam);
            workout image = workoutService.viewById(id);
            if (image != null) {
                image.setDescription(request.getDescription());
                workoutService.updateImage(image);
                return ResponseEntity.ok().build();
            }
        } catch (NumberFormatException  e) {
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

    @DeleteMapping("/workoutdelete-post/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable("id") long id) {
        try {
            workout image = workoutService.viewById(id);
            if (image != null) {
                workoutService.deleteImage(image); // Assuming a delete method in your service
                return ResponseEntity.ok().build(); // Return success response
            }
        } catch (Exception e) {
            e.printStackTrace(); // Handle or log the exception as needed
        }
        return ResponseEntity.notFound().build();
    }


    @GetMapping("/workoutall-posts")
public ResponseEntity<List<workoutDTO>> viewAllPosts() {
    List<workout> images = workoutService.viewAll();
    if (images != null) {
        List<workoutDTO> posts = images.stream()
                .map(image -> new workoutDTO(image.getId(), image.getImage(), image.getDescription()))
                .collect(Collectors.toList());
        return ResponseEntity.ok(posts);
    } else {
        return ResponseEntity.notFound().build();
    }
}


}


