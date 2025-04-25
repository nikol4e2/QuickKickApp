package com.example.quickkick.web.model.dto;

import lombok.Data;

@Data
public class PlayerDto {
    private String firstName;
    private String lastName;
    private Long teamId;


    public PlayerDto(String firstName, String lastName, Long teamId) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.teamId = teamId;
    }


}
