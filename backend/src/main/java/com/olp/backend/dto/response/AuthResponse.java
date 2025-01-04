package com.olp.backend.dto.response;


public class AuthResponse {
    private final String token;
    private final UserResponse user;

    private AuthResponse(Builder builder) {
        this.token = builder.token;
        this.user = builder.user;
    }

    public String getToken() {
        return token;
    }

    public UserResponse getUser() {
        return user;
    }

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private String token;
        private UserResponse user;

        public Builder token(String token) {
            this.token = token;
            return this;
        }

        public Builder user(UserResponse user) {
            this.user = user;
            return this;
        }

        public AuthResponse build() {
            return new AuthResponse(this);
        }
    }


}
