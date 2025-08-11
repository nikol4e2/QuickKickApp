package com.example.quickkick.web.model.dto;

import com.example.quickkick.web.model.enums.MatchStatus;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class EditAllMatchDto {

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm")
    private LocalDateTime date;

    private Long team1;

    private Long team2;

    private int goalsTeam1;
    private int goalsTeam2;

    private MatchStatus status;
}
