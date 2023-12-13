class ApiResponse {
    constructor(statusCode, data, message = "SUccess") {
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
    }
}

export { ApiResponse }

// 200 OK
// 201 Created
// 202 Accepted
// 203 Non-Authoritative Information
// 204 No Content

/*
Class 1xx – Informational: If an HTTP status code 1xx is transmitted, the server informs the client that the request is in motion. This
class combines codes that are responsible for delivering information to the client during the request.

Class 2xx – Success: A 2xx code announces a successful operation. If this code is transmitted, it means that the client’s request was
received by the server, understood, and accepted. 2xx codes are often sent at the same time as the desired website information, and the
user often only takes notice of the website they have requested.

Class 3xx – Redirection: A 3xx code shows that the server’s request was received. In order to ensure the request is successfully
processed, further steps are needed from the client’send. 3xx codes appear during redirections and forwardings.

Class 4xx – Client error: If a 4xx code appears then there’s been a client error. The server has received the request, but cannot perform
it. The reason behind this is usually an incorrect request. Internet users will be made aware of this error by receiving an automatically
generated HTML page.

Class 5xx – Server error: A 5xx code is shown when the server has failed to perform the request. These server error codes report that the
request cannot be performed at present or is not possible at all, which then leads to an HTML error page.     */