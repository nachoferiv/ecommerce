"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatMessage = void 0;
var ChatMessage = /** @class */ (function () {
    function ChatMessage(id, email, message, tiemstamp) {
        this.id = id;
        this.email = email;
        this.message = message;
        this.tiemstamp = tiemstamp;
    }
    return ChatMessage;
}());
exports.ChatMessage = ChatMessage;
