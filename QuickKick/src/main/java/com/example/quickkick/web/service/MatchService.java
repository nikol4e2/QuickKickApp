package com.example.quickkick.web.service;

import com.example.quickkick.web.model.Match;
import com.example.quickkick.web.model.Team;
import com.example.quickkick.web.model.enums.MatchStatus;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface MatchService {

    Optional<Match> getMatchById(Long matchId);
    Match saveMatch(Date date, Team team1, Team team2);
    void delteMatchById(Long matchId);
    Match editMatch(Long matchId, Date date, Team team1, Team team2);
    void finishMatch(Long matchId,int team1Goals,int team2Goals,Boolean isGroupPhase);
    List<Match> findAll();
    List<Match> findAllByStatus(MatchStatus status);
    void changeMatchStatus(Long matchId, MatchStatus status);

}
