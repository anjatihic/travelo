package hr.tvz.travelo.security.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CommentRequest {
    @NotBlank
    private String content;

    @NotNull
    private Long commenterId;
    @NotNull
    private Long postId;
}
