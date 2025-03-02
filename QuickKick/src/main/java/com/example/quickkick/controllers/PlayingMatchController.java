package com.example.quickkick.controllers;

import com.example.quickkick.model.PlayingMatch;
import com.example.quickkick.model.dto.PlayingMatchCreateRequestDto;
import com.example.quickkick.service.PlayingMatchService;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/playing-matches")
public class PlayingMatchController {

    private final PlayingMatchService playingMatchService;


    public PlayingMatchController(PlayingMatchService playingMatchService) {
        this.playingMatchService = playingMatchService;
    }


    @GetMapping
    public ResponseEntity<List<PlayingMatch>> getAllPlayingMatches()
    {
        return ResponseEntity.ok(playingMatchService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PlayingMatch> getPlayingMatch(@PathVariable Long id)
    {
        if(this.playingMatchService.getPlayingMatch(id).isPresent())
        {
            return ResponseEntity.ok(this.playingMatchService.getPlayingMatch(id).get());
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<PlayingMatch> createPlayingMatch(@RequestBody @Validated PlayingMatchCreateRequestDto request)
    {
        PlayingMatch playingMatch=this.playingMatchService.createPlayingMatch(request.getMatchId(), request.getMinutesForHalfTime(), request.getPauseTime(), request.getTimeoutTime());
        return ResponseEntity.ok(playingMatch);
    }


    @PostMapping("/{id}/start")
    public ResponseEntity<PlayingMatch> startMatch(@PathVariable Long id)
    {
        PlayingMatch playingMatch=playingMatchService.startPlayingMatch(id);
        return ResponseEntity.ok(playingMatch);
    }

    @PostMapping("/{id}/adjustTime")
    public ResponseEntity<PlayingMatch> adjustTime(@PathVariable Long id, @RequestBody int minutes)
    {
        this.playingMatchService.adjustTimerForPlayingMatch(id, minutes);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{id}/addMinutes")
    public ResponseEntity<PlayingMatch> addMinutes(@PathVariable Long id,@RequestBody int minutes){
        this.playingMatchService.addMinutesToPlayingMatch(id,minutes);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{id}/subMinutes")
    public ResponseEntity<PlayingMatch> subMinutes(@PathVariable Long id,@RequestBody int minutes)
    {
        this.playingMatchService.subtractMinutesFromPlayingMatch(id,minutes);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{id}/addGoal/{team}")
    public ResponseEntity<PlayingMatch> addGoal(@PathVariable Long id,@PathVariable int team)
    {
        this.playingMatchService.addGoalToTeam(id,team);
        return ResponseEntity.ok().build();

    }

    @PostMapping("/{id}/addFaul/{team}")
    public ResponseEntity<PlayingMatch> addFaul(@PathVariable Long id,@PathVariable int team)
    {
        this.playingMatchService.addFaulToTeam(id,team);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{id}/removeGoal/{team}")
    public ResponseEntity<PlayingMatch> removeGoal(@PathVariable Long id,@PathVariable int team)
    {
        this.playingMatchService.removeGoalFromTeam(id,team);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{id}/removeFaul/{team}")
    public ResponseEntity<PlayingMatch> removeFaul(@PathVariable Long id,@PathVariable int team){
        this.playingMatchService.removeFaulFromTeam(id,team);
        return ResponseEntity.ok().build();
    }


}
