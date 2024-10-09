package com.roman.task_tracker.user;

import com.fasterxml.jackson.annotation.*;
import com.roman.task_tracker.project.Project;
import com.roman.task_tracker.task.Task;
import com.roman.task_tracker.userProject.UserProject;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import com.roman.task_tracker.role.Role;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
@Table(name = "users")
@EntityListeners(AuditingEntityListener.class)
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class User implements UserDetails, Principal {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private String firstname;
    private String lastname;
    @Column(unique = true)
    private String email;
    private String password;
    private boolean accountLocked;
    private boolean enabled;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "users_roles",
            joinColumns = @JoinColumn(name = "users_id"),
            inverseJoinColumns = @JoinColumn(name = "roles_id"),
            uniqueConstraints = @UniqueConstraint(columnNames = {"users_id", "roles_id"})
    )
    @JsonManagedReference
    private List<Role> roles = new ArrayList<>();

    @OneToMany(mappedBy = "owner")
    private List<Project> ownedProjects;

    @OneToMany(mappedBy = "user")
    private List<UserProject> userProjects;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "project_participants",
            joinColumns = @JoinColumn(name = "users_id"),
            inverseJoinColumns = @JoinColumn(name = "projects_id")
    )
    @JsonIgnore
    private List<Project> projects;

    @OneToMany(mappedBy = "user")
    private List<Task> tasks;

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;
    @LastModifiedDate
    @Column(insertable = false)
    private LocalDateTime updatedAt;

    public User(UUID uuid) {
    }

    public User(User user) {
        this.id = user.id;
        this.firstname = user.firstname;
        this.lastname = user.lastname;
        this.email = user.email;
        this.password = user.password;
        this.accountLocked = user.accountLocked;
        this.enabled = user.enabled;
        this.roles = user.roles;
        this.ownedProjects = user.ownedProjects;
        this.userProjects = user.userProjects;
        this.projects = user.projects;
        this.tasks = user.tasks;
        this.createdAt = user.createdAt;
        this.updatedAt = user.updatedAt;
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.roles.stream().map(role -> new SimpleGrantedAuthority(role.getName()))
                .collect(Collectors.toList());
    }
    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return !accountLocked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }

    @Override
    public String getName() {
        return email;
    }

    public String getFullName(){
        return firstname + " " + lastname;
    }

}
