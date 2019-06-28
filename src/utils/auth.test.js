import auth from 'utils/auth';
import users from './users-mock';

test('signin ok', async () => {
  await auth.login('jean.martin');
  expect(await auth.isAuthenticated()).toBe(true);
  expect(await auth.getUser()).toBe(users[0]);
});
test('signout ok', async () => {
  await auth.login('jean.martin');
  await auth.logout();
  expect(await auth.isAuthenticated()).toBe(false);
});
