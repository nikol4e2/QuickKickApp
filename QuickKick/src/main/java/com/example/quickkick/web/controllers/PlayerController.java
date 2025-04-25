package com.example.quickkick.web.controllers;


import com.example.quickkick.web.model.Player;
import com.example.quickkick.web.model.dto.PlayerDto;
import com.example.quickkick.web.service.PlayerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/players")
@CrossOrigin(origins = "http://localhost:3000")
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
}
