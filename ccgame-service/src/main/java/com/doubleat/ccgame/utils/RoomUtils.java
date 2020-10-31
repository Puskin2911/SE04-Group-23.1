package com.doubleat.ccgame.utils;

import com.doubleat.ccgame.dto.common.Player;
import com.doubleat.ccgame.exception.RoomIsFullPlayersException;
import com.doubleat.ccgame.exception.RoomNotFoundException;
import com.doubleat.ccgame.dto.common.Room;

/**
 * @author Hop Nguyen
 */
public final class RoomUtils {

    /**
     * Return current players in specific room.
     *
     * @param room room need to get current players.
     * @return current players in specific room.
     * @throws RoomNotFoundException if {@code room} is null
     */
    public static int getCurrentPlayers(Room room) throws RoomNotFoundException {
        if (room == null) throw new RoomNotFoundException();

        int totals = 0;
        if (room.getRedPlayer() != null) totals++;
        if (room.getBlackPlayer() != null) totals++;

        return totals;
    }

    /**
     * Add specific player to specific room.
     *
     * @param player the player need to add to room.
     * @param room   the room need to add player.
     * @throws RoomNotFoundException      if {@code room} is null.
     * @throws RoomIsFullPlayersException if {@code room} is full players.
     */
    public static void addPlayerToRoom(Player player, Room room) throws RoomNotFoundException, RoomIsFullPlayersException {
        if (room == null) throw new RoomNotFoundException();
        if (getCurrentPlayers(room) > 2) throw new RoomIsFullPlayersException();

        if (room.getRedPlayer() == null) room.setRedPlayer(player);
        else room.setBlackPlayer(player);
    }

    /**
     * Remove specific player to specific room.
     *
     * @param player the player need to remove to room.
     * @param room   the room need to remove player.
     * @throws RoomNotFoundException if {@code room} is null.
     */
    public static void removePlayerFromRoom(Player player, Room room) throws RoomNotFoundException {
        if (room == null) throw new RoomNotFoundException();

        Player redPlayer = room.getRedPlayer();
        if (redPlayer.equals(player)) {
            room.setRedPlayer(null);
            return;
        }

        Player blackPlayer = room.getBlackPlayer();
        if (blackPlayer.equals(player)) {
            room.setBlackPlayer(null);
        }
    }

    /**
     * Add specific viewer to specific room.
     *
     * @param viewer the viewer need to add to room.
     * @param room   the room need to add viewer.
     * @throws RoomNotFoundException if {@code room} is null.
     */
    public static void addViewerToRoom(Player viewer, Room room) throws RoomNotFoundException {
        if (room == null) throw new RoomNotFoundException();
        room.getViewers().add(viewer);
    }

    /**
     * Remove specific viewer to specific room.
     *
     * @param viewer the viewer need to remove to room.
     * @param room   the room need to remove viewer.
     * @throws RoomNotFoundException if {@code room} is null.
     */
    public static void removeViewerFromRoom(Player viewer, Room room) throws RoomNotFoundException {
        if (room == null) throw new RoomNotFoundException();
        room.getViewers().remove(viewer);
    }

    /**
     * Return number of ready players in specific room.
     *
     * @param room room need to return number of ready players.
     * @return number of ready players in specific room.
     * @throws RoomNotFoundException if {@code room} is null.
     */
    public static int getReadyPlayers(Room room) throws RoomNotFoundException {
        if (room == null) throw new RoomNotFoundException();

        int readyPlayers = 0;
        if (room.getBlackPlayer() != null && room.getBlackPlayer().isReady()) readyPlayers++;
        if (room.getRedPlayer() != null && room.getRedPlayer().isReady()) readyPlayers++;

        return readyPlayers;
    }

    /**
     * Update specific ready player to {@code isReady} in specific room.
     *
     * @param username username of player need to update {@code ready}.
     * @param isReady  state to update for use. {@code true} or {@code false}.
     * @param room     room where have player.
     * @throws RoomNotFoundException if {@code room} is null.
     */
    public static void updateReadyPlayerInRoom(String username, boolean isReady, Room room) throws RoomNotFoundException {
        assert username != null;

        Player redPlayer = room.getRedPlayer();
        if (redPlayer != null && redPlayer.getUsername().equals(username)) {
            redPlayer.setReady(isReady);
        } else {
            Player blackPlayer = room.getBlackPlayer();
            if (blackPlayer != null && blackPlayer.getUsername().equals(username)) {
                blackPlayer.setReady(isReady);
            }
        }
    }

}
