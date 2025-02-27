package com.example.quickkick.controllers;


import com.example.quickkick.model.Player;
import com.example.quickkick.service.PlayerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/players")
public class PlayerController {


    private final PlayerService playerService;

    public PlayerController(PlayerService playerService) {
        this.playerService = playerService;
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

    @PostMapping
    public ResponseEntity<Player> addPlayer(@RequestBody String firstName, @RequestBody String lastName,@RequestBody String teamName)
    {
        return ResponseEntity.ok(this.playerService.addPlayer(firstName,lastName,teamName));
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
}
