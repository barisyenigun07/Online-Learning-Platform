package com.olp.backend.controller;

import com.olp.backend.dto.request.LoginRequest;
import com.olp.backend.dto.request.RegisterRequest;
import com.olp.backend.dto.response.AuthResponse;
import com.olp.backend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final AuthService authService;

    @Autowired
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public void register(@RequestBody RegisterRequest body) {
        authService.register(body);
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest body) {
        return authService.login(body);
    }
}
