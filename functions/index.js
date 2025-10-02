const admin = require("firebase-admin");
const cors = require("cors")({origin: true});
const {setGlobalOptions} = require("firebase-functions/v2");


const {onRequest} = require("firebase-functions/v2/https");
const {onDocumentCreated} = require("firebase-functions/v2/firestore");
setGlobalOptions({region: "australia-southeast1"});


try {
  admin.app();
} catch (e) {
  console.warn("admin.app() not initialized yet:", e);
  admin.initializeApp();
}

const db = admin.firestore();

/** --- HTTP function: counts docs in 'books' --- */
exports.countBooks = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const snapshot = await db.collection("books").get();
      const count = snapshot.size;
      res.status(200).send({count: count});
    } catch (error) {
      console.error("Error counting books:", error);
      res.status(500).send({error: "Error fetching book count"});
    }
  });
});

/** --- Firestore trigger: uppercase fields on create (v2) --- */
exports.normalizeBookOnCreate =
 onDocumentCreated("books/{bookId}", async (event) => {
   const snap = event.data;
   const data = snap.data() || {};


   if (data.__normalized) {
     return null;
   }

   const updates = {__normalized: true};

   if (data.name != null) {
     updates.name = String(data.name).toUpperCase();
   }
   if (data.author != null) {
     updates.author = String(data.author).toUpperCase();
   }
   if (data.isbn != null) {
     updates.isbn = String(data.isbn).toString().toUpperCase();
   }


   await snap.ref.set(updates, {merge: true});
   return null;
 });

