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
import org.springframework.security.core.parameters.P;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;


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
        name = "test";
        group = "A";

    }


    @DisplayName("Save Team Test")
    @Nested
    class SaveTeamTests {


        @Test
        @DisplayName("Should create team successfully when valid request exists")
        void saveTeamTest() {

            //Given
            final String name = "test";
            final String group = "A";

            when(teamRepository.save(any(Team.class))).thenAnswer(i -> i.getArgument(0));

            //When
            final Team team = teamService.save(name, group);

            //Then
            assertNotNull(team);
            assertEquals(name, team.getName());
            assertEquals(TeamGroup.A, team.getTeamGroup());

            verify(teamRepository).save(argThat(t->t.getName().equals(name) && t.getTeamGroup()== TeamGroup.A));

        }

        @DisplayName("Should throw exception when name is invalid")
        @Test
        void saveTeamInvalidNameTest() {

            assertThrows(IllegalArgumentException.class, () -> teamService.save("", "A"));
            verify(teamRepository,never()).save(any(Team.class));
        }

        @DisplayName("Should throw exception when name is null")
        @Test
        void saveTeamNullNameTest() {

            assertThrows(IllegalArgumentException.class, () -> teamService.save(null, "A"));

            verify(teamRepository,never()).save(any(Team.class));
        }


        @DisplayName("Should not save when group is invalid")
        @Test
        void saveTeamInvalidGroupTest() {

            String name = "Test Team";
            String group="Z";


            assertThrows(IllegalArgumentException.class, () -> teamService.save(name, group));


            verify(teamRepository,never()).save(any(Team.class));

        }





    }

    @Nested
    @DisplayName("Delete Team Tests")
    class deleteTeamTests
    {

        @DisplayName("Should Delete Team When Team Exists")
        @Test
        void testShouldDeleteTeam()
        {

            Long id=1L;
            Team team = new Team("Test Team", TeamGroup.A);

            when(teamRepository.findById(id)).thenReturn(Optional.of(team));

            teamService.delete(id);

            verify(teamRepository).deleteById(id);
        }

        @DisplayName("Should do nothing when team doesn't exist")
        @Test
        void testWhenTeamDoesNotExist()
        {
            Long id=1L;
            Team team = new Team("Test Team", TeamGroup.A);

            when(teamRepository.findById(id)).thenReturn(Optional.empty());

            teamService.delete(id);

            verify(teamRepository,never()).delete(any(Team.class));


        }

    }

    @Nested
    @DisplayName("Find Team by ID Tests")
    class findByIdTests {


        @Test
        @DisplayName("Should return team when team exists")
        void findById() {
            //Given
            Long id = 1L;
            Team expectedTeam = new Team("Test Team", TeamGroup.A);

            when(teamRepository.findById(id)).thenReturn(Optional.of(expectedTeam));

            //When
            Optional<Team> result = teamService.findById(id);


            //Then
            assertTrue(result.isPresent());
            assertEquals(expectedTeam, result.get());

            verify(teamRepository).findById(id);
        }

        @Test
        @DisplayName("Should not return team when it doesn't exist")
        void findByIdShouldReturnEmptyWhenTeamDoesNotExist() {
            Long id = 2L;
            when(teamRepository.findById(id)).thenReturn(Optional.empty());

            //WHEN
            Optional<Team> result = teamService.findById(id);

            //Then
            assertTrue(result.isEmpty());


            verify(teamRepository).findById(id);
        }

        @Test
        @DisplayName("Should return success when repository is called with given id")
        void findByIdShouldCallRepositoryWithGivenId() {

            Long id = 5L;

            when(teamRepository.findById(id)).thenReturn(Optional.empty());


            Optional<Team> result = teamService.findById(id);
            verify(teamRepository).findById(id);
        }


    }

    @Nested
    @DisplayName("Find All Teams Test")
    class findAllTests {

        @Test
        @DisplayName("Should return all teams")
        void findAllTeams() {

            Team expectedTeam1 = new Team("Test Team1", TeamGroup.A);
            Team expectedTeam2 = new Team("Test Team2", TeamGroup.A);

            when(teamRepository.findAll()).thenReturn(Arrays.asList(expectedTeam1, expectedTeam2));

            List<Team> result=teamService.findAll();

            assertFalse(result.isEmpty());
            assertEquals(Arrays.asList(expectedTeam1, expectedTeam2),result); // ALLWAYS PUT THE EXPECTED VALUE, FIRST THEN THE REAL VALUE
            verify(teamRepository).findAll();
        }

        @Test
        @DisplayName("Should return empty list when teams don't exist")
        void findAllShouldReturnEmptyListWhenTeamsDoesNotExist() {

            when(teamRepository.findAll()).thenReturn(new ArrayList<>());

            List<Team> result=teamService.findAll();

            assertTrue(result.isEmpty());
            verify(teamRepository).findAll();
        }

    }

    @Nested
    class findByNameTests{

        @Test
        @DisplayName("Should return team when team exists")
        void findByNameShouldReturnTeam() {

            Team team=new Team("Test Team", TeamGroup.A);
            when(teamRepository.findByName("Test Team")).thenReturn(Optional.of(team));


            Optional<Team> result=teamService.findByName("Test Team");

            assertTrue(result.isPresent());
            assertEquals(team,result.get());

            verify(teamRepository).findByName(argThat(v-> v.equals("Test Team")));
        }

        @Test
        @DisplayName("Should return empty when team does not exist")
        void findByNameShouldReturnEmptyWhenTeamDoesNotExist() {

            when(teamRepository.findByName("Test Team")).thenReturn(Optional.empty());


            Optional<Team>  result = teamService.findByName("Test Team");

            assertTrue(result.isEmpty());
            verify(teamRepository).findByName("Test Team");
        }
    }


}