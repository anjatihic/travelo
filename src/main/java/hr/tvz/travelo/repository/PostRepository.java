package hr.tvz.travelo.repository;

import hr.tvz.travelo.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    Optional<Post> findByTravelGroupId(Long groupId);
}
