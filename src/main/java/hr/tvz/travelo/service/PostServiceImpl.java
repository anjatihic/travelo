package hr.tvz.travelo.service;

import hr.tvz.travelo.DTO.PostDTO;
import hr.tvz.travelo.model.PlanType;
import hr.tvz.travelo.model.Post;
import hr.tvz.travelo.model.TravelGroup;
import hr.tvz.travelo.model.User;
import hr.tvz.travelo.repository.PlanTypeRepository;
import hr.tvz.travelo.repository.PostRepository;
import hr.tvz.travelo.repository.TravelGroupRepository;
import hr.tvz.travelo.repository.UserRepository;
import hr.tvz.travelo.security.request.PostRequest;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final TravelGroupRepository travelGroupRepository;
    private final PlanTypeRepository planTypeRepository;

    public PostServiceImpl(PostRepository postRepository, UserRepository userRepository, TravelGroupRepository travelGroupRepository, PlanTypeRepository planTypeRepository) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
        this.travelGroupRepository = travelGroupRepository;
        this.planTypeRepository = planTypeRepository;
    }

    @Override
    @Transactional
    public Optional<PostDTO> post(PostRequest postRequest) {
        Post newPost = populateModel(postRequest);
        Post savedPost = postRepository.save(newPost);

       PostDTO postDTO = mapPostToDTO(savedPost);

       return Optional.of(postDTO);
    }

    @Override
    public List<PostDTO> findByGroupId(Long groupId) {
        return postRepository.findAllByTravelGroupId(groupId).stream().map(this::mapPostToDTO).collect(Collectors.toList());
    }

    private Post populateModel(PostRequest postRequest) {
        Post newPost = new Post();

        newPost.setContent(postRequest.getContent());
        newPost.setPlannedStart(postRequest.getPlannedDateStart());
        newPost.setPlannedEnd(postRequest.getPlannedDateEnd());
        newPost.setTitle(postRequest.getTitle());
        newPost.setUrl(postRequest.getUrl());

        Optional<User> poster = userRepository.findById(postRequest.getPosterId());
        poster.ifPresent(newPost::setPoster);

        Optional<TravelGroup> travelGroup = travelGroupRepository.findTravelGroupById(postRequest.getGroupId());
        travelGroup.ifPresent(newPost::setTravelGroup);

        Optional<PlanType> planType = planTypeRepository.findById(postRequest.getPlanTypeId());
        planType.ifPresent(newPost::setPlanType);

        return newPost;
    }

    private PostDTO mapPostToDTO(Post post) {
        return new PostDTO(post.getId(),
                post.getContent(),
                post.getCreatedAt(),
                post.isStatus(),
                post.getPoster().getUsername(),
                post.getTravelGroup().getId(),
                post.getPlanType().getId(),
                post.getPlannedStart(),
                post.getPlannedEnd(),
                post.getTitle(),
                post.getUrl());
    }
}
