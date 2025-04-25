package com.example.quickkick.web.model.dto;

import lombok.Data;

@Data
public class TeamDto {
    private String teamName;
    private String teamGroup;

    public TeamDto(String teamName, String teamGroup) {
        this.teamName = teamName;
        this.teamGroup = teamGroup;
    }
}
