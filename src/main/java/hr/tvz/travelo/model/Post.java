package hr.tvz.travelo.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDateTime;
import java.util.Date;


@Entity
@Table(name = "post")
@Data
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String content;

    @NotNull
    private LocalDateTime createdAt;

    @NotNull
    private boolean status;

    @ManyToOne
    @JoinColumn(name = "poster_id")
    private User poster;

    @ManyToOne
    @JoinColumn(name = "group_id")
    private TravelGroup travelGroup;

    @ManyToOne
    @JoinColumn(name = "plan_type_id")
    private PlanType planType;

    private Date plannedStart;
    private Date plannedEnd;
    private String title;
    private String url;


    public Post() {
        this.createdAt = LocalDateTime.now();
        this.status = true;
    }
}
