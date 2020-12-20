package com.doubleat.ccgame.controller;

import com.doubleat.ccgame.domain.User;
import com.doubleat.ccgame.dto.converter.UserConverter;
import com.doubleat.ccgame.dto.response.RoomDto;
import com.doubleat.ccgame.room.RoomStrategy;
import com.doubleat.ccgame.service.UserService;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = RoomController.PREFIX_ROOM_RESOURCE_URL)
@Api(tags = { "room service" })
public class RoomController {

    public static final String PREFIX_ROOM_RESOURCE_URL = "/api/rooms";

    @Autowired
    private RoomStrategy roomStrategy;

    @Autowired
    private UserService userService;

    @Autowired
    private UserConverter userConverter;

    @GetMapping(value = "/join")
    public ResponseEntity<RoomDto> joinRoom(Authentication authentication) {
        User user = userService.getByUsername(authentication.getName());
        RoomDto room = roomStrategy.playerJoinRoom(userConverter.toDto(user));

        return ResponseEntity.ok(room);
    }

    @GetMapping(value = "/{roomId}/leave")
    public ResponseEntity<Boolean> leaveRoom(@PathVariable int roomId, Authentication authentication) {
        User user = userService.getByUsername(authentication.getName());
        Boolean success = roomStrategy.playerLeaveRoom(userConverter.toDto(user), roomId);

        return ResponseEntity.ok(success);
    }

    @GetMapping(value = "/{roomId}/join")
    public ResponseEntity<RoomDto> joinSpecificRoom(@PathVariable int roomId, Authentication authentication) {
        User user = userService.getByUsername(authentication.getName());
        RoomDto room = roomStrategy.playerJoinRoom(userConverter.toDto(user), roomId);

        return ResponseEntity.ok(room);
    }

    @GetMapping(value = "/available")
    public ResponseEntity<RoomDto> getAvailableRoom() {
        RoomDto room = roomStrategy.getAvailableRoom();

        return ResponseEntity.ok(room);
    }

}
