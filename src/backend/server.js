import express from "express";
import admin from "firebase-admin";
import fs from "fs";
import fetch from "node-fetch";
import cors from "cors";

const serviceAccount = JSON.parse(fs.readFileSync("./serviceAccountKey.json", "utf8"));
const API_KEY = "AIzaSyAKk4zZBMerlXwPXEzmeYLcWSqq5oRs-Fg";

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();

const app = express();
app.use(cors());
app.use(express.json());

//Реєстрація
app.post("/register", async (req, res) => {
  const { login, email, password } = req.body;
  console.log("Register request body:", req.body);

  try {
    const existing = await db.collection("usernames").doc(login).get();
    if (existing.exists) {
      console.log("Login already used:", login);
      return res.status(400).json({ error: "Логін уже використовується" });
    }

    const user = await admin.auth().createUser({ email, password, displayName: login });

    await db.collection("usernames").doc(login).set({ email, uid: user.uid });

    res.json({ message: "Користувач створений", user });
  } catch (err) {
    console.error("Register error:", err);
    res.status(400).json({ error: err.message });
  }
});

//Логін користувача
app.post("/login", async (req, res) => {
  const { login, password } = req.body;
  console.log("Login request body:", req.body);
  try {
    const doc = await db.collection("usernames").doc(login).get();
    if (!doc.exists) {
      console.log("User not found for login:", login);
      return res.status(400).json({ error: "Користувач не знайдений" });
    }
    const { email } = doc.data();

    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, returnSecureToken: true }),
      }
    );
    const data = await response.json();
    console.log("Firebase login response:", data);
    if (data.error) throw new Error(data.error.message);

    res.json({ idToken: data.idToken, refreshToken: data.refreshToken });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//Перевірка токену
async function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) return res.status(401).send("No token");
  const token = authHeader.split(" ")[1];
  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.user = decoded;
    console.log("Received token:", req.headers.authorization);
    next();
  } catch (err) {
    res.status(401).send("Invalid token");
  }
}

app.get("/profile", verifyToken, (req, res) => {
  res.json({ message: "Access granted", user: req.user });
});

//Tasks CRUD
//Read
app.get("/tasks", verifyToken, async (req, res) => {
  try{
    const uid = req.user.uid;
    const {date} = req.query;
    let q = db.collection("tasks").where("uid", "==", uid);

    if (date) {
      q = q.where("date", "==", date);
    }

    const snapshot = await q.get();

    const tasks = [];
    snapshot.forEach((doc) => {
      tasks.push({id: doc.id, ...doc.data()});
    })
    console.log("Tasks: ", tasks)
    res.json({tasks});
  } catch (err){
    console.error("Get tasks error:", err);
    res.status(500).json({error: err.message});
  }
});

//Create
app.post("/tasks", verifyToken, async (req, res) => {
  try {
    const uid = req.user.uid;
    const { title, category, date, status = "Active" } = req.body;
    if (!title || !category || !date) return res.status(400).json({ error: "Not found: title or category or date" });

    const newTask = {
      uid,
      title,
      category,
      date,
      status,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    const doc = await db.collection("tasks").add(newTask);
    const createdDoc = await doc.get();
    res.status(201).json({ id: doc.id, ...createdDoc.data() });
  } catch (err) {
    console.error("Create task error:", err);
    res.status(500).json({ error: err.message });
  }
});

//Delete

app.listen(3000, () => console.log("The server is running on http://localhost:3000"));