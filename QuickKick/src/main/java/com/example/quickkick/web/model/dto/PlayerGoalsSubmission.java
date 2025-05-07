package com.example.quickkick.web.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PlayerGoalsSubmission {

    private Long id;
    private int goals;
}
