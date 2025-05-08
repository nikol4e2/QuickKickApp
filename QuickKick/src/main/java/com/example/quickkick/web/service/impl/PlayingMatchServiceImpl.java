package com.example.quickkick.web.service.impl;

import com.example.quickkick.web.model.Match;
import com.example.quickkick.web.model.PlayingMatch;
import com.example.quickkick.web.model.enums.MatchStatus;
import com.example.quickkick.web.model.enums.PlayingMatchStatus;
import com.example.quickkick.web.model.enums.TimeoutType;
import com.example.quickkick.web.model.exceptions.MatchNotFoundException;
import com.example.quickkick.web.repository.PlayingMatchRepository;
import com.example.quickkick.web.service.MatchService;
import com.example.quickkick.web.service.PlayingMatchService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PlayingMatchServiceImpl implements PlayingMatchService {

    private final PlayingMatchRepository playingMatchRepository;
    private final MatchService matchService;

    public PlayingMatchServiceImpl(PlayingMatchRepository playingMatchRepository, MatchService matchService) {
        this.playingMatchRepository = playingMatchRepository;
        this.matchService = matchService;
    }


    @Override
    public Optional<PlayingMatch> getPlayingMatch(Long playingMatchId) {
        return this.playingMatchRepository.findById(playingMatchId);
    }

    @Override
    public Optional<PlayingMatch> getPlayingMatchByMatchId(Long matchId) {
        return Optional.of(playingMatchRepository.findByMatchId(matchId));
    }

    @Override
    public List<PlayingMatch> findAll() {
        return this.playingMatchRepository.findAll();
    }

    @Override
    public PlayingMatch createPlayingMatch(Long matchId, int minutesForHalfTime, int pauseTime, int timeoutTime) {
        Optional<Match> match=this.matchService.getMatchById(matchId);
        if(match.isPresent()) {
            PlayingMatch playingMatch=new PlayingMatch(match.get(),minutesForHalfTime,pauseTime,timeoutTime);
            return this.playingMatchRepository.save(playingMatch);
        }else throw new MatchNotFoundException();
    }

    @Override
    public PlayingMatch startPlayingMatch(Long playingMatchId) {
        Optional<PlayingMatch> playingMatch=this.playingMatchRepository.findById(playingMatchId);
        if(playingMatch.isPresent()) {
            this.matchService.changeMatchStatus(playingMatch.get().getMatch().getId(), MatchStatus.PLAYING);
            playingMatch.get().setStatus(PlayingMatchStatus.PLAYING);
            playingMatchRepository.save(playingMatch.get());
            return playingMatch.get();
        }else throw new MatchNotFoundException();
    }

    @Override
    public void adjustTimerForPlayingMatch(Long playingMatchId, int minutes) {
        Optional<PlayingMatch> playingMatch=this.playingMatchRepository.findById(playingMatchId);
        if(playingMatch.isPresent()) {
            playingMatch.get().setTimer(minutes);
            this.playingMatchRepository.save(playingMatch.get());

        }
    }

    @Override
    public void addMinutesToPlayingMatch(Long playingMatchId, int minutes) {
        Optional<PlayingMatch> playingMatch=this.playingMatchRepository.findById(playingMatchId);
        if(playingMatch.isPresent())
        {
            playingMatch.get().setTimer(playingMatch.get().getTimer()+minutes);
            this.playingMatchRepository.save(playingMatch.get());
        }
    }

    @Override
    public void subtractMinutesFromPlayingMatch(Long playingMatchId, int minutes) {
        Optional<PlayingMatch> playingMatch=this.playingMatchRepository.findById(playingMatchId);
        if(playingMatch.isPresent())
        {
            playingMatch.get().setTimer(playingMatch.get().getTimer()-minutes);
            this.playingMatchRepository.save(playingMatch.get());
        }
    }

    @Override
    public void addGoalToTeam(Long playingMatchId, int teamNumber) {
        Optional<PlayingMatch> playingMatch=this.playingMatchRepository.findById(playingMatchId);
        if(playingMatch.isPresent()) {
            if(teamNumber==1)
            {
                playingMatch.get().setGoalsTeam1(playingMatch.get().getGoalsTeam1()+1);
            }else if(teamNumber==2)
            {
                playingMatch.get().setGoalsTeam2(playingMatch.get().getGoalsTeam2()+1);
            }
            playingMatchRepository.save(playingMatch.get());

        }
    }

    @Override
    public void removeGoalFromTeam(Long playingMatchId, int teamNumber) {
        Optional<PlayingMatch> playingMatch=this.playingMatchRepository.findById(playingMatchId);
        if(playingMatch.isPresent()) {
            if(teamNumber==1)
            {
                playingMatch.get().setGoalsTeam1(playingMatch.get().getGoalsTeam1()-1);
            }else if(teamNumber==2)
            {
                playingMatch.get().setGoalsTeam2(playingMatch.get().getGoalsTeam2()-1);
            }
            playingMatchRepository.save(playingMatch.get());

        }
    }

    @Override
    public void addFaulToTeam(Long playingMatchId, int teamNumber) {
        Optional<PlayingMatch> playingMatch=this.playingMatchRepository.findById(playingMatchId);
        if(playingMatch.isPresent()) {
            if(teamNumber==1)
            {
                playingMatch.get().setFaulsTeam1(playingMatch.get().getFaulsTeam1()+1);
            }else if(teamNumber==2)
            {
                playingMatch.get().setFaulsTeam2(playingMatch.get().getFaulsTeam2()+1);
            }
            playingMatchRepository.save(playingMatch.get());

        }
    }

    @Override
    public void removeFaulFromTeam(Long playingMatchId, int teamNumber) {
        Optional<PlayingMatch> playingMatch=this.playingMatchRepository.findById(playingMatchId);
        if(playingMatch.isPresent()) {
            if(teamNumber==1)
            {
                playingMatch.get().setFaulsTeam1(playingMatch.get().getFaulsTeam1()-1);
            }else if(teamNumber==2)
            {
                playingMatch.get().setFaulsTeam2(playingMatch.get().getFaulsTeam2()-1);
            }
            playingMatchRepository.save(playingMatch.get());

        }
    }

    @Override
    public void signalHalfTime(Long playingMatchId) {
        Optional<PlayingMatch> playingMatch=this.playingMatchRepository.findById(playingMatchId);
        if (playingMatch.isPresent())
        {
            playingMatch.get().setHalfTimeCounter(2);
            playingMatch.get().setStatus(PlayingMatchStatus.HALF_TIME_TIMEOUT);
            this.playingMatchRepository.save(playingMatch.get());
        }
    }

    @Override
    public void signalTimeout(Long playingMatchId, TimeoutType timeoutType) {

        PlayingMatch playingMatch=this.playingMatchRepository.findById(playingMatchId).orElseThrow(()-> new MatchNotFoundException());
        if(timeoutType==TimeoutType.HALF_TIME) {
            playingMatch.setStatus(PlayingMatchStatus.HALF_TIME_TIMEOUT);
        }else if(timeoutType==TimeoutType.TEAM)
        {
            playingMatch.setStatus(PlayingMatchStatus.TEAM_TIMEOUT);
        }
        this.playingMatchRepository.save(playingMatch);
    }

    @Override
    public void signalPlayingAgain(Long playingMatchId) {
        PlayingMatch playingMatch = this.playingMatchRepository.findById(playingMatchId)
                .orElseThrow(MatchNotFoundException::new);
            playingMatch.setStatus(PlayingMatchStatus.PLAYING);

    }

    @Override
    public void finishPlayingMatch(Long playingMatchId,Boolean isGroupPhase) {
        PlayingMatch playingMatch = this.playingMatchRepository.findById(playingMatchId)
                .orElseThrow(MatchNotFoundException::new);

        this.matchService.finishMatch(playingMatch.getMatch().getId(),
                playingMatch.getGoalsTeam1(),
                playingMatch.getGoalsTeam2(),isGroupPhase);

        playingMatch.setStatus(PlayingMatchStatus.FINISHED);

        this.playingMatchRepository.deleteById(playingMatchId); // Proveri dali brisenjeto e potrebno?
    }

    @Override
    public void deletePlayingMatch(Long playingMatchId) {
        if(this.playingMatchRepository.existsById(playingMatchId)) {
            this.playingMatchRepository.deleteById(playingMatchId);
        }
    }
}

