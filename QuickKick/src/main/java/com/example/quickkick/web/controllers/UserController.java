package com.example.quickkick.web.controllers;

import com.example.quickkick.web.model.User;
import com.example.quickkick.web.model.dto.LoginRequest;
import com.example.quickkick.web.model.dto.RegisterRequest;
import com.example.quickkick.web.model.enums.UserRole;
import com.example.quickkick.web.service.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
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
    public ResponseEntity<?> login(@RequestBody LoginRequest request, HttpSession session) {
        try {
            User user = userService.login(request.getUsername(), request.getPassword());
            session.setAttribute("user", user.getUsername());
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid username or password");
        }
    }

}
