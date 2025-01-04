package com.olp.backend.service;

import com.olp.backend.dto.request.LoginRequest;
import com.olp.backend.dto.request.RegisterRequest;
import com.olp.backend.dto.response.AuthResponse;
import com.olp.backend.dto.response.UserResponse;
import com.olp.backend.entity.User;
import com.olp.backend.exception.EmailAlreadyTakenException;
import com.olp.backend.exception.PasswordMismatchException;
import com.olp.backend.exception.ResourceNotFoundException;
import com.olp.backend.exception.ResourceType;
import com.olp.backend.repository.UserRepository;
import com.olp.backend.security.JwtUserDetailsService;
import com.olp.backend.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {
    private final JwtUserDetailsService jwtUserDetailsService;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    @Autowired
    public AuthService(JwtUserDetailsService jwtUserDetailsService,
                       JwtUtil jwtUtil,
                       PasswordEncoder passwordEncoder,
                       UserRepository userRepository) {
        this.jwtUserDetailsService = jwtUserDetailsService;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
    }

    public void register(RegisterRequest body) {
        Optional<User> optionalUserByEmail = userRepository.findByEmail(body.getEmail());

        if (optionalUserByEmail.isPresent()) {
            throw new EmailAlreadyTakenException();
        }

        if (!body.getPassword().equals(body.getPasswordConfirm())) {
            throw new PasswordMismatchException();
        }

        User user = new User();
        user.setName(body.getName());
        user.setEmail(body.getEmail());
        user.setPassword(passwordEncoder.encode(body.getPassword()));
        user.setRole(body.getUserType());

        userRepository.save(user);
    }

    public AuthResponse login(LoginRequest body) {
        Optional<User> optionalUser = userRepository.findByEmail(body.getEmail());
        if (optionalUser.isEmpty()) {
            throw new ResourceNotFoundException(ResourceType.USER);
        }

        if (!passwordEncoder.matches(body.getPassword(), optionalUser.get().getPassword())) {
            throw new PasswordMismatchException();
        }

        final UserDetails userDetails = jwtUserDetailsService.loadUserByUsername(body.getEmail());
        final String jwtToken = jwtUtil.generateJwtToken(userDetails);
        return AuthResponse.builder()
                .token(jwtToken)
                .user(UserResponse.fromEntity(optionalUser.get()))
                .build();
    }
}
