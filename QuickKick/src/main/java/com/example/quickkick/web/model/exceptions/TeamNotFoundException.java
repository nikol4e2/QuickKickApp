package com.example.quickkick.web.model.exceptions;

public class TeamNotFoundException extends RuntimeException {
    public TeamNotFoundException() {
        super("Team not found");
    }
}
