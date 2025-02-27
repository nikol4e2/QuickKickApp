package com.example.quickkick.service.impl;

import com.example.quickkick.model.Match;
import com.example.quickkick.model.Player;
import com.example.quickkick.model.Team;
import com.example.quickkick.repository.TeamRepository;
import com.example.quickkick.service.TeamService;
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
    public void delete(String name) {
        if(this.findByName(name).isPresent()) {
            this.teamRepository.delete(this.findByName(name).get());
        }
    }

    @Override
    public void addPlayerToTeam(String teamName, Player player) {
        if(this.findByName(teamName).isPresent() && player != null) {
            Team team = this.findByName(teamName).get();
            List<Player> players=team.getPlayers();
            players.add(player);
            team.setPlayers(players);
            this.teamRepository.save(team);
        }else
            throw new IllegalArgumentException("Team does not exist");
    }

    @Override
    public void removePlayerFromTeam(String teamName, Player player) {

        Optional<Team> optionalTeam = this.findByName(teamName);
        if (optionalTeam.isPresent() && player != null) {
            Team team = optionalTeam.get();

            team.getPlayers().removeIf(p -> p.getId().equals(player.getId()));

            this.teamRepository.save(team);
        }
    }

    @Override
    public List<Player> getAllPlayersInTeam(String teamName) {
        Optional<Team> optionalTeam = this.findByName(teamName);

        return optionalTeam.map(Team::getPlayers).orElse(Collections.emptyList());
    }



    @Override
    public int getPointsForTeam(String teamName) {
        Optional<Team> optionalTeam = this.findByName(teamName);

        if(optionalTeam.isPresent()) {
            optionalTeam.get().calculatePoints();
            return optionalTeam.get().getPoints();
        }
        return 0;
    }

    @Override
    public void addUpcomingMatchToTeam(String teamName, Match match) {
        Optional<Team> optionalTeam = this.findByName(teamName);
        if(optionalTeam.isPresent()) {
            optionalTeam.get().getUpcomingMatches().add(match);
            this.teamRepository.save(optionalTeam.get());
        }
    }

    @Override
    public void addFinshedMatchToTeam(String teamName, Match match) {
        Optional<Team> optionalTeam = this.findByName(teamName);
        if(optionalTeam.isPresent()) {
            optionalTeam.get().getPlayedMatches().add(match);
            optionalTeam.get().calculatePoints();
            this.teamRepository.save(optionalTeam.get());
        }
    }
}
