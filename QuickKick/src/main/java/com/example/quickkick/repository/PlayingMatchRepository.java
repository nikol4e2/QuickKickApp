package com.example.quickkick.repository;


import com.example.quickkick.model.PlayingMatch;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlayingMatchRepository extends JpaRepository<PlayingMatch, Long> {
}
