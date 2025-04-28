package com.example.quickkick.web.service;

import com.example.quickkick.web.model.Player;

import java.util.List;

public interface PlayerService {

    Player getPlayerById(Long id);
    Player addPlayer(String firstName, String lastName,Long teamId);
    void deletePlayer(Long playerId);
    void addGoalToPlayer(Long playerId, int goal);
    List<Player> getAllPlayers();
    Player updatePlayer(Player player);
    List<Player> getTop10PlayersByGoals();
}
