package hr.tvz.travelo.repository;

import hr.tvz.travelo.model.TravelGroup;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TravelGroupRepository extends JpaRepository<TravelGroup, Long> {
    List<TravelGroup> findAll();
}
