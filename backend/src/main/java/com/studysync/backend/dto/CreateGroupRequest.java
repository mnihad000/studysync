package com.studysync.backend.dto;

public class CreateGroupRequest {
  private String name;
  private int dailyMinutes;

  public CreateGroupRequest() {
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public int getDailyMinutes() {
    return dailyMinutes;
  }

  public void setDailyMinutes(int dailyMinutes) {
    this.dailyMinutes = dailyMinutes;
  }
}
