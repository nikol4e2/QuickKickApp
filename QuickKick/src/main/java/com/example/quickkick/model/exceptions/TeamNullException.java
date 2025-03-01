package com.example.quickkick.model.exceptions;

public class TeamNullException extends RuntimeException{
    public TeamNullException() {
        super("Team is null");
    }
}
