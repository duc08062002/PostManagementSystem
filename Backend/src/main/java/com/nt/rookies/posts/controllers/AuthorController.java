package com.nt.rookies.posts.controllers;

import com.nt.rookies.posts.dtos.Author;
import com.nt.rookies.posts.services.AuthorService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("authors")
@CrossOrigin(origins = "*")
public class AuthorController {
    private AuthorService service;
    public AuthorController(AuthorService service) {
        this.service = Objects.requireNonNull(service);
    }

    @GetMapping
    public ResponseEntity<List<Author>> getAll() {
        return new ResponseEntity<>(service.getAll(), HttpStatus.OK);
    }

    @GetMapping("/{username}")
    public ResponseEntity<Author> getById(@PathVariable String username) {
        return new ResponseEntity<>(service.getByUsername(username), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Author> save(@RequestBody @Valid Author author) {
        return new ResponseEntity<>(service.save(author), HttpStatus.CREATED);
    }

    @PutMapping("/{username}")
    public ResponseEntity<Author> update(@PathVariable String username, @RequestBody @Valid Author author) {
        return new ResponseEntity<>(service.update(username, author), HttpStatus.OK);
    }

    @DeleteMapping("/{username}")
    public ResponseEntity<?> delete(@PathVariable String username) {
        service.delete(username);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/login")
    ResponseEntity<String> login(@RequestParam(name = "email") String email, @RequestParam(name = "password") String password) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("access_token", service.login(email, password));

        return new ResponseEntity<>(
                 service.login(email, password),headers, HttpStatus.OK);
    }
}
