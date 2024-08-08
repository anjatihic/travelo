package hr.tvz.travelo.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;
import java.util.Set;

@Data
@AllArgsConstructor
public class TravelGroupDTO {
    private Long id;
    private String code;
    private String name;
    private Date createdAt;
    private Boolean status;
    private Date tripStart;
    private Date tripEnd;
    private String description;
    private String image;
    private Set<Long> usersIds;
}
