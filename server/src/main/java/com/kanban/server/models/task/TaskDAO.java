package com.kanban.server.models.task;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.kanban.server.models.user.UserDAO;
import com.kanban.server.models.user.UserDTO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity(name="Tasks")
public class TaskDAO {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String title;
    private String description;
    private String status;
    @ManyToOne(cascade = CascadeType.DETACH)
//    @JoinColumn(name = "assigned_to_id", referencedColumnName = "id", table = "Users")
    @JsonIgnoreProperties({"password"})
    private UserDAO assignedTo;
}
