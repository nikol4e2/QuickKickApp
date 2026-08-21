package com.example.quickkick.web.service;

import com.example.quickkick.web.model.Team;
import com.example.quickkick.web.model.enums.TeamGroup;

import java.util.List;

public interface RankingService {

    List<Team> getAllTeamsSortedByGroup(TeamGroup teamGroup);
}
