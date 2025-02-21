package com.example.quickkick.service;

import com.example.quickkick.model.Player;

public interface PlayerService {

    Player getPlayerById(Long id);
    Player addPlayer(String firstName, String lastName,String teamName);
    void deletePlayer(Long playerId);
    void addGoalToPlayer(Long playerId, int goal);
}
