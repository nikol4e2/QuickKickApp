package com.example.quickkick.web.repository;

import com.example.quickkick.web.model.Match;
import com.example.quickkick.web.model.Team;
import com.example.quickkick.web.model.enums.MatchStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface MatchRepository extends JpaRepository<Match,Long> {

    Optional<Match> findByTeam1AndTeam2(Team team1, Team team2);
    List<Match> findAllByDate(LocalDateTime date);
    List<Match> findAllByStatus(MatchStatus status);
    List<Match> findTop3ByStatusOrderByDateDesc(MatchStatus status);

}
