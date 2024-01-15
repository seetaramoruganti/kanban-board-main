package com.kanban.server.repository;

import com.kanban.server.models.task.TaskDAO;
import org.springframework.data.repository.CrudRepository;
public interface TaskRepository extends CrudRepository<TaskDAO,Long > {

}
