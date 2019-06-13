import auth from 'utils/auth';
import { now } from 'moment';

test('expired token', () => {
  let expiredToken = { expiresAt: now() - 100000 };
  expect(auth.hasTokenExpired(expiredToken)).toBe(true);
});
test('not expired token', () => {
  let notExpiredToken = { expiresAt: now() + 100000 };
  expect(auth.hasTokenExpired(notExpiredToken)).toBe(false);
});
test('login ok', async () => {
  await auth.login('test@test.fr', 'test1234');
  expect(auth.isAuthenticated()).toBe(true);
  expect(auth.getProfile()).toBe('test');
});
test('signout', async () => {
  await auth.login('test@test.fr', 'test1234');
  await auth.logout();
  expect(auth.isAuthenticated()).toBe(false);
});
