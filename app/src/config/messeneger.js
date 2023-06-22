"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var amqp = require("amqplib");
require("dotenv").config();
var url = process.env.RABBIT_URL;
var RabbitMQConnector = /** @class */ (function () {
    function RabbitMQConnector(url) {
        this.isConnected = false;
        this.url = url;
        this.connection = null;
        this.channel = null;
    }
    RabbitMQConnector.prototype.connect = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, error_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (this.isConnected) {
                            return [2 /*return*/];
                        }
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 4, , 5]);
                        _a = this;
                        return [4 /*yield*/, amqp.connect(this.url)];
                    case 2:
                        _a.connection = _c.sent();
                        _b = this;
                        return [4 /*yield*/, this.connection.createChannel()];
                    case 3:
                        _b.channel = _c.sent();
                        this.isConnected = true;
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _c.sent();
                        console.error("Error connecting to RabbitMQ:", error_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    RabbitMQConnector.prototype.sendMessage = function (queue, message) {
        return __awaiter(this, void 0, void 0, function () {
            var error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (!this.channel) {
                            // noinspection ExceptionCaughtLocallyJS
                            throw new Error("RabbitMQ channel is not initialized");
                        }
                        return [4 /*yield*/, this.channel.assertQueue(queue)];
                    case 1:
                        _a.sent();
                        this.channel.sendToQueue(queue, Buffer.from(message));
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        console.error("Error sending message:", error_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    RabbitMQConnector.prototype.consume = function (queue) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var _a, _b, error_3;
                        var _this = this;
                        return __generator(this, function (_c) {
                            switch (_c.label) {
                                case 0:
                                    _c.trys.push([0, 4, , 5]);
                                    _a = this;
                                    return [4 /*yield*/, amqp.connect(this.url)];
                                case 1:
                                    _a.connection = _c.sent();
                                    _b = this;
                                    return [4 /*yield*/, this.connection.createChannel()];
                                case 2:
                                    _b.channel = _c.sent();
                                    // Ensure the queue exists before consuming messages
                                    return [4 /*yield*/, this.channel.assertQueue(queue)];
                                case 3:
                                    // Ensure the queue exists before consuming messages
                                    _c.sent();
                                    // Start consuming messages from the queue
                                    this.channel.consume(queue, function (message) {
                                        if (message) {
                                            var messageContent = message.content.toString();
                                            console.log("Received message:", messageContent);
                                            _this.channel.ack(message);
                                            resolve(messageContent);
                                        }
                                    });
                                    return [3 /*break*/, 5];
                                case 4:
                                    error_3 = _c.sent();
                                    console.error("Error connecting to RabbitMQ:", error_3);
                                    reject(error_3);
                                    return [3 /*break*/, 5];
                                case 5: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    RabbitMQConnector.prototype.close = function () {
        return __awaiter(this, void 0, void 0, function () {
            var error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.channel.close()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.connection.close()];
                    case 2:
                        _a.sent();
                        console.log("RabbitMQ connection closed");
                        return [3 /*break*/, 4];
                    case 3:
                        error_4 = _a.sent();
                        console.error("Error closing RabbitMQ connection:", error_4);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return RabbitMQConnector;
}());
module.exports = new RabbitMQConnector(url);
