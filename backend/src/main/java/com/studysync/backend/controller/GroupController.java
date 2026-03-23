package com.studysync.backend.controller;

import com.studysync.backend.dto.CreateGroupRequest;
import com.studysync.backend.dto.GroupsResponse;
import com.studysync.backend.dto.JoinGroupRequest;
import com.studysync.backend.model.Group;
import com.studysync.backend.service.GroupService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1")
public class GroupController {
  private final GroupService groupService;

  public GroupController(GroupService groupService) {
    this.groupService = groupService;
  }

  @GetMapping("/me/groups")
  public GroupsResponse getMyGroups(@AuthenticationPrincipal Jwt jwt) {
    return new GroupsResponse(groupService.getAllGroups(jwt.getSubject()));
  }

  @PostMapping("/groups")
  public Group createGroup(
      @AuthenticationPrincipal Jwt jwt,
      @RequestBody CreateGroupRequest request
  ) {
    return groupService.createGroup(jwt.getSubject(), request);
  }

  @PostMapping("/groups/join")
  public Group joinGroup(
      @AuthenticationPrincipal Jwt jwt,
      @RequestBody JoinGroupRequest request
  ) {
    return groupService.joinGroup(jwt.getSubject(), request == null ? null : request.getInviteCode());
  }
}
