package com.example.quickkick.model;


import lombok.Data;

@Data
public class Player {

    private Long id;
    private String firstName;
    private String secondName;
    private int goals;
    private Team team;


    public Player( String firstName, String secondName, Team team) {
        this.firstName = firstName;
        this.secondName = secondName;
        this.team = team;
        this.goals = 0;
    }
}
