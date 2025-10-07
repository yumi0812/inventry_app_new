package com.example.demo;

public class AuthResponse {
  private String role;
  private String token;

  public AuthResponse(String role, String token) {
    this.role = role;
    this.token = token;
  }

  // getters and setters
  public String getRole() { return role; }
  public void setRole(String role) { this.role = role; }
  public String getToken() { return token; }
  public void setToken(String token) { this.token = token; }
}
