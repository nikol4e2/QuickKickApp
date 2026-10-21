package com.example.quickkick.web.service.impl;

import com.example.quickkick.web.model.Team;
import com.example.quickkick.web.model.enums.TeamGroup;
import com.example.quickkick.web.repository.TeamRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
@DisplayName("TeamService Unit Tests")
class TeamServiceImplTest {

    private Team testTeam;
    private String testTeamName;
    private TeamGroup testTeamGroup;


    @BeforeEach
    void setUp() {

        this.testTeamGroup = TeamGroup.A;
        this.testTeamName="test";
        this.testTeam = new Team(testTeamName,testTeamGroup);
    }

    @InjectMocks
    private TeamServiceImpl teamService; //this is what we want to test

    @Mock
    private TeamRepository teamRepository;

    @Test
    @DisplayName("Create team test method")
    void createTeam() {

    }

    @Nested
    @DisplayName("Create Team Tests")
    class CreateTeamTests{

        @Test
        @DisplayName("Should create team successfully when valid request exists")
        void saveTeamSuccessfully() {
            //Given
            final String name="test";
            final String group="A";

            when(teamRepository.save(any(Team.class))).thenAnswer(invocation -> invocation.getArgument(0));

            //When
            final Team team=teamService.save(name,group);


            //Then
            assertNotNull(team);

        }

    }

}