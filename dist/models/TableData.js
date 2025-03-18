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
exports.seedTableData = void 0;
var sequelize_1 = require("sequelize");
var database_1 = require("../db/database");
var TableData = /** @class */ (function (_super) {
    __extends(TableData, _super);
    function TableData() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return TableData;
}(sequelize_1.Model));
TableData.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    },
    category: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    stock: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize: database_1.sequelize,
    tableName: 'table_data',
    timestamps: true
});
// Sample data for the demo table
var sampleData = [
    {
        name: 'Product A',
        description: 'High-quality product with excellent features',
        category: 'Electronics',
        status: 'In Stock',
        price: 99.99,
        stock: 100
    },
    {
        name: 'Product B',
        description: 'Premium product with advanced capabilities',
        category: 'Electronics',
        status: 'Low Stock',
        price: 199.99,
        stock: 15
    },
    {
        name: 'Product C',
        description: 'Basic product for everyday use',
        category: 'Accessories',
        status: 'Out of Stock',
        price: 49.99,
        stock: 0
    },
    {
        name: 'Product D',
        description: 'Luxury product with premium features',
        category: 'Electronics',
        status: 'In Stock',
        price: 299.99,
        stock: 50
    },
    {
        name: 'Product E',
        description: 'Essential product for daily needs',
        category: 'Accessories',
        status: 'In Stock',
        price: 79.99,
        stock: 200
    },
    {
        name: 'Product F',
        description: 'Professional grade product',
        category: 'Electronics',
        status: 'Low Stock',
        price: 399.99,
        stock: 10
    },
    {
        name: 'Product G',
        description: 'Budget-friendly product',
        category: 'Accessories',
        status: 'In Stock',
        price: 29.99,
        stock: 150
    },
    {
        name: 'Product H',
        description: 'High-end product with premium quality',
        category: 'Electronics',
        status: 'Out of Stock',
        price: 599.99,
        stock: 0
    },
];
// Seed table data
var seedTableData = function () { return __awaiter(void 0, void 0, void 0, function () {
    var count, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                return [4 /*yield*/, TableData.count()];
            case 1:
                count = _a.sent();
                if (!(count === 0)) return [3 /*break*/, 3];
                return [4 /*yield*/, TableData.bulkCreate(sampleData)];
            case 2:
                _a.sent();
                console.log('Sample table data has been created');
                _a.label = 3;
            case 3: return [3 /*break*/, 5];
            case 4:
                error_1 = _a.sent();
                console.error('Error seeding table data:', error_1);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.seedTableData = seedTableData;
exports["default"] = TableData;
