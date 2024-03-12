package hr.tvz.travelo.controller;

import hr.tvz.travelo.DTO.TravelGroupDTO;
import hr.tvz.travelo.service.TravelGroupService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("travelGroup")
public class TravelGroupController {
    private final TravelGroupService travelGroupService;

    public TravelGroupController(TravelGroupService travelGroupService) {
        this.travelGroupService = travelGroupService;
    }

    @GetMapping
    @CrossOrigin(origins = "http://localhost:4200")
    public List<TravelGroupDTO> getAllTravelGroups() {
        return travelGroupService.findAll();
    }
}
