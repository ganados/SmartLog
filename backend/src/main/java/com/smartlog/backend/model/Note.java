package com.smartlog.backend.model;

import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor(staticName = "of")
public class Note {
    @Getter
    private final UUID id = UUID.randomUUID();
    private String title;
    private String content;
}
