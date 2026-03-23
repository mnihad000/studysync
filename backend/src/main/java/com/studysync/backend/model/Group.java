package com.studysync.backend.model;

public class Group {
  private String id;
  private String name;
  private int dailyMinutes;
  private int streakDays;
  private int todayMinutes;
  private int membersMet;
  private int membersTotal;
  private String inviteCode;

  public Group() {
  }

  public Group(
      String id,
      String name,
      int dailyMinutes,
      int streakDays,
      int todayMinutes,
      int membersMet,
      int membersTotal,
      String inviteCode
  ) {
    this.id = id;
    this.name = name;
    this.dailyMinutes = dailyMinutes;
    this.streakDays = streakDays;
    this.todayMinutes = todayMinutes;
    this.membersMet = membersMet;
    this.membersTotal = membersTotal;
    this.inviteCode = inviteCode;
  }

  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
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

  public int getStreakDays() {
    return streakDays;
  }

  public void setStreakDays(int streakDays) {
    this.streakDays = streakDays;
  }

  public int getTodayMinutes() {
    return todayMinutes;
  }

  public void setTodayMinutes(int todayMinutes) {
    this.todayMinutes = todayMinutes;
  }

  public int getMembersMet() {
    return membersMet;
  }

  public void setMembersMet(int membersMet) {
    this.membersMet = membersMet;
  }

  public int getMembersTotal() {
    return membersTotal;
  }

  public void setMembersTotal(int membersTotal) {
    this.membersTotal = membersTotal;
  }

  public String getInviteCode() {
    return inviteCode;
  }

  public void setInviteCode(String inviteCode) {
    this.inviteCode = inviteCode;
  }
}
