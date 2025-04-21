package com.example.quickkick.web.model.exceptions;

public class UserNameAlreadyExistsException extends RuntimeException {
    public UserNameAlreadyExistsException(String username) {
        super("User with name " + username + " already exists");
    }
}
