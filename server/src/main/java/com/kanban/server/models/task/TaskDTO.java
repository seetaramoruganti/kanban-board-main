package com.kanban.server.models.task;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.kanban.server.models.user.UserDAO;
import com.kanban.server.models.user.UserDTO;
import lombok.*;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TaskDTO {
    private long id;
    private String taskId;

    public String getTaskId() {
        return "ASE"+"-"+String.valueOf(id);
    }
    public String setTaskId() {
        return "ASE"+"-"+String.valueOf(id);
    }

    private String title;
    private String description;
    private String status;
    @JsonIgnoreProperties({"password"})
    private UserDAO assignedTo;
}
