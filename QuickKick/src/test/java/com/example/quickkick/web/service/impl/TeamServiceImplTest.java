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
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;


@ExtendWith(MockitoExtension.class)
@DisplayName("TeamService Unit Tests")
class TeamServiceImplTest {

    @InjectMocks
    private TeamServiceImpl teamService;

    @Mock
    private TeamRepository teamRepository;


    private String name;
    private String group;


    @BeforeEach
    void setUp() {
        name="test";
        group="A";
        
    }




    @DisplayName("Save Team Test")
    @Nested
    class SaveTeamTests {


        @Test
        @DisplayName("Should create team successfully when valid request exists")
        void saveTeamTest(){

            //Given
            final String name="test";
            final String group="A";

            when(teamRepository.save(any(Team.class))).thenAnswer(i-> i.getArgument(0));

            //When
            final Team team=teamService.save(name, group);

            //Then
            assertNotNull(team);
            assertEquals(name,team.getName());
            assertEquals(TeamGroup.A,team.getTeamGroup());

            verify(teamRepository).save(any(Team.class));

        }
    }






}