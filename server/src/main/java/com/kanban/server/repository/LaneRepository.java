package com.kanban.server.repository;

import com.kanban.server.models.lane.LaneDAO;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LaneRepository extends CrudRepository<LaneDAO,Long> {
}
