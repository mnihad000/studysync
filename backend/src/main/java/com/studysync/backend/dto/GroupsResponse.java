package com.studysync.backend.dto;

import com.studysync.backend.model.Group;
import java.util.List;

public class GroupsResponse {
  private List<Group> groups;

  public GroupsResponse() {
  }

  public GroupsResponse(List<Group> groups) {
    this.groups = groups;
  }

  public List<Group> getGroups() {
    return groups;
  }

  public void setGroups(List<Group> groups) {
    this.groups = groups;
  }
}
