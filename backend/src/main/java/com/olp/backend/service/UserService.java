package com.olp.backend.service;

import com.olp.backend.dto.response.UserResponse;
import com.olp.backend.entity.User;
import com.olp.backend.exception.ResourceNotFoundException;
import com.olp.backend.exception.ResourceType;
import com.olp.backend.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
@Transactional
public class UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Optional<User> getAuthenticatedUser() {
        String username = "";
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (!(authentication instanceof AnonymousAuthenticationToken)) {
            username = authentication.getName();
        }
        Optional<User> optionalUser = userRepository.findByEmail(username);
        return optionalUser;
    }

    public UserResponse getUser(Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException(ResourceType.USER));
        return UserResponse.fromEntity(user);
    }
}
