import {registerUser} from '../slices/userSlice';

const mockedСreateUserWithEmailAndPassword = jest.fn();
mockedСreateUserWithEmailAndPassword.mockImplementationOnce(() => Promise.resolve({ user: { refreshToken: '123', uid: '321' } }));

jest.mock('firebase/auth', () => ({
  ...jest.requireActual<typeof import('firebase/auth')>('firebase/auth'),
  // createUserWithEmailAndPassword: () => mockedСreateUserWithEmailAndPassword,
  createUserWithEmailAndPassword: () => Promise.resolve({ user: { refreshToken: '123', uid: '321' } }),
}));


describe('registerUser thunk', () => {
  it('should register user with resolved response', async () => {
    const dispatch = jest.fn();
    const thunk = registerUser({ 
    name: 'TestName', 
    surname: 'TestSurname', 
    email: 'test@test.com', 
    password: 'testPassword' 
  },
)


await thunk (dispatch, () => {}, () => {});
const [start, end] = dispatch.mock.calls;
// expect(start[1].type).toBe('user/registerUser/fulfilled');
  })
    
})
