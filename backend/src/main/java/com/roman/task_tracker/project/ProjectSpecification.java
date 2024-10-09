package com.roman.task_tracker.project;

import com.roman.task_tracker.user.User;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Join;
import org.springframework.data.jpa.domain.Specification;

import java.util.UUID;

public class ProjectSpecification {
    //    public static Specification<Project> withOwnerId (UUID id){
//        return (root,query,criteriaBuilder) ->criteriaBuilder.equal(root.get("owner").get("id"), id);
//    }
//    public static Specification<Project> withParticipantId(UUID id) {
//        return (root, query, criteriaBuilder) -> criteriaBuilder.isMember(id, root.get("participants"));
//    }
    public static Specification<Project> hasParticipant(UUID userId) {
        return (root, query, criteriaBuilder) -> {
            Join<Project, User> participants = root.join("participants");
            return criteriaBuilder.equal(participants.get("id"), userId);
        };
    }
}
