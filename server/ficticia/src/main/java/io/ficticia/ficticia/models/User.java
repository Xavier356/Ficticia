package io.ficticia.ficticia.models;

import io.ficticia.ficticia.util.DateAudit;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Data
@Table(name = "users")
public class User extends DateAudit{

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY )
    private long id;

    private String full_name;

    private long identification;

    private int age;

    private String gender;

    private String state;

    private String add_attrs;

    @CreatedDate
    private Timestamp created_at;

    @LastModifiedDate
    private Timestamp updated_at;

}
