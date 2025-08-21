package com.example.quickkick.web.controllers;


import com.example.quickkick.web.model.Match;
import com.example.quickkick.web.model.Player;
import com.example.quickkick.web.model.Team;
import com.example.quickkick.web.model.dto.TeamDto;
import com.example.quickkick.web.model.enums.TeamGroup;
import com.example.quickkick.web.repository.MatchRepository;
import com.example.quickkick.web.repository.TeamRepository;
import com.example.quickkick.web.service.MatchService;
import com.example.quickkick.web.service.PlayerService;
import com.example.quickkick.web.service.TeamService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/teams")
@CrossOrigin(origins = "http://localhost:3000")
public class TeamController {

    private final TeamService teamService;
    private final PlayerService playerService;
    private final TeamRepository teamRepository;
    private final MatchService matchService;
    public TeamController(TeamService teamService, PlayerService playerService, TeamRepository teamRepository, MatchService matchService) {
        this.teamService = teamService;
        this.playerService = playerService;
        this.teamRepository = teamRepository;
        this.matchService = matchService;

    }

    @GetMapping
    public ResponseEntity<List<Team>> getAllTeams() {
        return ResponseEntity.ok(teamService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Team> getTeam(@PathVariable Long id) {
        Optional<Team> team = teamService.findById(id);
        return team.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/group")
    public List<Team> getTeamsByGroup(@RequestParam String group) {
        return switch (group) {
            case "a" -> this.teamService.findAllByGroup(TeamGroup.A);
            case "b" -> this.teamService.findAllByGroup(TeamGroup.B);
            case "c" -> this.teamService.findAllByGroup(TeamGroup.C);
            case "d" -> this.teamService.findAllByGroup(TeamGroup.D);
            case "e" -> this.teamService.findAllByGroup(TeamGroup.E);
            case "f" -> this.teamService.findAllByGroup(TeamGroup.F);
            default -> null;
        };
    }


    @PostMapping
    public ResponseEntity<Team> createTeam(@RequestBody TeamDto teamDto) {
        return ResponseEntity.ok(teamService.save(teamDto.getTeamName(),teamDto.getTeamGroup()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Team> deleteTeam(@PathVariable Long id) {
        teamService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Team> updateTeam(@PathVariable Long id, @RequestBody Team updatedTeam) {
        return teamRepository.findById(id)
                .map(existingTeam->{
                    existingTeam.setName(updatedTeam.getName());
                    existingTeam.setTeamGroup(existingTeam.getTeamGroup());
                    existingTeam.setWins(updatedTeam.getWins());
                    existingTeam.setLosses(updatedTeam.getLosses());
                    existingTeam.setDraws(updatedTeam.getDraws());
                    existingTeam.setPoints(updatedTeam.getPoints());
                    existingTeam.setScoredGoals(updatedTeam.getScoredGoals());
                    existingTeam.setTakenGoals(updatedTeam.getTakenGoals());

                    teamRepository.save(existingTeam);
                    return ResponseEntity.ok(existingTeam);
                })
                .orElseGet(()->ResponseEntity.notFound().build());
    }





    @DeleteMapping("/{teamId}/players/{playerId}")
    public ResponseEntity<Void> removePlayerFromTeam(@PathVariable Long teamId, @PathVariable Long playerId) {
        Player player=this.playerService.getPlayerById(playerId);
        teamService.removePlayerFromTeam(teamId, player);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{teamId}/players")
    public ResponseEntity<List<Player>> getAllPlayersInTeam(@PathVariable Long teamId) {
        return ResponseEntity.ok(teamService.getAllPlayersInTeam(teamId));
    }

    @GetMapping("/{teamId}/points")
    public ResponseEntity<Integer> getPointsForTeam(@PathVariable Long teamId) {
        return ResponseEntity.ok(teamService.getPointsForTeam(teamId));
    }

    @GetMapping("/{teamId}/matches")
    public ResponseEntity<List<Match>> getMatchesForTeam(@PathVariable Long teamId) {
        List<Match> matches=this.matchService.getMatchesForTeam(teamId);
        if(matches.isEmpty())
            return ResponseEntity.noContent().build();
        return ResponseEntity.ok(matches);
    }




 /*   @PostMapping("/{teamId}/finished-matches")
    public ResponseEntity<Void> addFinishedMatch(@PathVariable Long teamId, @RequestBody Match match) {
        teamService.addFinshedMatchToTeam(teamId, match);
        return ResponseEntity.ok().build();
    }

  */

}
