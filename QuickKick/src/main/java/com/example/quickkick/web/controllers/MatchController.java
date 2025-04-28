package com.example.quickkick.web.controllers;

import com.example.quickkick.web.model.Match;
import java.util.List;
import java.util.Optional;

import com.example.quickkick.web.model.Team;
import com.example.quickkick.web.model.dto.FinishMatchRequest;
import com.example.quickkick.web.model.dto.MatchDTO;
import com.example.quickkick.web.model.enums.MatchStatus;
import com.example.quickkick.web.service.MatchService;
import com.example.quickkick.web.service.TeamService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/matches")
@CrossOrigin(origins = "http://localhost:3000")
public class MatchController {


    private final MatchService matchService;
    private final TeamService teamService;


    public MatchController(MatchService matchService, TeamService teamService) {
        this.matchService = matchService;
        this.teamService = teamService;
    }

    @GetMapping
    public ResponseEntity<List<Match>> getAllMatches() {
        return ResponseEntity.ok(matchService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Match> getMatchById(@PathVariable Long id) {
       Optional<Match> match = matchService.getMatchById(id);
       return match.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Match> createMatch(@RequestBody MatchDTO matchDTO) {
        Optional<Team> team1=this.teamService.findById(matchDTO.getTeam1());
        Optional<Team> team2=this.teamService.findById(matchDTO.getTeam2());
        if(!team1.isPresent() || !team2.isPresent())
        {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(this.matchService.saveMatch(matchDTO.getDate(),team1.get(),team2.get()));

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Match> deleteMatch(@PathVariable Long id)
    {
        this.matchService.deleteMatchById(id);
        return ResponseEntity.noContent().build();
    }



    @PostMapping("/{id}/finish")
    public ResponseEntity<Match> finishMatch(@PathVariable Long id, @RequestBody FinishMatchRequest finishMatchRequest)
    {
        this.matchService.finishMatch(id,finishMatchRequest.getGoalsTeam1(), finishMatchRequest.getGoalsTeam2(), finishMatchRequest.getIsGroupPhase());
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/status")
    public ResponseEntity<List<Match>> getAllByStatus(@RequestParam MatchStatus status) {
        List<Match> matches=this.matchService.findAllByStatus(status);
        return ResponseEntity.ok(matches);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Match> editMatch(@PathVariable Long id,@RequestBody MatchDTO matchDTO)
    {
        Optional<Team> team1=this.teamService.findById(matchDTO.getTeam1());
        Optional<Team> team2=this.teamService.findById(matchDTO.getTeam2());
        if(team1.isPresent() || team2.isPresent()) {
            Match match = this.matchService.editMatch(id, matchDTO.getDate(), team1.get(), team2.get());
            return ResponseEntity.ok(match);
        }
        return ResponseEntity.notFound().build();
    }



}
