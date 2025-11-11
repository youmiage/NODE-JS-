const url = require('url');
const sendJson = require('./utils/sendJson');
const logger = require('./utils/logger');

// hna kanimportiw les contrôleurs li ghadi ydirou les opérations dyal API
const productsController = require('./controllers/productsController');
const ordersController = require('./controllers/ordersController');
const healthController = require('./controllers/healthController');
const exportController = require('./controllers/exportController');
// hna kan3rfo les routes (chemins) dyal l’API
// kanst3mlo les expressions régulières bach n9dro njbdo des paramètres men l’URL (b7al id, sku, etc.)
const routes = [
    { method: 'GET', path: /^\/api\/products\/?$/, handler: productsController.listProducts },
    { method: 'GET', path: /^\/api\/products\/([0-9]+)\/?$/, handler: productsController.getProduct, params: ['id'] },
    { method: 'GET', path: /^\/api\/products\/sku\/(.+)\/?$/, handler: productsController.getProductBySku, params: ['sku'] },
    { method: 'GET', path: /^\/api\/orders\/?$/, handler: ordersController.listOrders },
    { method: 'GET', path: /^\/api\/orders\/([0-9]+)\/?$/, handler: ordersController.getOrder, params: ['id'] },
    { method: 'GET', path: /^\/api\/orders\/number\/(.+)\/?$/, handler: ordersController.getOrderByNumber, params: ['orderNumber'] },
    { method: 'GET', path: /^\/health\/?$/, handler: healthController.getHealth },
    { method: 'GET', path: /^\/api\/export\.gz\/?$/, handler: exportController.getExport },


];

// hadi l fonction li katdir le routage (router)
// hiya li kat9ra l’URL w kat3ref ach men contrôleur khaso ytsala
function router(req, res) {
    // kanparseiw l’URL bach njbdo le chemin (pathname) w les query params
    const parsedUrl = url.parse(req.url, true);
    const { pathname, query } = parsedUrl;
    const { method } = req;

    // kan9albo 3la route li katmatchi m3a had l’URL
    const matchedRoute = routes.find(route => route.method === method && route.path.test(pathname));
    
    // kanzido les query params f req bach n9dro nst3mlohom f les contrôleurs
    req.query = query;

    if (matchedRoute) {
        // kanjbdou les valeurs dyal les paramètres men l’URL (ex: /products/5 => id = 5)
        const matches = pathname.match(matchedRoute.path);
        req.params = {};
        if (matchedRoute.params && matches.length > 1) {
            matchedRoute.params.forEach((paramName, index) => {
                req.params[paramName] = matches[index + 1];
            });
        }
        
        // mnin kattsala réponse, kanlogiwha (statusCode, route, etc.)
        res.on('finish', () => {
            logger.emit('response:sent', {
                statusCode: res.statusCode,
                route: matchedRoute.path.toString(),
                method,
                url: req.url
            });
        });
        
        // kan3ayto l contrôleur li m3a had route
        return matchedRoute.handler(req, res);
    }

    // ila ma kanatch route katsawb match, kanrslou 404 Not Found
    res.on('finish', () => {
        logger.emit('response:sent', {
            statusCode: res.statusCode,
            route: 'Not Found',
            method,
            url: req.url
        });
    });
    sendJson(res, 404, { error: 'Not Found' });
}


// kanexportiw router bach n9dro nst3mlo f app principal
module.exports = router;
