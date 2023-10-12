package com.nt.rookies.posts.services;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.nt.rookies.posts.dtos.Author;
import com.nt.rookies.posts.exceptions.BadRequestException;
import com.nt.rookies.posts.exceptions.NotFoundException;
import com.nt.rookies.posts.mappers.AuthorMapper;
import com.nt.rookies.posts.repositories.AuthorRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class AuthorService {
    private AuthorRepository repository;

    public AuthorService(AuthorRepository repository) {
        this.repository = Objects.requireNonNull(repository);
    }

    public List<Author> getAll() {
        return AuthorMapper.toDtoList(this.repository.findAll());
    }

    public Author getByUsername(String username) {
        return AuthorMapper.toDto( repository.findById(username).orElseThrow(() -> new NotFoundException("Author username : " + username + " Not Found")));
    }

    public Author save(Author author) {
        if (this.repository.findExistingAuthor(author.getEmail(), author.getUsername()) != null) {
            throw new BadRequestException();
        } else {
            try {
                return AuthorMapper.toDto( repository.save(AuthorMapper.toEntity(author)));
            } catch (NullPointerException e) {
                throw Objects.nonNull(e.getMessage()) ? new BadRequestException(e.getMessage()) : new BadRequestException(e);
            }
        }
    }

    public Author update(String username, Author authorDetails) {
        Author author = getByUsername(username);
        author.setPassword(authorDetails.getPassword());
        author.setFirstName(authorDetails.getFirstName());
        author.setLastName(authorDetails.getLastName());
        author.setEmail(authorDetails.getEmail());
        author.setBirthDate(authorDetails.getBirthDate());
        author.setCreatedAt(authorDetails.getCreatedAt());
        try {
            return AuthorMapper.toDto( repository.save(AuthorMapper.toEntity(author)));
        } catch (NullPointerException e) {
            throw Objects.nonNull(e.getMessage()) ? new BadRequestException(e.getMessage()) : new BadRequestException(e);
        }
    }

    public void delete(String username) {
        repository.deleteById(username);
    }

    public String login(String email, String password) {
        if (this.repository.findAuthorByCredential(email, password) != null) {
            Author author = AuthorMapper.toDto(this.repository.findAuthorByCredential(email, password));
            System.out.println(author.getUsername());
            Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());
            String access_token = JWT.create()
                    .withSubject(author.getUsername())
                    .sign(algorithm);
            return access_token;
        }
        else {
            throw new BadRequestException();
        }
    }

}
