package hr.tvz.travelo.service;

import hr.tvz.travelo.DTO.PostDTO;
import hr.tvz.travelo.security.request.PostRequest;

import java.util.List;
import java.util.Optional;

public interface PostService {
    Optional<PostDTO> post(PostRequest postRequest);

    List<PostDTO> findByGroupId(Long groupId);
}
