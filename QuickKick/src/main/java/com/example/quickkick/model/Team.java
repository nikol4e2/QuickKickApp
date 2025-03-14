package com.example.quickkick.model;

import com.fasterxml.jackson.databind.deser.DataFormatReaders;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@Entity
@Table(name = "teams")
public class Team {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String name;

    @OneToMany(mappedBy = "team", cascade = CascadeType.ALL, orphanRemoval = true)
    List<Player> players;






    private int wins;
    private int losses;
    private int draws;
    private int points;
    private int scoredGoals;
    private int takenGoals;


    public Team(String name) {
        this.name = name;
        this.players = new ArrayList<Player>();



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
