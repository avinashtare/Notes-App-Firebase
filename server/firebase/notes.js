const { getFirestore, addDoc, collection, query, where, getDocs } = require("firebase/firestore")
const FireBaseApp = require("./config")
const { v4: uuidv4 } = require('uuid');


// db 
const db = getFirestore(FireBaseApp);

// notes collections
const noteColllection = collection(db, "notes");


// get all notes in firestore db 
const GetAllNoteDB = async (data) => {
    const { userId } = data;
    try {
        // query 
        const getAllDocsQuery = query(noteColllection, where('userId', '==', userId));
        // fetch 
        const querySnapshot = await getDocs(getAllDocsQuery);
        // get all one by one 
        const allNotesData = querySnapshot.docs.map(doc =>{
            const { userId, ...allFields } = doc.data();
            return allFields;
        });

        // success 
        return { data: allNotesData };
    } catch (e) {
        console.log(e)
        return { data: null };
    }
}


// add notes in firestore db 
const AddNoteDB = async (data) => {
    const { userId, title, content, active, timestamp } = data;
    const noteId = uuidv4();
    try {
        const resData = {
            noteId, title, content, active, timestamp
        }

        const docRef = await addDoc(noteColllection, {
            userId, noteId, title, content, active, timestamp
        });

        if (!docRef.id) { return { data: null }; }

        // success 
        return { data: resData };
    } catch (e) {
        return { data: null };
    }
}

module.exports = { AddNoteDB, GetAllNoteDB }