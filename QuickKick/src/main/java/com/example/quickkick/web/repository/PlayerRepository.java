package com.example.quickkick.web.repository;


import com.example.quickkick.web.model.Player;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PlayerRepository extends JpaRepository<Player,Long> {
    Optional<Player> findByFirstName(String username);
    List<Player> findByTeamId(Long teamId);


}
