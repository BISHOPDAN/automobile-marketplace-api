"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
dotenv_1.default.config();
function startServer() {
    const app = (0, app_1.default)();
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        const baseUrl = process.env.NODE_ENV === 'production' ? process.env.BASE_URL : `http://localhost:${port}`;
        console.log(`Server running on ${baseUrl}`);
        const dbUri = process.env.DB_URI;
        if (!dbUri) {
            console.error('DB connection string is missing.');
            process.exit(1);
        }
        mongoose_1.default.set('strictQuery', false);
        // Connect to the database using promises
        mongoose_1.default.connect(dbUri, { ignoreUndefined: true })
            .then(() => {
            console.log('automobile 🙏 [connected]');
            console.log(`App URL: ${baseUrl}`);
        })
            .catch((err) => {
            console.error('Failed to connect to DB:', err);
        });
    });
}
startServer();
