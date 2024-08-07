package hr.tvz.travelo.security.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Data
public class TravelGroupRequest {

    @NotBlank
    private String name;

    @NotNull
    private Date tripStart;

    @NotNull
    private Date tripEnd;

    private String description;

    private String image;

    @NotNull
    private Set<Long> userIds = new HashSet<>();


}
