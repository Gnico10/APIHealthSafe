"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('*', (req, res) => { res.render('/public/index.html'); });
router.post('*', (req, res) => { res.render('/public/index.html'); });
router.put('*', (req, res) => { res.render('/public/index.html'); });
router.delete('*', (req, res) => { res.render('/public/index.html'); });
exports.default = router;
//# sourceMappingURL=default.js.map