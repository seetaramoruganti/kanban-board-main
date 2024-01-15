package com.kanban.server.controllers;

import com.kanban.server.models.lane.LaneDTO;
import com.kanban.server.repository.LaneRepository;
import com.kanban.server.services.LaneService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/lane")
@CrossOrigin(origins="http://localhost:3000")
public class LaneController {

    @Autowired
    LaneService laneService;
    @PostMapping("")
    public LaneDTO addLane(@RequestBody LaneDTO laneDTO){
        return laneService.addLane(laneDTO);
    }
    @GetMapping("")
    public Iterable<LaneDTO> getAllLanes(){
        return laneService.getAllLanes();
    }
    @DeleteMapping("/{id}")
    public void deleteLane(@PathVariable Long id){
        laneService.deleteLane(id);
    }
    @PutMapping("/{id}")
    public LaneDTO updateLane(@PathVariable Long id,@RequestBody LaneDTO laneDTO){

        return laneService.updateLane(id,laneDTO);
    }
}
