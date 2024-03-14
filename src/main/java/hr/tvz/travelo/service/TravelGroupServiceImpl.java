package hr.tvz.travelo.service;

import hr.tvz.travelo.DTO.TravelGroupDTO;
import hr.tvz.travelo.model.TravelGroup;
import hr.tvz.travelo.repository.TravelGroupRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TravelGroupServiceImpl implements TravelGroupService{

    private final TravelGroupRepository travelGroupRepository;

    public TravelGroupServiceImpl (TravelGroupRepository travelGroupRepository){
        this.travelGroupRepository = travelGroupRepository;
    }

    @Override
    public List<TravelGroupDTO> findAll(){
        return travelGroupRepository.findAll().stream().map(this::mapTravelGroupToDTO).collect(Collectors.toList());
    }

    @Override
    public Optional<TravelGroupDTO> findById(Long id) {
        return travelGroupRepository.findTravelGroupById(id).map(this::mapTravelGroupToDTO);
    }

    @Override
    public Optional<TravelGroupDTO> findByCode(String code) {
        return travelGroupRepository.findTravelGroupByCode(code).map(this::mapTravelGroupToDTO);
    }

    private TravelGroupDTO mapTravelGroupToDTO (TravelGroup travelGroup){
        return new TravelGroupDTO(
                travelGroup.getCode(), travelGroup.getName(), travelGroup.getCreatedAt(), travelGroup.getStatus(), travelGroup.getTripStart(), travelGroup.getTripEnd()
        );
    }

}
