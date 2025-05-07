package com.example.quickkick.web.model.dto;

import com.example.quickkick.web.model.Player;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SubmitGoalsDto {

    private List<PlayerGoalsSubmission> team1;
    private List<PlayerGoalsSubmission> team2;

}
