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

    @DeleteMapping("/{id}")
    public ResponseEntity<Team> deleteTeam(@PathVariable Long id) {
        teamService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{teamId}/players")
    public ResponseEntity<Team> addPlayerToTeam(@PathVariable Long teamId, @RequestBody Player player) {
        teamService.addPlayerToTeam(teamId, player);
        return ResponseEntity.ok().build();
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



 /*   @PostMapping("/{teamId}/finished-matches")
    public ResponseEntity<Void> addFinishedMatch(@PathVariable Long teamId, @RequestBody Match match) {
        teamService.addFinshedMatchToTeam(teamId, match);
        return ResponseEntity.ok().build();
    }

  */

}
