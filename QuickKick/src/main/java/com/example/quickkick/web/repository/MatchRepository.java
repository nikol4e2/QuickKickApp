package com.example.quickkick.web.repository;

import com.example.quickkick.web.model.Match;
import com.example.quickkick.web.model.Team;
import com.example.quickkick.web.model.enums.MatchStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
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
    List<Match> findAllByDateAfterAndStatusOrderByDateAsc(LocalDateTime date, MatchStatus status);
    List<Match> findAllByTeam1_IdOrTeam2_Id(Long team1Id, Long team2Id);

    @Query("SELECT m FROM Match m " +
            "WHERE (m.team1 = :team1 AND m.team2 = :team2) " +
            "   OR (m.team1 = :team2 AND m.team2 = :team1)")
    Optional<Match> findByTeams(@Param("team1") Team team1, @Param("team2") Team team2);


    Page<Match> findAllByStatus(MatchStatus status, Pageable pageable);
}
