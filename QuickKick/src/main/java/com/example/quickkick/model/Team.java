package com.example.quickkick.model;

import com.fasterxml.jackson.databind.deser.DataFormatReaders;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class Team {

    private String name;
    List<Player> players;
    List<Match> playedMatches;
    List<Match> upcomingMatches;

    private int wins;
    private int losses;
    private int draws;
    private int points;
    private int scoredGoals;
    private int takenGoals;


    public Team(String name) {
        this.name = name;
        this.players = new ArrayList<Player>();
        this.playedMatches = new ArrayList<Match>();
        this.upcomingMatches = new ArrayList<Match>();

        this.wins = 0;
        this.losses = 0;
        this.draws = 0;
        this.points = 0;
        this.scoredGoals = 0;
        this.takenGoals = 0;

    }


    //TODO Implement
    public void calculatePoints() {}
}
