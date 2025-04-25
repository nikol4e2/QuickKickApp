package com.example.quickkick.web.model.dto;

import lombok.Data;
import org.springframework.web.bind.annotation.RequestBody;

@Data
public class FinishMatchRequest {
    private  int goalsTeam1;
    private int goalsTeam2;
    private Boolean isGroupPhase;


    public FinishMatchRequest(int goalsTeam1, int goalsTeam2, Boolean isGroupPhase) {
        this.goalsTeam1 = goalsTeam1;
        this.goalsTeam2 = goalsTeam2;
        this.isGroupPhase = isGroupPhase;
    }
}
