package com.example.quickkick.service;

import com.example.quickkick.model.Match;
import com.example.quickkick.model.Player;
import com.example.quickkick.model.Team;

import java.util.List;
import java.util.Optional;

public interface TeamService {

    List<Team> findAll();

    Optional<Team> findByName(String name);

    Team save(String name);
    void delete(String name);


    void addPlayerToTeam(String teamName, Player player);
    void removePlayerFromTeam(String teamName, Player player);
    List<Player> getAllPlayersInTeam(String teamName);


    int getPointsForTeam(String teamName);
    void addUpcomingMatchToTeam(String teamName, Match match);
    void addFinshedMatchToTeam(String teamName, Match match);
}
