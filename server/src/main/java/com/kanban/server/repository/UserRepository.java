package com.kanban.server.repository;

import com.kanban.server.models.user.UserDAO;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<UserDAO,Long> {
    UserDAO findByEmail(String email);
}
