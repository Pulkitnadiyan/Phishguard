package com.phishguard.repository;

import com.phishguard.model.Prediction;
import com.phishguard.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PredictionRepository extends JpaRepository<Prediction, Long> {
    long countByUser(User user);

    long countByUserAndResult(User user, String result);
}
