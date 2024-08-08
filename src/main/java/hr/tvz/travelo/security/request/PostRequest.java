package hr.tvz.travelo.security.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

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
}
