package com.example.demo;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
@CrossOrigin(origins = "*")
public class InventoryController {

    @GetMapping("/")
    public String home() {
        return "Inventory App is running successfully!";
    }

    @GetMapping("/health")
    public String health() {
        return "OK";
    }

    @GetMapping("/api/test")
    public String test() {
        return "API is working!";
    }
}
