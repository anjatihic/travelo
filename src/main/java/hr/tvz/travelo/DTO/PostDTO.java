package hr.tvz.travelo.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Date;

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

    private Date plannedDate;
    private String title;
    private String url;

    public PostDTO(Long id, String content, LocalDateTime createdAt, boolean status, String posterUsername, Long groupId, Long planTypeId) {
        this.id = id;
        this.content = content;
        this.createdAt = createdAt;
        this.status = status;
        this.posterUsername = posterUsername;
        this.groupId = groupId;
        this.planTypeId = planTypeId;
    }
}
