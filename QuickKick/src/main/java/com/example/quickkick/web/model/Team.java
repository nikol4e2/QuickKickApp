package com.example.quickkick.web.model;

import com.example.quickkick.web.model.enums.TeamGroup;
import com.fasterxml.jackson.annotation.JsonIgnore;
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
    @JsonIgnore
    List<Player> players;

    @Enumerated(EnumType.STRING)
    private TeamGroup teamGroup;





    private int wins;
    private int losses;
    private int draws;
    private int points;
    private int scoredGoals;
    private int takenGoals;


    public Team(String name,TeamGroup teamGroup) {
        this.name = name;
        this.players = new ArrayList<Player>();



        this.wins = 0;
        this.losses = 0;
        this.draws = 0;
        this.points = 0;
        this.scoredGoals = 0;
        this.takenGoals = 0;
        this.teamGroup = teamGroup;

    }



    public void calculatePoints() {
        this.points = (wins*3)+draws;
    }
}
