package com.example.quickkick.web.service.impl;

import com.example.quickkick.web.model.Player;
import com.example.quickkick.web.model.Team;
import com.example.quickkick.web.model.exceptions.PlayerNotFoundException;
import com.example.quickkick.web.model.exceptions.TeamNotFoundException;
import com.example.quickkick.web.repository.PlayerRepository;
import com.example.quickkick.web.service.PlayerService;
import com.example.quickkick.web.service.TeamService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PlayerServiceImpl implements PlayerService {

    private final PlayerRepository playerRepository;
    private final TeamService teamService;


    public PlayerServiceImpl(PlayerRepository playerRepository, TeamService teamService) {
        this.playerRepository = playerRepository;
        this.teamService = teamService;
    }

    @Override
    public Player getPlayerById(Long id) {
        return playerRepository.findById(id).orElseThrow(PlayerNotFoundException::new);
    }

    @Override
    public Player addPlayer(String firstName, String lastName,Long teamId) {
        Team team = teamService.findById(teamId).orElseThrow(TeamNotFoundException::new);

        Player player=new Player(firstName,lastName,team);
        teamService.addPlayerToTeam(teamId,player);
        return playerRepository.save(player);
    }

    @Override
    public void deletePlayer(Long playerId) {
        this.playerRepository.deleteById(playerId);

    }

    @Override
    public void addGoalToPlayer(Long playerId, int goal) {
        Player player=this.playerRepository.findById(playerId).orElseThrow(PlayerNotFoundException::new);
        player.setGoals(player.getGoals() + goal);
        playerRepository.save(player);

    }

    @Override
    public List<Player> getAllPlayers() {
        return playerRepository.findAll();
    }

    @Override
    public Player updatePlayer(Player player) {
        return this.playerRepository.save(player);
    }

    @Override
    public List<Player> getTop10PlayersByGoals() {
        return playerRepository.findAll().stream()
                .sorted((p1,p2) -> Integer.compare(p2.getGoals(),p1.getGoals())).limit(10).collect(Collectors.toList());
    }
}
