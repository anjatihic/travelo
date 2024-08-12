package hr.tvz.travelo.security.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.Date;

@Data
public class PostRequest {
    @NotBlank
    private String content;

    @NotNull
    private Long posterId;

    @NotNull
    private Long groupId;

    @NotNull
    private Long planTypeId;

    private Date plannedDate;
    private String title;
    private String url;
}
