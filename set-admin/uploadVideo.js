// set-admin/uploadVideo.js
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

// Inicializa o Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Dados do vídeo que você quer adicionar
const novoVideo = {
  title: "Título de exemplo",
  guid: "seu-guid-do-bunny-aqui",
  actor: "Nome da atriz (opcional)",
  tags: "exemplo, teste, legenda",
  createdAt: admin.firestore.FieldValue.serverTimestamp()
};

// Adiciona no Firestore
db.collection("videos")
  .add(novoVideo)
  .then((docRef) => {
    console.log("✅ Vídeo adicionado com sucesso! ID:", docRef.id);
    process.exit();
  })
  .catch((error) => {
    console.error("❌ Erro ao adicionar vídeo:", error);
    process.exit(1);
  });
