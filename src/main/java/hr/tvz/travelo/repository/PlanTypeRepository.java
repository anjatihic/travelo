package hr.tvz.travelo.repository;

import hr.tvz.travelo.model.PlanType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PlanTypeRepository extends JpaRepository<PlanType, Long> {

    List<PlanType>findAllByStatusIsTrue();
}
