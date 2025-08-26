export function setRoutes(app: any) {
    const indexController = new (require('../controllers/index').IndexController)();

    app.get('/', indexController.index);
    // Add more routes as needed
}