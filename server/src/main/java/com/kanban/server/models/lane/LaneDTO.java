package com.kanban.server.models.lane;

import lombok.*;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class LaneDTO {
    private Long id;
    private String title;
    private String value;
}
