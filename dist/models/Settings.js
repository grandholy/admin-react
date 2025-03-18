"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.__esModule = true;
exports.seedSettings = void 0;
var sequelize_1 = require("sequelize");
var database_1 = require("../db/database");
// Settings model
var Settings = /** @class */ (function (_super) {
    __extends(Settings, _super);
    function Settings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Settings;
}(sequelize_1.Model));
Settings.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    key: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    value: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    }
}, {
    sequelize: database_1.sequelize,
    tableName: 'settings',
    timestamps: true
});
// Default settings
var defaultSettings = {
    appName: 'Admin Template',
    language: 'en',
    timezone: 'UTC',
    dateFormat: 'MM/DD/YYYY',
    itemsPerPage: '10',
    darkMode: 'false',
    rtlSupport: 'false',
    defaultRole: 'user',
    sessionTimeout: '30',
    emailNotifications: 'true',
    pushNotifications: 'false',
    newUserNotifications: 'true',
    systemErrorNotifications: 'true',
    twoFactorAuth: 'false',
    passwordPolicy: 'medium',
    passwordExpiry: '90',
    maxLoginAttempts: '5'
};
// Generate default settings
var seedSettings = function () { return __awaiter(void 0, void 0, void 0, function () {
    var _i, _a, _b, key, value, existing, error_1;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 6, , 7]);
                _i = 0, _a = Object.entries(defaultSettings);
                _c.label = 1;
            case 1:
                if (!(_i < _a.length)) return [3 /*break*/, 5];
                _b = _a[_i], key = _b[0], value = _b[1];
                return [4 /*yield*/, Settings.findOne({ where: { key: key } })];
            case 2:
                existing = _c.sent();
                if (!!existing) return [3 /*break*/, 4];
                return [4 /*yield*/, Settings.create({
                        key: key,
                        value: value.toString()
                    })];
            case 3:
                _c.sent();
                console.log("Default setting ".concat(key, " created"));
                _c.label = 4;
            case 4:
                _i++;
                return [3 /*break*/, 1];
            case 5: return [3 /*break*/, 7];
            case 6:
                error_1 = _c.sent();
                console.error('Error seeding settings:', error_1);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.seedSettings = seedSettings;
exports["default"] = Settings;
