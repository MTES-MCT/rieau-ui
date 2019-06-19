import auth from 'utils/auth';

test('signin ok', async () => {
  await auth.login();
  expect(auth.isAuthenticated()).toBe(true);
  expect(auth.getUser()).toBe('test');
});
test('signout ok', async () => {
  await auth.login();
  await auth.logout();
  expect(auth.isAuthenticated()).toBe(false);
});
