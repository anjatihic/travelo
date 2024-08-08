package hr.tvz.travelo.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class PostDTO {
    private Long id;
    private String content;
    private LocalDateTime createdAt;
    private boolean status;
    private String posterUsername;
    private Long groupId;
    private Long planTypeId;
}
