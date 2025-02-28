package com.example.quickkick.controllers;

import com.example.quickkick.model.User;
import com.example.quickkick.model.dto.LoginRequest;
import com.example.quickkick.model.dto.RegisterRequest;
import com.example.quickkick.model.enums.UserRole;
import com.example.quickkick.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody RegisterRequest request){
        User user=userService.register(request.getUsername(), request.getPassword(),request.getRepeatPassword(),UserRole.valueOf(request.getUserRole()));
        return ResponseEntity.ok(user);

    }

    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody LoginRequest request)
    {
        User user=this.userService.login(request.getUsername(),request.getPassword());
        return ResponseEntity.ok(user);
    }

}
