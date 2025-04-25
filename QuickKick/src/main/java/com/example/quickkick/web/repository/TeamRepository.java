package com.example.quickkick.web.repository;

import com.example.quickkick.web.model.Team;
import com.example.quickkick.web.model.enums.TeamGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TeamRepository extends JpaRepository<Team,Long> {

    Optional<Team> findByName(String name);
    List<Team> findAllByTeamGroup(TeamGroup teamGroup);

}