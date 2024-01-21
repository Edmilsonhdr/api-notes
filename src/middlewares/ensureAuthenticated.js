const { verify } = require("jsonwebtoken");
const AppError = require("../utils/AppError");
const authConfig = require("../configs/auth");

function ensureAuthenticated(req, res, next) {
    const authHeader = req.headers.autorization;

    if (!authHeader) {
        throw new AppError("JWT Token não informado", 401);
    }

    const [, token] = authHeader.split(" ");

    try {
        const { sub: usef_id } = verify(token, authConfig.jwt.secret);

        req.user = {
            id: Number(user_id),
        };

        return next();

    } catch {
        throw new AppError("JWT Token invalido", 401);
    }
}