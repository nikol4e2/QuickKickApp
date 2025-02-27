package com.example.quickkick.controllers;


import com.example.quickkick.model.Match;
import com.example.quickkick.model.Player;
import com.example.quickkick.model.Team;
import com.example.quickkick.service.PlayerService;
import com.example.quickkick.service.TeamService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/teams")
public class TeamController {

    private final TeamService teamService;
    private final PlayerService playerService;

    public TeamController(TeamService teamService, PlayerService playerService) {
        this.teamService = teamService;
        this.playerService = playerService;
    }

    @GetMapping
    public ResponseEntity<List<Team>> getAllTeams() {
        return ResponseEntity.ok(teamService.findAll());
    }

    @GetMapping("/{name}")
    public ResponseEntity<Team> getTeam(@PathVariable String name) {
        Optional<Team> team = teamService.findByName(name);
        return team.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Team> createTeam(@RequestBody String name) {
        return ResponseEntity.ok(teamService.save(name));
    }

    @DeleteMapping("/{name}")
    public ResponseEntity<Team> deleteTeam(@PathVariable String name) {
        teamService.delete(name);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{teamName}/players")
    public ResponseEntity<Team> addPlayerToTeam(@PathVariable String teamName, @RequestBody Player player) {
        teamService.addPlayerToTeam(teamName, player);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{teamName}/players/{playerId}")
    public ResponseEntity<Void> removePlayerFromTeam(@PathVariable String teamName, @PathVariable Long playerId) {
        Player player=this.playerService.getPlayerById(playerId);
        teamService.removePlayerFromTeam(teamName, player);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{teamName}/players")
    public ResponseEntity<List<Player>> getAllPlayersInTeam(@PathVariable String teamName) {
        return ResponseEntity.ok(teamService.getAllPlayersInTeam(teamName));
    }

    @GetMapping("/{teamName}/points")
    public ResponseEntity<Integer> getPointsForTeam(@PathVariable String teamName) {
        return ResponseEntity.ok(teamService.getPointsForTeam(teamName));
    }

    @PostMapping("/{teamName}/upcoming-matches")
    public ResponseEntity<Void> addUpcomingMatch(@PathVariable String teamName, @RequestBody Match match) {
        teamService.addUpcomingMatchToTeam(teamName, match);
        return ResponseEntity.ok().build();
    }


    @PostMapping("/{teamName}/finished-matches")
    public ResponseEntity<Void> addFinishedMatch(@PathVariable String teamName, @RequestBody Match match) {
        teamService.addFinshedMatchToTeam(teamName, match);
        return ResponseEntity.ok().build();
    }

}
