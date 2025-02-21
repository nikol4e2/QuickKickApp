package com.example.quickkick.service.impl;

import com.example.quickkick.model.Player;
import com.example.quickkick.model.Team;
import com.example.quickkick.model.User;
import com.example.quickkick.model.exceptions.PlayerNotFoundException;
import com.example.quickkick.model.exceptions.TeamNotFoundException;
import com.example.quickkick.repository.PlayerRepository;
import com.example.quickkick.repository.TeamRepository;
import com.example.quickkick.service.PlayerService;
import org.springframework.stereotype.Service;

@Service
public class PlayerServiceImpl implements PlayerService {

    private final PlayerRepository playerRepository;
    private final TeamRepository teamRepository;


    public PlayerServiceImpl(PlayerRepository playerRepository, TeamRepository teamRepository) {
        this.playerRepository = playerRepository;
        this.teamRepository = teamRepository;
    }

    @Override
    public Player getPlayerById(Long id) {
        return playerRepository.findById(id).orElseThrow(PlayerNotFoundException::new);
    }

    @Override
    public Player addPlayer(String firstName, String lastName,String teamName) {
        Team team = teamRepository.findByName(teamName).orElseThrow(TeamNotFoundException::new);
        return playerRepository.save(new Player(firstName,lastName,team));
    }

    @Override
    public void deletePlayer(Long playerId) {
        this.playerRepository.deleteById(playerId);
        
    }

    @Override
    public void addGoalToPlayer(Long playerId, int goal) {
       if(playerRepository.existsById(playerId)) {
           Player player = playerRepository.findById(playerId).get();
           player.setGoals(player.getGoals() + goal);
           playerRepository.save(player);
       }
    }
}
