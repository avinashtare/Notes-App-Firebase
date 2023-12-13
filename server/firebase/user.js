const { getFirestore, addDoc, collection, getDocs, query, where } = require("firebase/firestore")
const FireBaseApp = require("./config")
const { v4 : uuidv4 } = require('uuid');


// db 
const db = getFirestore(FireBaseApp);

// use collection
const userColllection = collection(db, "users");

const findUserByEmail = async (email) => {
    try {
        const querySnapshot = await getDocs(query(userColllection, where('email', '==', email)));
        const emailDoc = querySnapshot.docs[0]
        const emailData = emailDoc.data()
        return emailData;
    } catch (error) {
        return [];
    }
}

const CreateUser = async (data) => {
    const { first, last, email, password, phone, company } = data;
    const userId = uuidv4();
    try {
        const docRef = await addDoc(userColllection, {
            userId, first, last, email, password, phone, company
        });

        if (docRef.id) {
            return { userId: userId }
        }
    } catch (e) {
        return { userId: null }
    }
}

module.exports = { findUserByEmail, CreateUser }