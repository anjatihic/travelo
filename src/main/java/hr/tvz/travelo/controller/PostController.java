package hr.tvz.travelo.controller;

import hr.tvz.travelo.DTO.PlanTypeDTO;
import hr.tvz.travelo.service.PlanTypeService;
import hr.tvz.travelo.service.PostService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

}
