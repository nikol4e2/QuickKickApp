package com.example.quickkick.web.model.exceptions;

public class PlayerNotFoundException extends RuntimeException {
    public PlayerNotFoundException() { super("Player not found");
    }
}
