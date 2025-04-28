package com.example.quickkick.web.service.impl;

import com.example.quickkick.web.model.Match;
import com.example.quickkick.web.model.Team;
import com.example.quickkick.web.model.enums.MatchStatus;
import com.example.quickkick.web.model.exceptions.MatchNotFoundException;
import com.example.quickkick.web.model.exceptions.TeamNullException;
import com.example.quickkick.web.repository.MatchRepository;
import com.example.quickkick.web.repository.TeamRepository;
import com.example.quickkick.web.service.MatchService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class MatchServiceImpl implements MatchService {

    private final MatchRepository matchRepository;
    private final TeamRepository teamRepository;


    public MatchServiceImpl(MatchRepository matchRepository, TeamRepository teamRepository) {
        this.matchRepository = matchRepository;
        this.teamRepository = teamRepository;
    }

    @Override
    public Optional<Match> getMatchById(Long matchId) {
        return this.matchRepository.findById(matchId);
    }

    @Override
    public Match saveMatch(LocalDateTime date, Team team1, Team team2) throws TeamNullException {
        if(team1 == null || team2 == null) {
            throw new TeamNullException();
        }
        Match match = new Match(date, team1, team2);
        return this.matchRepository.save(match);
    }

    @Override
    public void deleteMatchById(Long matchId) {
        if(this.matchRepository.existsById(matchId)) {
            this.matchRepository.deleteById(matchId);
        }
    }

    @Override
    public Match editMatch(Long matchId, LocalDateTime date, Team team1, Team team2) {
        Match match = this.matchRepository.findById(matchId)
                .orElseThrow(() -> new MatchNotFoundException());

        match.setDate(date);
        match.setTeam1(team1);
        match.setTeam2(team2);
        return this.matchRepository.save(match);
    }

    @Override
    public void finishMatch(Long matchId, int team1Goals, int team2Goals, Boolean isGroupPhase) {
        Match match=this.matchRepository.findById(matchId).orElseThrow(MatchNotFoundException::new);
        match.setStatus(MatchStatus.FINISHED);
        match.setGoalsTeam1(team1Goals);
        match.setGoalsTeam2(team2Goals);
        Team team1=match.getTeam1();
        Team team2=match.getTeam2();

        if(isGroupPhase) {
            team1.setScoredGoals(team1.getScoredGoals() + team1Goals);
            team2.setScoredGoals(team2.getScoredGoals() + team2Goals);
            team1.setTakenGoals(team1.getTakenGoals() + team2Goals);
            team2.setTakenGoals(team2.getTakenGoals() + team1Goals);


            if (team1Goals > team2Goals) {
                teamRepository.findByName(team1.getName()).get().setWins(team1.getWins() + 1);
                teamRepository.findByName(team2.getName()).get().setLosses(team2.getLosses() + 1);
            } else if (team2Goals > team1Goals) {
                teamRepository.findByName(team2.getName()).get().setWins(team2.getWins() + 1);
                teamRepository.findByName(team1.getName()).get().setLosses(team1.getLosses() + 1);
            } else {
                teamRepository.findByName(team1.getName()).get().setDraws(team2.getLosses() + 1);
                teamRepository.findByName(team2.getName()).get().setDraws(team2.getLosses() + 1);
            }
            this.teamRepository.save(team1);
            this.teamRepository.save(team2);
        }
        this.matchRepository.save(match);
    }

    @Override
    public List<Match> findAll() {
        return this.matchRepository.findAll();
    }

    @Override
    public List<Match> findAllByStatus(MatchStatus status) {
        return this.matchRepository.findAllByStatus(status);
    }

    @Override
    public void changeMatchStatus(Long matchId, MatchStatus status) {
        Optional<Match> match=this.matchRepository.findById(matchId);
        if(match.isPresent()) {
            match.get().setStatus(status);
            this.matchRepository.save(match.get());
        }
    }

    @Override
    public List<Match> getLastFinishedMatches() {
        return this.matchRepository.findTop3ByStatusOrderByDateDesc(MatchStatus.FINISHED);
    }

    @Override
    public List<Match> getNextThreeMatches() {
        LocalDateTime now=LocalDateTime.now();

        return this.matchRepository.findAllByDateAfterAndStatusOrderByDateAsc(now,MatchStatus.SCHEDULED)
                .stream()
                .limit(3)
                .collect(Collectors.toList());
    }
}
