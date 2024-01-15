package com.kanban.server.controllers;

import com.kanban.server.models.task.TaskDAO;
import com.kanban.server.models.task.TaskDTO;
import com.kanban.server.models.user.UserDTO;
import com.kanban.server.services.EmailService;
import com.kanban.server.services.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/task")
@CrossOrigin(origins="http://localhost:3000")
public class TaskController {
    @Autowired
    TaskService taskService;
    @Autowired
    EmailService emailService;
    @PostMapping("")
    public TaskDTO addTask(@RequestBody TaskDTO task) {
        String to = task.getAssignedTo().getEmail();
        String subject ="A New Task Has Been Assigned To You";
        String body="A new task has been assigned to you. "+task.getTitle()+" Description: "+task.getDescription();
        emailService.sendEmail(to, subject, body);
        return taskService.addTask(task);
    }
    @GetMapping("")
    public ResponseEntity<List<TaskDTO>> getAllTasks(){
        return new ResponseEntity<List<TaskDTO>>(taskService.getAllTasks(), HttpStatus.OK);
    }
    @PutMapping("/{id}")
    public ResponseEntity<TaskDTO> updateTask(@PathVariable Long id,@RequestBody TaskDTO task){

        return new ResponseEntity<TaskDTO>(taskService.updateTask(id,task),HttpStatus.OK);
    }
    @PatchMapping("/{id}")
    @CrossOrigin(origins="http://localhost:3000")
    public ResponseEntity<TaskDTO> updateTaskStatus(@PathVariable Long id,@RequestBody TaskDTO status){

        return new ResponseEntity<TaskDTO>(taskService.updateTaskStatus(id,status.getStatus()),HttpStatus.OK);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTask(@PathVariable Long id){
        taskService.deleteTask(id);
        return new ResponseEntity<String>("Task Deleted",HttpStatus.OK);
    }

}
