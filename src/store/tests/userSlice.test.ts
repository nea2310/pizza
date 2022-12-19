import {registerUser} from '../slices/userSlice';
jest.mock('firebase/firestore');
jest.mock('firebase/auth');


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
const { calls } = dispatch.mock;
expect(calls).toHaveLength(2);
const [start, end] = calls;
expect(start[0].type).toBe('user/registerUser/pending');

console.log(end);
  })
    
})
