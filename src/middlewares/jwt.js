const { verifyJwt, getTokenFromHeaders } = require('../helpers/jwt');

const checkJwt = (req, res, next) => {
    const { url: path } = req;

    const excludedpatchs = ['/auth/sign-in', '/auth/sign-up', '/auth/refresh'];
    const isExcluded = !!excludedpatchs.find((p) => p.startsWith(path))
    if (isExcluded) return next();

    let token = getTokenFromHeaders(req.headers);
    token = token ? token.slice(7, token.length) : null;
    if (!token) {
        return res.jsonUnauthorized(null, 'Invalid token');
    }

    try {
        const decoded = verifyJwt(token);
        req.accountId = decoded.id;
        next();
    } catch (error) {
        return res.jsonUnauthorized(null, 'Invalid token');
    }
};

module.exports = checkJwt;