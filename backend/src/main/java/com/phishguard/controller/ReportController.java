package com.phishguard.controller;

import com.phishguard.model.Report;
import com.phishguard.repository.ReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class ReportController {

    @Autowired
    private ReportRepository reportRepository;

    @Autowired
    private com.phishguard.repository.UserRepository userRepository;

    @PostMapping("/report")
    public ResponseEntity<?> reportPhishing(@RequestBody Report report) {
        String email = org.springframework.security.core.context.SecurityContextHolder.getContext().getAuthentication()
                .getName();
        com.phishguard.model.User user = userRepository.findByEmail(email).orElse(null);
        report.setUser(user);

        Report savedReport = reportRepository.save(report);
        return ResponseEntity.ok(savedReport);
    }

    @GetMapping("/reports")
    public List<Report> getAllReports() {
        String email = org.springframework.security.core.context.SecurityContextHolder.getContext().getAuthentication()
                .getName();
        com.phishguard.model.User user = userRepository.findByEmail(email).orElse(null);

        if (user != null && "ROLE_ADMIN".equals(user.getRole())) {
            return reportRepository.findAllByOrderByCreatedAtDesc();
        } else if (user != null) {
            return reportRepository.findAllByUserOrderByCreatedAtDesc(user);
        } else {
            return java.util.Collections.emptyList(); // Or return all if you want anonymous to see all?
        }
    }
}
