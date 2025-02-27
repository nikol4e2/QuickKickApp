package com.example.quickkick.service;

import com.example.quickkick.model.Match;
import com.example.quickkick.model.Team;
import com.example.quickkick.model.enums.MatchStatus;
import com.example.quickkick.model.exceptions.TeamNullException;

import java.util.Date;
import java.util.List;

public interface MatchService {

    Match getMatchBId(Long matchId);
    Match saveMatch(Date date, Team team1, Team team2) throws TeamNullException;
    void delteMatchById(Long matchId);
    Match editMatch(Long matchId, Date date, Team team1, Team team2);
    void finishMatch(Long matchId,int team1Goals,int team2Goals);
    List<Match> findAll();
    List<Match> findAllByStatus(MatchStatus status);

}
