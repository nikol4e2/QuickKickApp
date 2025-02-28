package com.example.quickkick.model;


import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@Table(name = "players")
public class Player {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String firstName;
    private String secondName;
    private int goals;
    @ManyToOne
    @JoinColumn(name = "team_id")
    private Team team;



    public Player( String firstName, String secondName, Team team) {
        this.firstName = firstName;
        this.secondName = secondName;
        this.team = team;
        this.goals = 0;
    }
}
