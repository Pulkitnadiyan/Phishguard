package com.phishguard.service;

import com.phishguard.model.Prediction;
import com.phishguard.repository.PredictionRepository;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
public class PhishingService {

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private PredictionRepository predictionRepository;

    @Value("${ml.service.url}")
    private String mlServiceUrl;

    public Prediction checkUrl(String url, com.phishguard.model.User user) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, String> map = new HashMap<>();
        map.put("url", url);

        HttpEntity<Map<String, String>> request = new HttpEntity<>(map, headers);

        try {
            MLResponse response = restTemplate.postForObject(mlServiceUrl, request, MLResponse.class);

            Prediction prediction = new Prediction();
            prediction.setUrl(url);
            if (response != null) {
                prediction.setResult(response.getResult());
            } else {
                prediction.setResult("unknown"); // Handle null response
            }
            prediction.setUser(user);

            return predictionRepository.save(prediction);
        } catch (Exception e) {
            // Fallback or error handling
            throw new RuntimeException("Error connecting to ML Service: " + e.getMessage());
        }
    }
}

@Data
class MLResponse {
    private String result;
    private String url;
}
