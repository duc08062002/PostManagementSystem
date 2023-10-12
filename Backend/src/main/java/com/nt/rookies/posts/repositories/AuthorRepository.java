package com.nt.rookies.posts.repositories;

import com.nt.rookies.posts.entities.AuthorEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


public interface AuthorRepository extends CrudRepository<AuthorEntity, String> {

    @Query("select a from AuthorEntity a where a.email = :email and a.password = :password")
    AuthorEntity findAuthorByCredential(@Param("email") String email, @Param("password") String password);

    @Query("select a from AuthorEntity a where a.email = :email or a.username = :username")
    AuthorEntity findExistingAuthor(@Param("email") String email, @Param("username") String username);
}
