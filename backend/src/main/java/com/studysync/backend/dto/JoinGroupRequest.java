package com.studysync.backend.dto;

public class JoinGroupRequest {
  private String inviteCode;

  public JoinGroupRequest() {
  }

  public String getInviteCode() {
    return inviteCode;
  }

  public void setInviteCode(String inviteCode) {
    this.inviteCode = inviteCode;
  }
}
