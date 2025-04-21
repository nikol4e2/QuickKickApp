package com.example.quickkick.web.model.dto;

import lombok.Data;
import org.antlr.v4.runtime.misc.NotNull;

@Data
public class PlayingMatchCreateRequestDto {

    @NotNull
    private Long matchId;

    private int minutesForHalfTime;

    private int pauseTime;

    private int timeoutTime;

}
