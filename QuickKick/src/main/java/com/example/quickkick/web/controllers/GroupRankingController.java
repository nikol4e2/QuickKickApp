package com.example.quickkick.web.controllers;

import com.example.quickkick.web.model.Team;
import com.example.quickkick.web.model.enums.TeamGroup;
import com.example.quickkick.web.service.RankingService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/group")
@CrossOrigin(origins = "http://localhost:3000")
public class GroupRankingController {

    private final RankingService rankingService;

    public GroupRankingController(RankingService rankingService) {
        this.rankingService = rankingService;
    }


    @GetMapping("/{group}")
    public List<Team> getTeamsRankedByGroup(@PathVariable String group) {
        return this.rankingService.getAllTeamsSortedByGroup(TeamGroup.valueOf(group));
    }

}
