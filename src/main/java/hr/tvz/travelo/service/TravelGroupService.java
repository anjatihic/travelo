package hr.tvz.travelo.service;

import hr.tvz.travelo.DTO.TravelGroupDTO;

import java.util.List;
import java.util.Optional;

public interface TravelGroupService {
    List<TravelGroupDTO> findAll();
    Optional<TravelGroupDTO> findById(Long id);
}
