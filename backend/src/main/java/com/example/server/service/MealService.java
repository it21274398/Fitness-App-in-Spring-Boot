package com.example.server.service;

import com.example.server.model.Meal;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;

public interface MealService {
    List<Meal> getAllMeals();

    Meal getMealById(String id);

    Meal createMeal(Meal meal, MultipartFile imageFile) throws IOException;

    Meal updateMeal(String id, Meal meal, MultipartFile imageFile) throws IOException;

    void deleteMeal(String id);
}
