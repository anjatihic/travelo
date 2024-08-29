package hr.tvz.travelo.service;

import hr.tvz.travelo.DTO.TravelGroupDTO;
import hr.tvz.travelo.DTO.UserDTO;
import hr.tvz.travelo.model.TravelGroup;
import hr.tvz.travelo.model.User;
import hr.tvz.travelo.repository.TravelGroupRepository;
import hr.tvz.travelo.repository.UserRepository;
import hr.tvz.travelo.security.request.TravelGroupRequest;
import hr.tvz.travelo.security.response.JwtResponse;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class TravelGroupServiceImpl implements TravelGroupService{

    private final TravelGroupRepository travelGroupRepository;

    private final UserRepository userRepository;

    public TravelGroupServiceImpl (TravelGroupRepository travelGroupRepository, UserRepository userRepository){
        this.travelGroupRepository = travelGroupRepository;
        this.userRepository = userRepository;
    }

    @Override
    public List<TravelGroupDTO> findAll(){
        return travelGroupRepository.findAll().stream().map(this::mapTravelGroupToDTO).collect(Collectors.toList());
    }

    @Override
    public Optional<TravelGroupDTO> findById(Long id) {
        return travelGroupRepository.findTravelGroupById(id).map(this::mapTravelGroupToDTO);
    }

    @Override
    public Optional<TravelGroupDTO> findByCode(String code) {
        return travelGroupRepository.findTravelGroupByCode(code).map(this::mapTravelGroupToDTO);
    }

    @Override
    @Transactional
    public Optional<TravelGroupDTO> post(TravelGroupRequest travelGroupRequest) {
        TravelGroup travelGroup = populateModel(travelGroupRequest);

        Set<User> users = travelGroupRequest.getUserIds().stream()
                .map(userId -> userRepository.findById(userId).orElse(null))
                .collect(Collectors.toSet());

        travelGroup.setUsers(users);

        TravelGroup savedTravelGroup = travelGroupRepository.save(travelGroup);

        users.forEach(user -> user.addTravelGroup(savedTravelGroup));

        TravelGroupDTO travelGroupDTO = mapTravelGroupToDTO(savedTravelGroup);

        return Optional.of(travelGroupDTO);

    }

    @Override
    public Optional<List<TravelGroupDTO>> findTravelGroupsByUserId(Long userId) {
        return userRepository.findById(userId).map(user -> {
            List<TravelGroupDTO> travelGroups = user.getTravelGroups().stream()
                    .map(this::mapTravelGroupToDTO)
                    .collect(Collectors.toList());
            return travelGroups;
        });
    }

    @Override
    @Transactional
    public Optional<TravelGroupDTO> addUserToTravelGroup(Long userId, String travelGroupCode) {
        Optional<TravelGroup> travelGroupOptional = travelGroupRepository.findTravelGroupByCode(travelGroupCode);
        if(travelGroupOptional.isEmpty()) {
            return Optional.empty();
        }

        Optional<User> userOptional = userRepository.findById(userId);
        if(userOptional.isEmpty()) {
            return Optional.empty();
        }

        TravelGroup travelGroup = travelGroupOptional.get();
        User user = userOptional.get();

        user.addTravelGroup(travelGroup);
        userRepository.save(user);

        return Optional.of(mapTravelGroupToDTO(travelGroup));

    }

    @Override
    public Optional<UserDTO> findUserById(Long userId) {
        return userRepository.findById(userId).map(this::mapUserToDTO);
    }

    private TravelGroupDTO mapTravelGroupToDTO (TravelGroup travelGroup){
        TravelGroupDTO travelGroupDTO = new TravelGroupDTO(travelGroup.getId(),travelGroup.getCode(), travelGroup.getName(), travelGroup.getCreatedAt(), travelGroup.getStatus(), travelGroup.getTripStart(), travelGroup.getTripEnd(),
                travelGroup.getDescription(), travelGroup.getImage(), new HashSet<>());

        travelGroupDTO.setUsersIds(travelGroup.getUsers().stream()
                .map(User::getId)
                .collect(Collectors.toSet()));

        return travelGroupDTO;
    }

    private TravelGroup populateModel(TravelGroupRequest travelGroupRequest) {
        TravelGroup travelGroup = new TravelGroup();

        travelGroup.setName(travelGroupRequest.getName());
        travelGroup.setTripStart(travelGroupRequest.getTripStart());
        travelGroup.setTripEnd(travelGroupRequest.getTripEnd());

        if(travelGroupRequest.getDescription() != null) {
            travelGroup.setDescription(travelGroupRequest.getDescription());
        } else {
            travelGroup.setDescription("");
        }

        if(travelGroupRequest.getImage() != null) {
            travelGroup.setImage(travelGroupRequest.getImage());
        } else {
            travelGroup.setImage("");
        }

        return travelGroup;

    }

    private UserDTO mapUserToDTO(User user) {
        Set<Long> travelGroupIds = user.getTravelGroups().stream()
                .map(TravelGroup::getId)
                .collect(Collectors.toSet());

        return new UserDTO(user.getId(), user.getUsername(), user.getEmail(), travelGroupIds);
    }

}
