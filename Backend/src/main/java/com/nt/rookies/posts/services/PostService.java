package com.nt.rookies.posts.services;

import com.nt.rookies.posts.dtos.Post;
import com.nt.rookies.posts.exceptions.BadRequestException;
import com.nt.rookies.posts.exceptions.NotFoundException;
import com.nt.rookies.posts.mappers.PostMapper;
import com.nt.rookies.posts.repositories.PostRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@Service
public class PostService {
  private PostRepository repository;

  public PostService(PostRepository repository) {
    this.repository = Objects.requireNonNull(repository);
  }

  public List<Post> getAll() {
    return PostMapper.toDtoList(this.repository.findAll());
  }

  public Post getId(Integer id) {
    return PostMapper.toDto( repository.findById(id).orElseThrow(() -> new NotFoundException("Post Id : " + id + " Not Found")));
  }

  public Post save(Post post) {
    try {
      return PostMapper.toDto( repository.save(PostMapper.toEntity(post)));
    } catch (NullPointerException e) {
      throw Objects.nonNull(e.getMessage()) ? new BadRequestException(e.getMessage()) : new BadRequestException(e);
    }
  }

  public List<Post> getPostsByTitle(String title) {
    return PostMapper.toDtoList(this.repository.findPostByTitle(title));
  }

  public Post update(Integer id, Post postDetails) {
    Post post = getId(id);
    post.setTitle(postDetails.getTitle());
    post.setDescription(postDetails.getDescription());
    post.setContent(postDetails.getContent());
    post.setCreatedAt(LocalDateTime.now());
    try {
      return PostMapper.toDto(repository.save(PostMapper.toEntity(post)));
    } catch (NullPointerException e) {
      throw Objects.nonNull(e.getMessage()) ? new BadRequestException(e.getMessage()) : new BadRequestException(e);
    }
  }

  public void delete(Integer id) {
    repository.deleteById(id);
  }



}
