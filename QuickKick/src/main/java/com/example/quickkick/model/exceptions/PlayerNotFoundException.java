package com.example.quickkick.model.exceptions;

public class PlayerNotFoundException extends RuntimeException {
    public PlayerNotFoundException() { super("Player not found");
    }
}
