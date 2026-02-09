"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.firebaseConfig = void 0;
const env_1 = require("./env");
exports.firebaseConfig = {
    projectId: env_1.envConfig.firebaseProjectId,
    privateKey: env_1.envConfig.firebasePrivateKey,
    clientEmail: env_1.envConfig.firebaseClientEmail,
};
//# sourceMappingURL=firebase.config.js.map