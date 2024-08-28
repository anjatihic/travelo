package hr.tvz.travelo.service;

import hr.tvz.travelo.DTO.CommentDTO;
import hr.tvz.travelo.security.request.CommentRequest;

import java.util.Optional;

public interface CommentService {
    Optional<CommentDTO> post(CommentRequest commentRequest);
}
