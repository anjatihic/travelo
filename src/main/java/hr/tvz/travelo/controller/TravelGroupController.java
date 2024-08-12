package hr.tvz.travelo.controller;

import hr.tvz.travelo.DTO.TravelGroupDTO;
import hr.tvz.travelo.DTO.UserDTO;
import hr.tvz.travelo.security.request.TravelGroupRequest;
import hr.tvz.travelo.service.TravelGroupService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/{id}")
    @CrossOrigin(origins = "http://localhost:4200")
    public ResponseEntity<TravelGroupDTO> getTravelGroupById(@PathVariable final Long id){
        return travelGroupService.findById(id)
                .map(
                        travelGroupDTO -> ResponseEntity.status(HttpStatus.OK).body(travelGroupDTO)
                )
                .orElseGet(
                        () -> ResponseEntity.notFound().build()
                );
    }

    @GetMapping("/code{code}")
    @CrossOrigin(origins = "http://localhost:4200")
    public ResponseEntity<TravelGroupDTO> getTravelGroupByCode(@PathVariable final String code){
        return travelGroupService.findByCode(code)
                .map(
                        travelGroupDTO -> ResponseEntity.status(HttpStatus.OK).body(travelGroupDTO)
                )
                .orElseGet(
                        () -> ResponseEntity.notFound().build()
                );
    }

    @PostMapping
    @CrossOrigin(origins = "http://localhost:4200")
    public ResponseEntity<TravelGroupDTO> newTravelGroup(@Valid @RequestBody TravelGroupRequest travelGroupRequest) {
        return travelGroupService.post(travelGroupRequest)
                .map(
                        travelGroupDTO -> ResponseEntity.status(HttpStatus.CREATED).body(travelGroupDTO)
                )
                .orElseGet(
                        () -> ResponseEntity.status(HttpStatus.CONFLICT).build()
                );
    }

    @GetMapping("/user/{userId}")
    @CrossOrigin(origins = "http://localhost:4200")
    public ResponseEntity<List<TravelGroupDTO>> getTravelGroupsByUserId(@PathVariable Long userId) {
        return travelGroupService.findTravelGroupsByUserId(userId)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/{travelGroupCode}/addUser/{userId}")
    @CrossOrigin(origins = "http://localhost:4200")
    public ResponseEntity<TravelGroupDTO> addUserToTravelGroup(@PathVariable String travelGroupCode, @PathVariable Long userId) {
        return travelGroupService.addUserToTravelGroup(userId, travelGroupCode)
                .map(
                        travelGroupDTO -> ResponseEntity.status(HttpStatus.OK).body(travelGroupDTO)
                ).orElseGet(
                        () -> ResponseEntity.status(HttpStatus.NOT_FOUND).build()
                );
    }

    @GetMapping("/getUser/{userId}")
    @CrossOrigin(origins = "http://localhost:4200")
    public ResponseEntity<UserDTO> getUserById(@PathVariable Long userId) {
        return travelGroupService.findUserById(userId)
                .map(
                        userDTO -> ResponseEntity.status(HttpStatus.OK).body(userDTO)
                )
                .orElseGet(
                        () -> ResponseEntity.status(HttpStatus.NOT_FOUND).build()
                );
    }
}
