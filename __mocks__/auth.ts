    const auth: any = jest.createMockFromModule('firebase/auth');
    const createUserWithEmailAndPassword = () => new Promise ((resolve) => resolve({ user: { refreshToken: '123', uid: '321' } }));

    auth.createUserWithEmailAndPassword = createUserWithEmailAndPassword;


    module.exports = auth;