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

    private Date plannedDateStart;
    private Date plannedDateEnd;
    private String title;
    private String url;

}
