package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

  @Autowired
  private UserRepository userRepository;

  @PostMapping("/login")
  public ResponseEntity<?> login(@RequestBody LoginRequest request) {
    System.out.println("email: " + request.getEmail());
System.out.println("password: " + request.getPassword());
    return userRepository.findByEmail(request.getEmail())
      .filter(user -> user.getPassword().equals(request.getPassword()))
      .<ResponseEntity<?>>map(user -> ResponseEntity.ok(new AuthResponse(user.getRole(), "dummy-token")))
      .orElse(ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials"));
  }
}