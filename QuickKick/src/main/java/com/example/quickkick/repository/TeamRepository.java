package com.example.quickkick.repository;

import com.example.quickkick.model.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TeamRepository extends JpaRepository<Team,Long> {

    Optional<Team> findByName(String name);

}