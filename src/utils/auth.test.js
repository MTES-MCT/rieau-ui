import auth from 'utils/auth';
import users from './users-mock';

test('signin ok', async () => {
  await auth.login('jean.martin');
  expect(await auth.isAuthenticated()).toBe(true);
  expect(await auth.getUser()).toBe(users[0]);
  expect(await auth.isBeta()).toBe(true);
  expect(await auth.isDepositaire()).toBe(true);
  expect(await auth.isInstructeur()).toBe(false);
});
test('signout ok', async () => {
  await auth.login('jean.martin');
  await auth.logout();
  expect(await auth.isAuthenticated()).toBe(false);
});
test('login error', async () => {
  expect(auth.login('does.not.exist')).rejects.toThrow(
    'Connexion impossible. User id inconnu.'
  );
});
