package com.phishguard.controller;

import com.phishguard.repository.PredictionRepository;
import com.phishguard.repository.ReportRepository;
import lombok.Builder;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class StatsController {

    @Autowired
    private PredictionRepository predictionRepository;

    @Autowired
    private ReportRepository reportRepository;

    @Autowired
    private com.phishguard.repository.UserRepository userRepository;

    @GetMapping("/stats")
    public StatsResponse getStats() {
        String email = org.springframework.security.core.context.SecurityContextHolder.getContext().getAuthentication()
                .getName();
        com.phishguard.model.User user = userRepository.findByEmail(email).orElse(null);

        long totalChecked;
        long phishingDetected;
        long totalReports;

        if (user != null && "ROLE_ADMIN".equals(user.getRole())) {
            totalChecked = predictionRepository.count();
            phishingDetected = predictionRepository.findAll().stream()
                    .filter(p -> "phishing".equalsIgnoreCase(p.getResult()))
                    .count();
            totalReports = reportRepository.count();
        } else if (user != null) {
            totalChecked = predictionRepository.countByUser(user);
            phishingDetected = predictionRepository.countByUserAndResult(user, "phishing");
            totalReports = reportRepository.countByUser(user);
        } else {
            totalChecked = 0;
            phishingDetected = 0;
            totalReports = 0;
        }

        return StatsResponse.builder()
                .totalChecked(totalChecked)
                .phishingDetected(phishingDetected)
                .totalReports(totalReports)
                .build();
    }
}

@Data
@Builder
class StatsResponse {
    private long totalChecked;
    private long phishingDetected;
    private long totalReports;
}
