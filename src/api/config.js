let isLocalhost = location.hostname == "localhost";

export default {
    token: () => localStorage.token,
    domain: isLocalhost ? "http://localhost:3031": "http://domain/api"
}
