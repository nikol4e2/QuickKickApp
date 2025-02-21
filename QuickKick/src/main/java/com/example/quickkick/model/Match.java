package com.example.quickkick.model;

import com.example.quickkick.model.enums.MatchStatus;
import lombok.Data;

import javax.naming.ldap.PagedResultsControl;
import java.util.Date;

@Data
public class Match {

    private Long id;
    private Date date;
    private MatchStatus status;
    private Team team1;
    private Team team2;
    private int goalsTeam1;
    private int goalsTeam2;

    public Match(Date date, Team team1, Team team2) {
        this.date = date;
        this.team1 = team1;
        this.team2 = team2;
        this.goalsTeam1 = 0;
        this.goalsTeam2 = 0;
        this.status=MatchStatus.SCHEDULED;
    }
}
