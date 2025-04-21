package com.example.quickkick.web.model.exceptions;

public class TeamNullException extends RuntimeException{
    public TeamNullException() {
        super("Team is null");
    }
}
