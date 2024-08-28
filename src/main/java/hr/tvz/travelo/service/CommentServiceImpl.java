package hr.tvz.travelo.service;

import hr.tvz.travelo.DTO.CommentDTO;
import hr.tvz.travelo.model.Comment;
import hr.tvz.travelo.model.Post;
import hr.tvz.travelo.model.User;
import hr.tvz.travelo.repository.CommentRepository;
import hr.tvz.travelo.repository.PostRepository;
import hr.tvz.travelo.repository.UserRepository;
import hr.tvz.travelo.security.request.CommentRequest;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;
    private final UserRepository userRepository;

    private final PostRepository postRepository;

    public CommentServiceImpl(CommentRepository commentRepository, UserRepository userRepository, PostRepository postRepository) {
        this.commentRepository = commentRepository;
        this.userRepository = userRepository;
        this.postRepository = postRepository;
    }

    @Override
    @Transactional
    public Optional<CommentDTO> post(CommentRequest commentRequest) {
        Comment newComment = populateModel(commentRequest);
        Comment savedComment = commentRepository.save(newComment);

        CommentDTO commentDTO = mapCommentToDTO(savedComment);

        return Optional.of(commentDTO);
    }

    @Override
    public List<CommentDTO> findByPostId(Long postId) {
        return commentRepository.findAllByPostId(postId).stream().map(this::mapCommentToDTO).collect(Collectors.toList());
    }


    private Comment populateModel(CommentRequest commentRequest) {
        Comment comment = new Comment();

        comment.setContent(commentRequest.getContent());

        Optional<User> commenter = userRepository.findById(commentRequest.getCommenterId());
        commenter.ifPresent(comment::setCommenter);

        Optional<Post> post = postRepository.findById(commentRequest.getPostId());
        post.ifPresent(comment::setPost);

        return comment;
    }

    private CommentDTO mapCommentToDTO(Comment comment) {
        return new CommentDTO(comment.getId(), comment.getContent(), comment.getCreatedAt(), comment.getPost().getId(), comment.getCommenter().getId());
    }
}
