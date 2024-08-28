package hr.tvz.travelo.security.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.Date;

@Data
public class PostRequest {
    @NotNull
    private Long planTypeId;

    private String title;

    @NotBlank
    private String content;

    private Date plannedDateStart;

    private Date plannedDateEnd;

    private String url;

    @NotNull
    private Long posterId;

    @NotNull
    private Long groupId;


}
