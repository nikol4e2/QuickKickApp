package com.example.quickkick.model.dto;

import com.example.quickkick.model.enums.UserRole;
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
