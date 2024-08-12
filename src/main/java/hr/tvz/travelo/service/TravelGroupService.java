package hr.tvz.travelo.service;

import hr.tvz.travelo.DTO.TravelGroupDTO;
import hr.tvz.travelo.DTO.UserDTO;
import hr.tvz.travelo.security.request.TravelGroupRequest;

import java.util.List;
import java.util.Optional;

public interface TravelGroupService {
    List<TravelGroupDTO> findAll();
    Optional<TravelGroupDTO> findById(Long id);
    Optional<TravelGroupDTO> findByCode(String code);

    Optional<TravelGroupDTO> post(TravelGroupRequest travelGroupRequest);

    Optional<List<TravelGroupDTO>> findTravelGroupsByUserId(Long userId);

    Optional<TravelGroupDTO> addUserToTravelGroup(Long userId, String travelGroupCode);

    Optional<UserDTO> findUserById(Long userId);
}
