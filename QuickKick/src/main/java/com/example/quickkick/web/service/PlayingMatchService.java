package com.example.quickkick.web.service;

import com.example.quickkick.web.model.PlayingMatch;
import com.example.quickkick.web.model.enums.TimeoutType;

import java.util.List;
import java.util.Optional;

public interface PlayingMatchService {

    Optional<PlayingMatch> getPlayingMatch(Long matchId);
    List<PlayingMatch> findAll();
    PlayingMatch createPlayingMatch(Long matchId, int minutesForHalfTime, int pauseTime, int timeoutTime);
    PlayingMatch startPlayingMatch(Long playingMatchId);
    void adjustTimerForPlayingMatch(Long playingMatchId, int minutes);
    void addMinutesToPlayingMatch(Long playingMatchId, int minutes);
    void subtractMinutesFromPlayingMatch(Long playingMatchId, int minutes);
    void addGoalToTeam(Long playingMatchId, int teamNumber);
    void removeGoalFromTeam(Long playingMatchId, int teamNumber);
    void addFaulToTeam(Long playingMatchId, int teamNumber);
    void removeFaulFromTeam(Long playingMatchId, int teamNumber);
    void signalHalfTime(Long playingMatchId);
    void signalTimeout(Long playingMatchId, TimeoutType timeoutType);
    void signalPlayingAgain(Long playingMatchId);
    void finishPlayingMatch(Long playingMatchId);


    void deletePlayingMatch(Long playingMatchId);




}
