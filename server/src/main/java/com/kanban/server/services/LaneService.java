package com.kanban.server.services;

import com.kanban.server.models.lane.LaneDAO;
import com.kanban.server.models.lane.LaneDTO;
import com.kanban.server.repository.LaneRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LaneService {
    @Autowired
    LaneRepository laneRepository;

    public LaneDTO addLane(LaneDTO laneDTO){
        LaneDAO savedLane;
        savedLane = laneRepository.save(LaneDAO.builder().title(laneDTO.getTitle()).value(laneDTO.getValue()).build());
        return LaneDTO.builder().id(savedLane.getId()).title(savedLane.getTitle()).value(savedLane.getValue()).build();
    }
    public List<LaneDTO> getAllLanes(){
        List<LaneDAO> lanes= (List<LaneDAO>) laneRepository.findAll();
        return lanes.stream().map(laneDAO -> LaneDTO.builder().id(laneDAO.getId()).title(laneDAO.getTitle()).value(laneDAO.getValue()).build()).toList();
    }
    public void deleteLane(Long id){
        laneRepository.deleteById(id);
    }
    public LaneDTO updateLane(Long id,LaneDTO laneDTO){
        LaneDAO laneDAO=laneRepository.findById(id).get();
        laneDAO.setTitle(laneDTO.getTitle());
        laneDAO.setValue(laneDTO.getValue());
        laneRepository.save(laneDAO);
        return LaneDTO.builder().id(laneDAO.getId()).title(laneDAO.getTitle()).value(laneDAO.getValue()).build();
    }
}
