import { admin } from "@/firebase";

async function getData() {
  const db = await admin.firestore();
  const tipsSnapshot = await db.collection('tips').get();
  const tips = tipsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  return tips;
}
 
export default async function Page() {
  const data = await getData()
 
  return <main><pre style={{ height: "200px", overflow: "auto" }}><code>{JSON.stringify(data, null, 2)}</code></pre></main>
}