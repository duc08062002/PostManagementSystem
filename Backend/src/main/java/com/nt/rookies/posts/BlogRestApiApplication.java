package com.nt.rookies.posts;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "com.nt.rookies.posts.*")
public class BlogRestApiApplication {
	public static void main(String[] args) {
		SpringApplication.run(BlogRestApiApplication.class, args);
	}
}
