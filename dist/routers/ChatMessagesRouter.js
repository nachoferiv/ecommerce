"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatMessagesRouter = void 0;
var express_1 = __importDefault(require("express"));
var ChatMessagesController_1 = require("../controllers/ChatMessagesController");
var Auth_1 = require("../middlewares/Auth");
exports.chatMessagesRouter = express_1.default.Router();
var chatMessageController = new ChatMessagesController_1.ChatMessagesController();
exports.chatMessagesRouter.get('/:id?', chatMessageController.get);
exports.chatMessagesRouter.post('', Auth_1.isAuthorized, chatMessageController.create);
exports.chatMessagesRouter.put('/:id', Auth_1.isAuthorized, chatMessageController.update);
exports.chatMessagesRouter.delete('/:id', Auth_1.isAuthorized, chatMessageController.delete);
