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
exports.seedThemes = void 0;
var sequelize_1 = require("sequelize");
var database_1 = require("../db/database");
var Theme = /** @class */ (function (_super) {
    __extends(Theme, _super);
    function Theme() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Theme;
}(sequelize_1.Model));
Theme.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false
    },
    isDefault: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    primary: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: false,
        defaultValue: '#1890ff'
    },
    secondary: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: false,
        defaultValue: '#52c41a'
    },
    background: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: false,
        defaultValue: '#f0f2f5'
    },
    sidebarBackground: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: false,
        defaultValue: '#001529'
    },
    headerBackground: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: false,
        defaultValue: '#fff'
    },
    textPrimary: {
        type: sequelize_1.DataTypes.STRING(30),
        allowNull: false,
        defaultValue: 'rgba(0, 0, 0, 0.85)'
    },
    textSecondary: {
        type: sequelize_1.DataTypes.STRING(30),
        allowNull: false,
        defaultValue: 'rgba(0, 0, 0, 0.45)'
    },
    menuItemBackground: {
        type: sequelize_1.DataTypes.STRING(30),
        allowNull: false,
        defaultValue: 'transparent'
    },
    menuItemSelectedBackground: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: false,
        defaultValue: '#1890ff'
    },
    menuItemText: {
        type: sequelize_1.DataTypes.STRING(30),
        allowNull: false,
        defaultValue: 'rgba(255, 255, 255, 0.65)'
    },
    menuItemSelectedText: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: false,
        defaultValue: '#fff'
    },
    menuItemHoverBackground: {
        type: sequelize_1.DataTypes.STRING(30),
        allowNull: false,
        defaultValue: '#1890ff33'
    },
    menuItemHoverText: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: false,
        defaultValue: '#fff'
    },
    isDarkMode: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    sequelize: database_1.sequelize,
    tableName: 'themes',
    timestamps: true,
    hooks: {
        afterCreate: function (theme) { return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!theme.isDefault) return [3 /*break*/, 2];
                        return [4 /*yield*/, Theme.update({ isDefault: false }, { where: { id: (_a = {}, _a[database_1.sequelize.getDialect() === 'postgres' ? 'ne' : '!='] = theme.id, _a) } })];
                    case 1:
                        _b.sent();
                        _b.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); },
        afterUpdate: function (theme) { return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!theme.isDefault) return [3 /*break*/, 2];
                        return [4 /*yield*/, Theme.update({ isDefault: false }, { where: { id: (_a = {}, _a[database_1.sequelize.getDialect() === 'postgres' ? 'ne' : '!='] = theme.id, _a) } })];
                    case 1:
                        _b.sent();
                        _b.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); }
    }
});
// Generate default themes
var seedThemes = function () { return __awaiter(void 0, void 0, void 0, function () {
    var count, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                return [4 /*yield*/, Theme.count()];
            case 1:
                count = _a.sent();
                if (!(count === 0)) return [3 /*break*/, 3];
                return [4 /*yield*/, Theme.bulkCreate([
                        {
                            name: 'Default Light',
                            isDefault: true,
                            primary: '#1890ff',
                            secondary: '#52c41a',
                            background: '#f0f2f5',
                            sidebarBackground: '#001529',
                            headerBackground: '#fff',
                            textPrimary: 'rgba(0, 0, 0, 0.85)',
                            textSecondary: 'rgba(0, 0, 0, 0.45)',
                            menuItemBackground: 'transparent',
                            menuItemSelectedBackground: '#1890ff',
                            menuItemText: 'rgba(255, 255, 255, 0.65)',
                            menuItemSelectedText: '#fff',
                            menuItemHoverBackground: '#1890ff33',
                            menuItemHoverText: '#fff',
                            isDarkMode: false
                        },
                        {
                            name: 'Default Dark',
                            isDefault: false,
                            primary: '#1890ff',
                            secondary: '#52c41a',
                            background: '#141414',
                            sidebarBackground: '#000000',
                            headerBackground: '#1f1f1f',
                            textPrimary: 'rgba(255, 255, 255, 0.85)',
                            textSecondary: 'rgba(255, 255, 255, 0.45)',
                            menuItemBackground: '#1f1f1f',
                            menuItemSelectedBackground: '#1890ff',
                            menuItemText: 'rgba(255, 255, 255, 0.65)',
                            menuItemSelectedText: '#fff',
                            menuItemHoverBackground: '#1890ff33',
                            menuItemHoverText: '#fff',
                            isDarkMode: true
                        },
                        {
                            name: 'Blue & Green',
                            isDefault: false,
                            primary: '#0052cc',
                            secondary: '#36b37e',
                            background: '#f5f7fa',
                            sidebarBackground: '#172b4d',
                            headerBackground: '#ffffff',
                            textPrimary: '#172b4d',
                            textSecondary: '#6b778c',
                            menuItemBackground: 'transparent',
                            menuItemSelectedBackground: '#0052cc',
                            menuItemText: 'rgba(255, 255, 255, 0.7)',
                            menuItemSelectedText: '#ffffff',
                            menuItemHoverBackground: 'rgba(0, 82, 204, 0.3)',
                            menuItemHoverText: '#ffffff',
                            isDarkMode: false
                        },
                    ])];
            case 2:
                _a.sent();
                console.log('Default themes have been created');
                _a.label = 3;
            case 3: return [3 /*break*/, 5];
            case 4:
                error_1 = _a.sent();
                console.error('Error seeding themes:', error_1);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.seedThemes = seedThemes;
exports["default"] = Theme;
