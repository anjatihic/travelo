package hr.tvz.travelo.controller;

import hr.tvz.travelo.DTO.PlanTypeDTO;
import hr.tvz.travelo.DTO.PostDTO;
import hr.tvz.travelo.security.request.PostRequest;
import hr.tvz.travelo.service.PlanTypeService;
import hr.tvz.travelo.service.PostService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("post")
public class PostController {
    private final PostService postService;
    private final PlanTypeService planTypeService;

    public PostController(PostService postService, PlanTypeService planTypeService) {
        this.postService = postService;
        this.planTypeService = planTypeService;
    }

    @GetMapping("/activePlanTypes")
    @CrossOrigin(origins = "http://localhost:4200")
    public List<PlanTypeDTO> getAllActivePlanTypes() {
        return planTypeService.findAllActive();
    }

    @PostMapping
    @CrossOrigin(origins = "http://localhost:4200")
    public ResponseEntity<PostDTO> newPost(@Valid @RequestBody PostRequest postRequest) {
        return postService.post(postRequest)
                .map(
                        postDTO -> ResponseEntity.status(HttpStatus.CREATED).body(postDTO)
                )
                .orElseGet(
                        () -> ResponseEntity.status(HttpStatus.CONFLICT).build()
                );
    }

}
