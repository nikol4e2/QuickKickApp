package com.example.quickkick.web.controllers;


import com.example.quickkick.web.model.Player;
import com.example.quickkick.web.model.Team;
import com.example.quickkick.web.model.dto.TeamDto;
import com.example.quickkick.web.model.enums.TeamGroup;
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

    public TeamController(TeamService teamService, PlayerService playerService) {
        this.teamService = teamService;
        this.playerService = playerService;
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
