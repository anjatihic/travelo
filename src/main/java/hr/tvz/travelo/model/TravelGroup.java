package hr.tvz.travelo.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "travel_group")
public class TravelGroup {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    //make auto-generated??
    private String code;
    private String name;
    private Date createdAt;
    private Boolean status;
    private Date tripStart;
    private Date tripEnd;
}
