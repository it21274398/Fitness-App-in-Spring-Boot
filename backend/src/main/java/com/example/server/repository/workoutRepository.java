
//defines methods for crud operations on image entity
package com.example.server.repository;

import com.example.server.model.workout;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface workoutRepository extends CrudRepository<workout, Long> {

}