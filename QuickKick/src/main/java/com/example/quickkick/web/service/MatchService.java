package com.example.quickkick.web.service;

import com.example.quickkick.web.model.Match;
import com.example.quickkick.web.model.Team;
import com.example.quickkick.web.model.enums.MatchStatus;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface MatchService {

    Optional<Match> getMatchById(Long matchId);
    Match saveMatch(LocalDateTime date, Team team1, Team team2);
    void deleteMatchById(Long matchId);
    Match editMatch(Long matchId, LocalDateTime date, Team team1, Team team2);
    void finishMatch(Long matchId,int team1Goals,int team2Goals,Boolean isGroupPhase);
    List<Match> findAll();
    List<Match> findAllByStatus(MatchStatus status);
    void changeMatchStatus(Long matchId, MatchStatus status);
    //TODO Implement getting matches by Team
    List<Match> getLastFinishedMatches();
    List<Match> getNextThreeMatches();
    List<Match> getMatchesForTeam(Long teamId);


}
