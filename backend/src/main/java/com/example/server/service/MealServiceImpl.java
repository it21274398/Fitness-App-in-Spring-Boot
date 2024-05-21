package com.example.server.service;

import com.example.server.model.Meal;
import com.example.server.repository.MealRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class MealServiceImpl implements MealService {

    @Autowired
    private MealRepository mealRepository;

    @Override
    public List<Meal> getAllMeals() {
        return mealRepository.findAll();
    }

    @Override
    public Meal getMealById(String id) {
        Optional<Meal> meal = mealRepository.findById(Long.parseLong(id));
        return meal.orElse(null);
    }

    @Override
    public Meal createMeal(Meal meal, MultipartFile imageFile) throws IOException {
        meal.setImage(imageFile.getBytes());
        meal.setImageName(imageFile.getOriginalFilename());
        return mealRepository.save(meal);
    }

    @Override
    public Meal updateMeal(String id, Meal meal, MultipartFile imageFile) throws IOException {
        Optional<Meal> existingMealOpt = mealRepository.findById(Long.parseLong(id));
        if (existingMealOpt.isPresent()) {
            Meal existingMeal = existingMealOpt.get();
            existingMeal.setName(meal.getName());
            existingMeal.setDescription(meal.getDescription());
            if (imageFile != null && !imageFile.isEmpty()) {
                existingMeal.setImage(imageFile.getBytes());
                existingMeal.setImageName(imageFile.getOriginalFilename());
            }
            return mealRepository.save(existingMeal);
        }
        return null;
    }

    @Override
    public void deleteMeal(String id) {
        mealRepository.deleteById(Long.parseLong(id));
    }
}
