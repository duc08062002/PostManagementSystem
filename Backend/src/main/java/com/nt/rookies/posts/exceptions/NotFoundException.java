package com.nt.rookies.posts.exceptions;

public class NotFoundException extends RuntimeException{
  public NotFoundException() {}
  public NotFoundException(Throwable cause) {
    super(cause);
  }
  public NotFoundException(String msg) {
    super(msg);
  }
}
