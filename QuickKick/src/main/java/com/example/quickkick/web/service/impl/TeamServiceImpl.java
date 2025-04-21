package com.example.quickkick.web.service.impl;

import com.example.quickkick.web.model.Player;
import com.example.quickkick.web.model.Team;
import com.example.quickkick.web.repository.TeamRepository;
import com.example.quickkick.web.service.TeamService;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class TeamServiceImpl implements TeamService {

    private final TeamRepository teamRepository;

    public TeamServiceImpl(TeamRepository teamRepository) {
        this.teamRepository = teamRepository;
    }

    @Override
    public Optional<Team> findById(long id) {
        return teamRepository.findById(id);
    }

    @Override
    public List<Team> findAll() {
        return teamRepository.findAll();
    }

    @Override
    public Optional<Team> findByName(String name) {
        return this.teamRepository.findByName(name);
    }

    @Override
    public Team save(String name) {
        if(name == null || name.isEmpty()) {
            throw new IllegalArgumentException("Name cannot be null or empty");
        }
        Team team = new Team(name);
        return this.teamRepository.save(team);
    }

    @Override
    public void delete(Long teamId) {
        if(this.findById(teamId).isPresent()) {
            this.teamRepository.delete(this.findById(teamId).get());
        }
    }

    @Override
    public void addPlayerToTeam(Long teamId, Player player) {
        if(this.findById(teamId).isPresent() && player != null) {
            Team team = this.findById(teamId).get();
            List<Player> players=team.getPlayers();
            players.add(player);
            team.setPlayers(players);
            this.teamRepository.save(team);
        }else
            throw new IllegalArgumentException("Team does not exist");
    }

    @Override
    public void removePlayerFromTeam(Long teamId, Player player) {

        Optional<Team> optionalTeam = this.findById(teamId);
        if (optionalTeam.isPresent() && player != null) {
            Team team = optionalTeam.get();

            team.getPlayers().removeIf(p -> p.getId().equals(player.getId()));

            this.teamRepository.save(team);
        }
    }

    @Override
    public List<Player> getAllPlayersInTeam(Long teamId) {
        Optional<Team> optionalTeam = this.findById(teamId);

        return optionalTeam.map(Team::getPlayers).orElse(Collections.emptyList());
    }



    @Override
    public int getPointsForTeam(Long teamId) {
        Optional<Team> optionalTeam = this.findById(teamId);

        if(optionalTeam.isPresent()) {
            optionalTeam.get().calculatePoints();
            return optionalTeam.get().getPoints();
        }
        return 0;
    }


/*
    @Override
    public void addFinshedMatchToTeam(Long teamId, Match match) {
        Optional<Team> optionalTeam = this.findById(teamId);
        if(optionalTeam.isPresent()) {
            optionalTeam.get().getPlayedMatches().add(match);
            optionalTeam.get().calculatePoints();
            this.teamRepository.save(optionalTeam.get());
        }
    }

 */
}
