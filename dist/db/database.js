"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.Sequelize = exports.sequelize = void 0;
var sequelize_1 = require("sequelize");
exports.Sequelize = sequelize_1.Sequelize;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
// Read database configuration from file or environment variables
var dbConfig = {
    dialect: process.env.DB_DIALECT || 'sqlite',
    storage: process.env.DB_STORAGE || path_1["default"].join(__dirname, '../../../data/database.sqlite')
};
// Attempt to read configuration from a JSON file
try {
    var configPath = path_1["default"].join(__dirname, '../../../data/dbconfig.json');
    if (fs_1["default"].existsSync(configPath)) {
        var configJson = JSON.parse(fs_1["default"].readFileSync(configPath, 'utf8'));
        dbConfig = __assign(__assign({}, dbConfig), configJson);
        console.log('Database configuration loaded from file');
    }
}
catch (error) {
    console.warn('Failed to load database configuration from file, using defaults:', error);
}
// Configure Sequelize based on the database type
var sequelize;
exports.sequelize = sequelize;
switch (dbConfig.dialect) {
    case 'mysql':
        exports.sequelize = sequelize = new sequelize_1.Sequelize({
            dialect: 'mysql',
            host: dbConfig.host || 'localhost',
            port: dbConfig.port || 3306,
            username: dbConfig.username || 'root',
            password: dbConfig.password || '',
            database: dbConfig.database || 'admin_template',
            logging: console.log
        });
        break;
    case 'postgres':
        exports.sequelize = sequelize = new sequelize_1.Sequelize({
            dialect: 'postgres',
            host: dbConfig.host || 'localhost',
            port: dbConfig.port || 5432,
            username: dbConfig.username || 'postgres',
            password: dbConfig.password || '',
            database: dbConfig.database || 'admin_template',
            logging: console.log
        });
        break;
    case 'mssql':
        exports.sequelize = sequelize = new sequelize_1.Sequelize({
            dialect: 'mssql',
            host: dbConfig.host || 'localhost',
            port: dbConfig.port || 1433,
            username: dbConfig.username || 'sa',
            password: dbConfig.password || '',
            database: dbConfig.database || 'admin_template',
            logging: console.log
        });
        break;
    case 'sqlite':
    default:
        // Ensure the directory exists
        var dbDir = path_1["default"].dirname(dbConfig.storage);
        if (!fs_1["default"].existsSync(dbDir)) {
            fs_1["default"].mkdirSync(dbDir, { recursive: true });
        }
        exports.sequelize = sequelize = new sequelize_1.Sequelize({
            dialect: 'sqlite',
            storage: dbConfig.storage,
            logging: console.log
        });
        break;
}
// Test database connection
sequelize.authenticate()
    .then(function () {
    console.log('Database connection established successfully.');
})["catch"](function (err) {
    console.error('Unable to connect to the database:', err);
});
