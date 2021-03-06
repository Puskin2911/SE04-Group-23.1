const API_BASE_URL = 'http://127.0.0.1:8080';
// const API_BASE_URL = 'http://ec2-54-169-208-186.ap-southeast-1.compute.amazonaws.com';
const ACCESS_TOKEN = 'accessToken';

const BASE_AUTH_API_URL = '/api/auth';
const CHECK_AUTH_URL = API_BASE_URL + BASE_AUTH_API_URL + '/validate';
const LOGIN_URL = API_BASE_URL + BASE_AUTH_API_URL + '/login';
const SIGNUP_URL = API_BASE_URL + BASE_AUTH_API_URL + '/signup';

const BASE_ROOM_URL = '/api/rooms';
const JOIN_ROOM_URL = API_BASE_URL + BASE_ROOM_URL + '/join';
const LEAVE_ROOM_URL = (roomId) => API_BASE_URL + BASE_ROOM_URL + '/' + roomId + '/leave';
const GET_AVAILABLE_URL = API_BASE_URL + BASE_ROOM_URL + "/available"

const SOCKET_CONNECT_URL = API_BASE_URL + '/stomp';
const PREFIX_TRANSFER_MESSAGE = "/app";
const CHAT_SOCKET_URL = (roomId) => "/room/" + roomId + "/chat";
const READY_SOCKET_URL = (roomId) => "/room/" + roomId + "/ready";
const READY_DESTINATION_SOCKET_URL = (roomId) => PREFIX_TRANSFER_MESSAGE + READY_SOCKET_URL(roomId);

const ApiConstants = {
    ACCESS_TOKEN,
    CHECK_AUTH_URL,
    LOGIN_URL,
    SIGNUP_URL,
    JOIN_ROOM_URL,
    LEAVE_ROOM_URL,
    CHAT_SOCKET_URL,
    READY_SOCKET_URL,
    READY_DESTINATION_SOCKET_URL,
    GET_AVAILABLE_URL,
    SOCKET_CONNECT_URL
};

export default ApiConstants;