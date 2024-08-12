package hr.tvz.travelo.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PlanTypeDTO {

    private Long id;
    private String name;
    private boolean status;
}
