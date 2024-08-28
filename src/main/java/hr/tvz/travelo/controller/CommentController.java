package hr.tvz.travelo.controller;

import hr.tvz.travelo.DTO.CommentDTO;
import hr.tvz.travelo.security.request.CommentRequest;
import hr.tvz.travelo.service.CommentService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("comment")
public class CommentController {
    private final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @PostMapping()
    @CrossOrigin(origins = "http://localhost:4200")
    public ResponseEntity<CommentDTO> newComment(@Valid @RequestBody CommentRequest commentRequest) {
        return commentService.post(commentRequest)
                .map(
                        commentDTO -> ResponseEntity.status(HttpStatus.CREATED).body(commentDTO)
                )
                .orElseGet(
                        () -> ResponseEntity.status(HttpStatus.BAD_REQUEST).build()
                );
    }

    @GetMapping("/{postId}")
    @CrossOrigin(origins = "http://localhost:4200")
    public List<CommentDTO> getCommentsByPostId(@PathVariable Long postId) {
        return commentService.findByPostId(postId);
    }
}
