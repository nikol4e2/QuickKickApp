package com.example.quickkick.model;


import com.example.quickkick.model.enums.UserRole;
import lombok.Data;

@Data
public class User {

    private String username;
    private String password;
    private UserRole role;

    public User(String username, String password, UserRole role) {
        this.username = username;
        this.password = password;
        this.role = role;
    }
}
