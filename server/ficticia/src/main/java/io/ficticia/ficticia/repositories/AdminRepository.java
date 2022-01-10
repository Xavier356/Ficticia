package io.ficticia.ficticia.repositories;

import io.ficticia.ficticia.models.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRepository extends JpaRepository<Admin,String> {
   Admin findByUsername(String username);
}
