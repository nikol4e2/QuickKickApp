package com.example.quickkick.repository;

import com.example.quickkick.model.Match;
import com.example.quickkick.model.Team;
import com.example.quickkick.model.enums.MatchStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface MatchRepository extends JpaRepository<Match,Long> {

    Optional<Match> findByTeam1AndTeam2(Team team1, Team team2);
    List<Match> findAllByDate(Date date);
    List<Match> findAllByStatus(MatchStatus status);

}
