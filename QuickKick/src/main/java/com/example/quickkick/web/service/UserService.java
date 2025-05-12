package com.example.quickkick.web.service;

import com.example.quickkick.web.model.User;
import com.example.quickkick.web.model.enums.UserRole;

public interface UserService {

    User login(String username, String password);
    User register(String username, String password, String repeatPassword, UserRole userRole);
     boolean authenticate(String username, String password);
}
