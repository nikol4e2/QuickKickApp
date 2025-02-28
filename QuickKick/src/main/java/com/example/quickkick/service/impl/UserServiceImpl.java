package com.example.quickkick.service.impl;


import com.example.quickkick.model.User;
import com.example.quickkick.model.enums.UserRole;
import com.example.quickkick.model.exceptions.InvalidUserCredentialsException;
import com.example.quickkick.model.exceptions.PasswordsDoNotMatchException;
import com.example.quickkick.model.exceptions.UserNameAlreadyExistsException;
import com.example.quickkick.repository.UserRepository;
import com.example.quickkick.service.UserService;

import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;


    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User login(String username, String password) {
        if(username == null || password == null) {
            throw new InvalidUserCredentialsException();
        }
        return userRepository.findByUsernameAndPassword(username,password).orElseThrow(InvalidUserCredentialsException::new);
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
        User user=new User(username,password,userRole);
        return this.userRepository.save(user);
    }
}
