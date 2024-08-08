package hr.tvz.travelo.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.HashSet;
import java.util.Random;
import java.util.Set;

@Data
@Entity
@AllArgsConstructor
@Table(name = "travel_group")
@EqualsAndHashCode(of = "id")
public class TravelGroup {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //make auto-generated??
    private String code;

    @NotBlank
    private String name;

    @NotNull
    private Date createdAt;

    @NotNull
    private Boolean status;

    @NotNull
    private Date tripStart;

    @NotNull
    private Date tripEnd;

    @Column(name = "description")
    private String description;

    @Column(name = "image")
    private String image;

    @ManyToMany(mappedBy = "travelGroups", cascade = { CascadeType.PERSIST, CascadeType.MERGE })
    private Set<User> users = new HashSet<>();

    public TravelGroup() {
        this.createdAt = new Date();
        this.status = true;
        this.code = randomCode();
    }

    private String randomCode() {
        int length = 8;
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        Random random = new Random();
        StringBuilder code = new StringBuilder(length);

        for(int i=0; i<length; i++) {
            code.append(characters.charAt(random.nextInt(characters.length())));
        }

        return code.toString();

    }

}
