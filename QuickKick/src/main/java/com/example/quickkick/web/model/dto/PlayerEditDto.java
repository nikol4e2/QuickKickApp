package com.example.quickkick.web.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PlayerEditDto {
    private String firstName;
    private String secondName;
    private int goals;
}
