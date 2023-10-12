package com.nt.rookies.posts.mappers;

import com.nt.rookies.posts.dtos.Post;
import com.nt.rookies.posts.entities.AuthorEntity;
import com.nt.rookies.posts.entities.PostEntity;

import java.time.LocalDateTime;
import java.util.LinkedList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

public class PostMapper {

  public static Post toDto(PostEntity entity) {
    Post post = new Post();
    post.setId(entity.getId());
    post.setContent(entity.getContent());
    post.setDescription(entity.getDescription());
    post.setTitle(entity.getTitle());
    post.setCreatedAt(entity.getCreatedAt());
    post.setAuthor(AuthorMapper.toDto(entity.getAuthor()));
    return post;
  }

  public static PostEntity toEntity(Post post) {
    PostEntity entity = new PostEntity();
    entity.setId(post.getId());
    entity.setContent(post.getContent());
    entity.setDescription(post.getDescription());
    entity.setTitle(post.getTitle());
    entity.setCreatedAt(Objects.isNull(post.getCreatedAt()) ? LocalDateTime.now() : post.getCreatedAt());

    if (Objects.nonNull(post.getAuthor())) {
      AuthorEntity authorEntity = new AuthorEntity();
      authorEntity.setUsername(Objects.requireNonNull(post.getAuthor().getUsername(), "Username is required"));
      entity.setAuthor(authorEntity);
    }

    return entity;
  }

  public static List<Post> toDtoList(List<PostEntity> entities) {
    return entities.stream().map(PostMapper::toDto).collect(Collectors.toList());
  }

  public static List<Post> toDtoList(Iterable<PostEntity> entities) {
    List<Post> posts = new LinkedList<>();
    entities.forEach( e -> posts.add(toDto(e)));
    return posts;
  }


}
