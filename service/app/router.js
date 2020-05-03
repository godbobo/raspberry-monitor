module.exports = app => {
  const { router, controller, jwt } = app;
  router.get('/', controller.home.index);
  router.post('/api/v1/user/login', controller.user.login)
  router.put('/api/v1/machine/control', jwt, controller.machineInfos.control)
  router.resources('machineInfos', '/api/v1/machine/infos', jwt, app.controller.machineInfos)
};