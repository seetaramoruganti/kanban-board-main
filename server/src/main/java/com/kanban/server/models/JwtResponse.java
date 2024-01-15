package com.kanban.server.models;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class JwtResponse {
    private String token;
}