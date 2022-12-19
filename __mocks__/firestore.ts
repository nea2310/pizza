    const firestore: any = jest.createMockFromModule('firebase/firestore');
    const addDoc = () => new Promise ((resolve) => resolve({ doc: {id: '333'} }));
    

    firestore.addDoc = addDoc;

    module.exports = firestore;