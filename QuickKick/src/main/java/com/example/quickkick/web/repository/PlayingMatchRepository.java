package com.example.quickkick.web.repository;


import com.example.quickkick.web.model.PlayingMatch;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlayingMatchRepository extends JpaRepository<PlayingMatch, Long> {
}
