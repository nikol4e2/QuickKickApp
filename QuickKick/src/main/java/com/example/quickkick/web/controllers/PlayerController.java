package com.example.quickkick.web.controllers;


import com.example.quickkick.web.model.Player;
import com.example.quickkick.web.model.dto.PlayerDto;
import com.example.quickkick.web.model.dto.PlayerEditDto;
import com.example.quickkick.web.service.PlayerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/players")
@CrossOrigin(origins = "http://localhost:3000")
public class PlayerController {


    private final PlayerService playerService;

    public PlayerController(PlayerService playerService) {
        this.playerService = playerService;
    }

    @GetMapping("/top-players")
    public List<Player> getTop10Players(){
        return playerService.getTop10PlayersByGoals();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Player> getPlayer(@PathVariable Long id)
    {
        Player player=this.playerService.getPlayerById(id);
        if(player!= null)
        {
            return ResponseEntity.ok(this.playerService.getPlayerById(id));
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping
    public List<Player> getAllPlayers()
    {
        return this.playerService.getAllPlayers();

    }



    @PostMapping
    public ResponseEntity<Player> addPlayer(@RequestBody PlayerDto playerDto)
    {
        return ResponseEntity.ok(this.playerService.addPlayer(playerDto.getFirstName(), playerDto.getLastName(), playerDto.getTeamId()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Player> deletePlayer(@PathVariable Long id)
    {
        playerService.deletePlayer(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/add-goal")
    public ResponseEntity<Player> addGoalToPlayer(@PathVariable Long id, @RequestBody int goals)
    {
        playerService.addGoalToPlayer(id,goals);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Player> editPlayer(@PathVariable Long id, @RequestBody PlayerEditDto playerEditDto)
    {

        Player player=this.playerService.getPlayerById(id);
        player.setFirstName(playerEditDto.getFirstName());
        player.setSecondName(playerEditDto.getSecondName());
        player.setGoals(playerEditDto.getGoals());
        return ResponseEntity.ok(this.playerService.updatePlayer(player));
    }


}
