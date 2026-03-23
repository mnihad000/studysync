package com.studysync.backend.service;

import com.studysync.backend.dto.CreateGroupRequest;
import com.studysync.backend.model.Group;
import java.security.SecureRandom;
import java.util.List;
import java.util.UUID;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
public class GroupService {
  private final JdbcTemplate jdbcTemplate;
  private final SecureRandom random = new SecureRandom();
  private static final char[] INVITE_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789".toCharArray();
  private static final RowMapper<Group> GROUP_ROW_MAPPER = (rs, rowNum) -> new Group(
      rs.getString("id"),
      rs.getString("name"),
      rs.getInt("daily_minutes"),
      rs.getInt("streak_days"),
      rs.getInt("today_minutes"),
      rs.getInt("members_met"),
      rs.getInt("members_total"),
      rs.getString("invite_code")
  );

  public GroupService(JdbcTemplate jdbcTemplate) {
    this.jdbcTemplate = jdbcTemplate;
  }

  public List<Group> getAllGroups(String userIdClaim) {
    UUID userId = parseUserId(userIdClaim);
    return jdbcTemplate.query(
        """
        select
          g.id,
          g.name,
          g.daily_minutes,
          g.streak_days,
          g.today_minutes,
          g.members_met,
          count(gm_all.user_id)::integer as members_total,
          g.invite_code
        from public.group_members gm_self
        join public.groups g on g.id = gm_self.group_id
        left join public.group_members gm_all on gm_all.group_id = g.id
        where gm_self.user_id = ?
        group by g.id, g.name, g.daily_minutes, g.streak_days, g.today_minutes, g.members_met, g.invite_code, g.created_at
        order by g.created_at desc
        """,
        GROUP_ROW_MAPPER,
        userId
    );
  }

  @Transactional
  public Group createGroup(String userIdClaim, CreateGroupRequest request) {
    UUID userId = parseUserId(userIdClaim);
    if (request == null || request.getName() == null || request.getName().trim().isEmpty()) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Group name is required.");
    }
    if (request.getDailyMinutes() <= 0) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Daily minutes must be positive.");
    }

    String groupId = generateGroupId();
    String name = request.getName().trim();
    int dailyMinutes = request.getDailyMinutes();

    for (int attempts = 0; attempts < 6; attempts += 1) {
      String inviteCode = generateInviteCode();
      try {
        jdbcTemplate.update(
            """
            insert into public.groups (
              id, name, daily_minutes, streak_days, today_minutes, members_met, invite_code
            ) values (?, ?, ?, 0, 0, 0, ?)
            """,
            groupId,
            name,
            dailyMinutes,
            inviteCode
        );

        jdbcTemplate.update(
            "insert into public.group_members (group_id, user_id) values (?, ?)",
            groupId,
            userId
        );

        return fetchGroupById(groupId);
      } catch (DataIntegrityViolationException ex) {
        // Retry on unlikely invite code collision; for other collisions we eventually fail.
      }
    }

    throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Unable to create group.");
  }

  @Transactional
  public Group joinGroup(String userIdClaim, String inviteCode) {
    UUID userId = parseUserId(userIdClaim);
    if (inviteCode == null || inviteCode.trim().isEmpty()) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invite code is required.");
    }

    String normalized = inviteCode.trim().toUpperCase();
    String groupId = jdbcTemplate.query(
        "select id from public.groups where invite_code = ?",
        rs -> rs.next() ? rs.getString("id") : null,
        normalized
    );

    if (groupId == null) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Invite code not found.");
    }

    jdbcTemplate.update(
        """
        insert into public.group_members (group_id, user_id)
        values (?, ?)
        on conflict (group_id, user_id) do nothing
        """,
        groupId,
        userId
    );

    return fetchGroupById(groupId);
  }

  private Group fetchGroupById(String groupId) {
    List<Group> groups = jdbcTemplate.query(
        """
        select
          g.id,
          g.name,
          g.daily_minutes,
          g.streak_days,
          g.today_minutes,
          g.members_met,
          count(gm.user_id)::integer as members_total,
          g.invite_code
        from public.groups g
        left join public.group_members gm on gm.group_id = g.id
        where g.id = ?
        group by g.id, g.name, g.daily_minutes, g.streak_days, g.today_minutes, g.members_met, g.invite_code
        """,
        GROUP_ROW_MAPPER,
        groupId
    );
    if (groups.isEmpty()) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Group not found.");
    }
    return groups.get(0);
  }

  private UUID parseUserId(String userIdClaim) {
    if (userIdClaim == null || userIdClaim.trim().isEmpty()) {
      throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User identity is missing from token.");
    }
    try {
      return UUID.fromString(userIdClaim.trim());
    } catch (IllegalArgumentException ex) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid authenticated user id.");
    }
  }

  private String generateGroupId() {
    return "grp_" + UUID.randomUUID().toString().replace("-", "").substring(0, 12);
  }

  private String generateInviteCode() {
    StringBuilder builder = new StringBuilder(6);
    for (int i = 0; i < 6; i += 1) {
      builder.append(INVITE_CHARS[random.nextInt(INVITE_CHARS.length)]);
    }
    return builder.toString();
  }
}
