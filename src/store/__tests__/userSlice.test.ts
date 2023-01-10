import {registerUser} from '../slices/userSlice';

jest.mock('firebase/auth', () => ({
  ...jest.requireActual<typeof import('firebase/auth')>('firebase/auth'),
  createUserWithEmailAndPassword: () => Promise.resolve({ user: { refreshToken: '123', uid: '321' } }),
}));

jest.mock('firebase/firestore', () => ({
  ...jest.requireActual<typeof import('firebase/firestore')>('firebase/firestore'),
  addDoc: () => Promise.resolve({ id: '9999999'}),
  query: () => ['321'],
  getDocs: () => {docs: []}
}));

const dispatch = jest.fn();

describe('registerUser thunk', () => {
  it('should register user with resolved response', async () => {
    const thunk = registerUser({ 
    name: 'TestName', 
    surname: 'TestSurname', 
    email: 'test@test.com', 
    password: 'testPassword' 
  })

  await thunk (dispatch, () => {}, () => {});
  const [start, end] = dispatch.mock.calls;
  expect(start[0].type).toBe('user/registerUser/pending');
  expect(start[0].payload).toBe(undefined);
  expect(end[0].type).toBe('user/registerUser/fulfilled');
  expect(end[0].payload).toEqual({
      name: 'TestName',
      surname: 'TestSurname',
      email: 'test@test.com',
      token: '123',
      id: '321',
      favorites: [],
      userDocID: '9999999'
    });
  })
})

