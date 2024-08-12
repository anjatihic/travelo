package hr.tvz.travelo.service;

import hr.tvz.travelo.DTO.PlanTypeDTO;

import java.util.List;

public interface PlanTypeService {

    List<PlanTypeDTO> findAllActive();
}
