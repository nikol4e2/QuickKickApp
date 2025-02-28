package com.example.quickkick.service;

import com.example.quickkick.model.Player;

public interface PlayerService {

    Player getPlayerById(Long id);
    Player addPlayer(String firstName, String lastName,Long teamId);
    void deletePlayer(Long playerId);
    void addGoalToPlayer(Long playerId, int goal);
}
