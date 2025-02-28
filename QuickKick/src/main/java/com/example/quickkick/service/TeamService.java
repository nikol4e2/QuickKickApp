package com.example.quickkick.service;

import com.example.quickkick.model.Match;
import com.example.quickkick.model.Player;
import com.example.quickkick.model.Team;

import java.util.List;
import java.util.Optional;

public interface TeamService {

    List<Team> findAll();

    Optional<Team> findById(long id);

    Optional<Team> findByName(String name);

    Team save(String name);
    void delete(Long teamId);


    void addPlayerToTeam(Long teamId, Player player);
    void removePlayerFromTeam(Long teamId, Player player);
    List<Player> getAllPlayersInTeam(Long teamId);


    int getPointsForTeam(Long id);

    //void addFinshedMatchToTeam(Long teamID, Match match);
}
