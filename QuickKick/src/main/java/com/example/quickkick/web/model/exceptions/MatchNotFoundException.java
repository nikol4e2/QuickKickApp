package com.example.quickkick.web.model.exceptions;

public class MatchNotFoundException extends RuntimeException{

    public MatchNotFoundException() {
        super("Match not found");
    }
}
