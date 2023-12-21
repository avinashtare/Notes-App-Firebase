const { getFirestore, addDoc, collection, query, where, getDocs, deleteDoc, updateDoc } = require("firebase/firestore")
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
        const allNotesData = querySnapshot.docs.map(doc => {
            const { userId, ...allFields } = doc.data();
            return allFields;
        });

        // success 
        return { data: allNotesData };
    } catch (e) {
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

// remove note from user
// add notes in firestore db 
const DeleteNoteDB = async (data) => {
    const { noteId } = data;
    try {
        // query 
        const getAllDocsQuery = query(noteColllection, where('noteId', '==', noteId));
        // fetch 
        const querySnapshot = await getDocs(getAllDocsQuery);

        querySnapshot.forEach(async (doc) => {
            await deleteDoc(doc.ref);
        })
        // console.log(querySnapshot)
        // success 
        return { deleted: true };
    } catch (e) {
        return { deleted: false };
    }
}

// update existing notes in firestore db 
const UpdateNoteDB = async (data) => {
    try {
        // data from user 
        const { userId, noteId, title, content, active } = data;
        // update data 
        const updateData = {};
        if (title !== undefined) { updateData.title = title; }
        if (content !== undefined) { updateData.content = content; }
        if (active !== undefined) { updateData.active = active; }

        // query to find correct note
        const getAllDocsQuery = query(
            noteColllection,
            where('noteId', '==', noteId),
            where('userId', '==', userId)
        );

        // fetch note
        const querySnapshot = await getDocs(getAllDocsQuery);
        // this is old note 
        const oldNotes = querySnapshot.docs[0].data();
        // ref of old note 
        const docRef = querySnapshot.docs[0].ref;
        if (!oldNotes) { return false }

        // update note 
        await updateDoc(docRef, updateData)
        return true;
    } catch (error) {
        return false;
    }
}


module.exports = { AddNoteDB, GetAllNoteDB, DeleteNoteDB, UpdateNoteDB }