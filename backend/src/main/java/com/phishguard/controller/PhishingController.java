package com.phishguard.controller;

import com.phishguard.model.Prediction;
import com.phishguard.service.PhishingService;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class PhishingController {

    @Autowired
    private PhishingService phishingService;

    @Autowired
    private com.phishguard.repository.UserRepository userRepository;

    @PostMapping("/check-url")
    public ResponseEntity<?> checkUrl(@RequestBody UrlRequest request) {
        String email = org.springframework.security.core.context.SecurityContextHolder.getContext().getAuthentication()
                .getName();
        com.phishguard.model.User user = userRepository.findByEmail(email).orElse(null);

        Prediction prediction = phishingService.checkUrl(request.getUrl(), user);
        return ResponseEntity.ok(prediction);
    }
}

@Data
class UrlRequest {
    private String url;
}
