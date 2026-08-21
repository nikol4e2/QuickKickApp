package com.example.quickkick.web.service.impl;

import com.example.quickkick.web.model.Match;
import com.example.quickkick.web.model.Team;
import com.example.quickkick.web.model.enums.MatchStatus;
import com.example.quickkick.web.model.enums.TeamGroup;
import com.example.quickkick.web.repository.MatchRepository;
import com.example.quickkick.web.repository.PlayerRepository;
import com.example.quickkick.web.repository.TeamRepository;
import com.example.quickkick.web.service.MatchService;
import com.example.quickkick.web.service.RankingService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RankingServiceImpl  implements RankingService {

    private final TeamRepository teamRepository;
    private final MatchRepository matchRepository;


    public RankingServiceImpl(TeamRepository teamRepository, MatchRepository matchRepository) {
        this.teamRepository = teamRepository;
        this.matchRepository = matchRepository;
    }

    @Override
    public List<Team> getAllTeamsSortedByGroup(TeamGroup teamGroup) {
        List<Team> teams= this.teamRepository.findAllByTeamGroup(teamGroup);

        return teams.stream()
                .sorted((t1,t2)->{
                    if (t1.getPoints()!=(t2.getPoints())){
                        return t2.getPoints() - t1.getPoints();
                    }

                    Optional<Match> directMatch = matchRepository.findByTeams(t1, t2);

                    if(directMatch.isPresent() && directMatch.get().getStatus()== MatchStatus.FINISHED){
                        int goals1 = directMatch.get().getGoalsForTeam(t1.getId());
                        int goals2 = directMatch.get().getGoalsForTeam(t2.getId());
                        if (goals1 != goals2) {
                            return goals2 - goals1; // победникот е погоре
                        }
                    }

                    int goalDiff1= t1.getScoredGoals()-t1.getTakenGoals();
                    int goalDiff2= t2.getScoredGoals()-t2.getTakenGoals();
                    if(goalDiff1!=goalDiff2){
                        return goalDiff2 - goalDiff1;
                    }

                    return t2.getScoredGoals()- t1.getScoredGoals();




                }).toList();
    }
}
