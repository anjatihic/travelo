package hr.tvz.travelo.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;

@Data
@AllArgsConstructor
public class TravelGroupDTO {
    private String code;
    private String name;
    private Date createdAt;
    private Boolean status;
    private Date tripStart;
    private Date tripEnd;
}
