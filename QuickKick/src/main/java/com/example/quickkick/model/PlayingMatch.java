package com.example.quickkick.model;

import lombok.Data;

@Data
public class PlayingMatch {

    private Long id;
    private Match match;
    private int minutesForHalfTime;
    private int timer;
    private int pauseTime;
    private int halfTimeCounter;
    private int timeoutTime;
    private int goalsTeam1;
    private int goalsTeam2;
    private int faulsTeam1;
    private int faulsTeam2;


    public PlayingMatch(Match match, int minutesForHalfTime, int pauseTime, int timeoutTime) {
        this.match = match;
        this.minutesForHalfTime = minutesForHalfTime;
        this.pauseTime = pauseTime;
        this.timeoutTime = timeoutTime;
        this.timer=0;
        this.goalsTeam1 = 0;
        this.goalsTeam2 = 0;
        this.faulsTeam1 = 0;
        this.faulsTeam2 = 0;
        this.halfTimeCounter = 1;
    }
}
