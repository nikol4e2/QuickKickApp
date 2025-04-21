package com.example.quickkick.web.model;

import com.example.quickkick.web.model.enums.PlayingMatchStatus;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name = "playing_matches")
public class PlayingMatch {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "match_id", nullable = false)
    private Match match;

    private int minutesForHalfTime;
    private int timer;
    private int pauseTime; // vremeto za pauza za poluvreme
    private int halfTimeCounter;
    private int timeoutTime; // vremeto za poluvreme
    private int goalsTeam1;
    private int goalsTeam2;
    private int faulsTeam1;
    private int faulsTeam2;
    @Enumerated(EnumType.STRING)
    private PlayingMatchStatus status;


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
        this.status=PlayingMatchStatus.WAITING_TO_START;
    }
}
