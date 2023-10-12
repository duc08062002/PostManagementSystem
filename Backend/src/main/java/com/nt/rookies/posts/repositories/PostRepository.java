package com.nt.rookies.posts.repositories;

import com.nt.rookies.posts.entities.PostEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PostRepository extends CrudRepository<PostEntity, Integer> {
        @Query("select p from PostEntity p where lower(p.title) like lower(concat('%', :title,'%'))")
    List<PostEntity>  findPostByTitle(@Param("title") String title);
//    List<PostEntity> findPostByTitle(String title);
}
