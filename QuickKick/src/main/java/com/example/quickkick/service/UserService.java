package com.example.quickkick.service;

import com.example.quickkick.model.User;
import com.example.quickkick.model.enums.UserRole;

public interface UserService {

    User login(String username, String password);
    User register(String username, String password, String repeatPassword, UserRole userRole);
}
