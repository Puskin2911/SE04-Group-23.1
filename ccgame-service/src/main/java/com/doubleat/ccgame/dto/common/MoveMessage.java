package com.doubleat.ccgame.dto.common;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class MoveMessage {
    @JsonProperty("roomId")
    private Integer roomId;
    @JsonProperty("move")
    private String moveString;
}
