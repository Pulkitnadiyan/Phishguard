package com.phishguard.controller;

import com.phishguard.model.Report;
import com.phishguard.model.User;
import com.phishguard.repository.ReportRepository;
import com.phishguard.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ReportRepository reportRepository;

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @DeleteMapping("/user/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        if (!userRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        userRepository.deleteById(id);
        return ResponseEntity.ok("User deleted successfully");
    }

    @DeleteMapping("/report/{id}")
    public ResponseEntity<?> deleteReport(@PathVariable Long id) {
        if (!reportRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        reportRepository.deleteById(id);
        return ResponseEntity.ok("Report deleted successfully");
    }

    @PutMapping("/report/{id}/verify")
    public ResponseEntity<?> verifyReport(@PathVariable Long id) {
        return reportRepository.findById(id).map(report -> {
            report.setStatus("verified");
            reportRepository.save(report);
            return ResponseEntity.ok(report);
        }).orElse(ResponseEntity.notFound().build());
    }
}
