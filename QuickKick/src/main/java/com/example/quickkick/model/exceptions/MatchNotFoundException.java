package com.example.quickkick.model.exceptions;

public class MatchNotFoundException extends RuntimeException{

    public MatchNotFoundException() {
        super("Match not found");
    }
}
