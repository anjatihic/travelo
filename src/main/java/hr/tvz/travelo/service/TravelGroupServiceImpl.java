package hr.tvz.travelo.service;

import hr.tvz.travelo.DTO.TravelGroupDTO;
import hr.tvz.travelo.model.TravelGroup;
import hr.tvz.travelo.repository.TravelGroupRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TravelGroupServiceImpl implements TravelGroupService{

    private final TravelGroupRepository travelGroupRepository;

    public TravelGroupServiceImpl(TravelGroupRepository travelGroupRepository) {
        this.travelGroupRepository = travelGroupRepository;
    }

    @Override
    public List<TravelGroupDTO> findAll() {
        return travelGroupRepository.findAll().stream().map(this::mapTravelGroupToDTO).collect(Collectors.toList());
    }

    private TravelGroupDTO mapTravelGroupToDTO (TravelGroup travelGroup){
        return new TravelGroupDTO
                (travelGroup.getCode(), travelGroup.getName(), travelGroup.getCreatedAt(), travelGroup.getStatus(), travelGroup.getTripStart(), travelGroup.getTripEnd());
    }
}
