package com.nt.rookies.posts.controllers;

import com.nt.rookies.posts.dtos.ErrorMessage;
import com.nt.rookies.posts.exceptions.BadRequestException;
import com.nt.rookies.posts.exceptions.NotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import java.util.stream.Collectors;

@ControllerAdvice
public class AppExceptionHandler {
  @ExceptionHandler(NotFoundException.class)
  public ResponseEntity<ErrorMessage> handleNotFoundException(
      NotFoundException ex, WebRequest request) {
    return new ResponseEntity<>(new ErrorMessage(ex.getMessage()), HttpStatus.NOT_FOUND);
  }

  @ExceptionHandler(BadRequestException.class)
  public ResponseEntity<ErrorMessage> handleNotFoundException(
      BadRequestException ex, WebRequest request) {
    return new ResponseEntity<>(new ErrorMessage(ex.getMessage()), HttpStatus.BAD_REQUEST);
  }

  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<ErrorMessage> handleNotFoundException(
      MethodArgumentNotValidException ex, WebRequest request) {
    return new ResponseEntity<>(new ErrorMessage(ex.getAllErrors().stream().map(ObjectError::toString).collect(Collectors.toList()).toString()), HttpStatus.BAD_REQUEST);
  }


}
