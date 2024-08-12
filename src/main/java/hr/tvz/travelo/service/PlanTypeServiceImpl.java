package hr.tvz.travelo.service;

import hr.tvz.travelo.DTO.PlanTypeDTO;
import hr.tvz.travelo.model.PlanType;
import hr.tvz.travelo.repository.PlanTypeRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PlanTypeServiceImpl implements PlanTypeService{

    private final PlanTypeRepository planTypeRepository;

    public PlanTypeServiceImpl(PlanTypeRepository planTypeRepository) {
        this.planTypeRepository = planTypeRepository;
    }

    @Override
    public List<PlanTypeDTO> findAllActive() {
        return planTypeRepository.findAllByStatusIsTrue().stream().map(this::mapPlanTypeToDTO).collect(Collectors.toList());
    }

    private PlanTypeDTO mapPlanTypeToDTO(PlanType planType) {

        return new PlanTypeDTO(planType.getId(), planType.getName(), planType.isStatus());
    }
}
