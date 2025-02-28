package com.example.quickkick.model;

import com.example.quickkick.model.enums.MatchStatus;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.naming.ldap.PagedResultsControl;
import java.util.Date;

@Data
@NoArgsConstructor
@Entity
@Table(name = "matches")
public class Match {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Temporal(TemporalType.TIMESTAMP)
    private Date date;
    @Enumerated(EnumType.STRING)
    private MatchStatus status;

    @ManyToOne
    @JoinColumn(name = "team1_id", nullable = false)
    private Team team1;

    @ManyToOne
    @JoinColumn(name = "team2_id", nullable = false)
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
