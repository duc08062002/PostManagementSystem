package com.nt.rookies.posts.exceptions;

public class BadRequestException extends RuntimeException{
  public BadRequestException() {}
  public BadRequestException(Throwable cause) {
    super(cause);
  }
  public BadRequestException(String msg) {
    super(msg);
  }
}

