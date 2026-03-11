package com.phishguard.repository;

import com.phishguard.model.Report;
import com.phishguard.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ReportRepository extends JpaRepository<Report, Long> {
    List<Report> findAllByOrderByCreatedAtDesc();

    List<Report> findAllByUserOrderByCreatedAtDesc(User user);

    long countByUser(User user);
}
