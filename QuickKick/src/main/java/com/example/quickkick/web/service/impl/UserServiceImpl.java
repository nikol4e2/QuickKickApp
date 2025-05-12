package com.example.quickkick.web.service.impl;


import com.example.quickkick.web.model.User;
import com.example.quickkick.web.model.enums.UserRole;
import com.example.quickkick.web.model.exceptions.InvalidUserCredentialsException;
import com.example.quickkick.web.model.exceptions.PasswordsDoNotMatchException;
import com.example.quickkick.web.model.exceptions.UserNameAlreadyExistsException;
import com.example.quickkick.web.repository.UserRepository;
import com.example.quickkick.web.service.UserService;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public User login(String username, String password) {
        if (username == null || password == null) {
            throw new InvalidUserCredentialsException();
        }

        User user = userRepository.findByUsername(username)
                .orElseThrow(InvalidUserCredentialsException::new);

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new PasswordsDoNotMatchException();
        }

        return user;
    }

    @Override
    public User register(String username, String password, String repeatPassword, UserRole userRole) {
        if(username==null || username.isEmpty() || password==null || password.isEmpty())
        {
            throw new InvalidUserCredentialsException();
        }
        if(!password.equals(repeatPassword))
        {
            throw new PasswordsDoNotMatchException();
        }
        if(this.userRepository.findByUsername(username).isPresent() || !this.userRepository.findByUsername(username).isEmpty())
        {
            throw new UserNameAlreadyExistsException(username);
        }
        String encodedPassword = passwordEncoder.encode(password);
        User user=new User(username,encodedPassword,userRole);
        return this.userRepository.save(user);
    }

    @Override
    public boolean authenticate(String username, String password) {
        User user=this.userRepository.findByUsername(username).orElseThrow(InvalidUserCredentialsException::new);
        if(!passwordEncoder.matches(password,user.getPassword()))
        {
            throw new PasswordsDoNotMatchException();
        }
        return true;
    }
}
