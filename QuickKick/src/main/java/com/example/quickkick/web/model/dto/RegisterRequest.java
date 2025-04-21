package com.example.quickkick.web.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class RegisterRequest {

    private String username;
    private String password;
    private String repeatPassword;
    private String userRole;
}
