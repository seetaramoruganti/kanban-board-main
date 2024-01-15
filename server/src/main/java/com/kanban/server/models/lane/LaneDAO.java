package com.kanban.server.models.lane;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

@Builder
@Entity(name="Lanes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LaneDAO {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String value;
}
