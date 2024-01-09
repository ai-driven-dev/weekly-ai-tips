import { fetchTips } from "@/src/features/tipsManagement/api/fetchTips";

async function getData() {
  const tips = fetchTips();

  return tips;
}
 
export default async function Page() {
  const data = await getData()
 
  return <main><pre style={{ height: "200px", overflow: "auto" }}><code>{JSON.stringify(data, null, 2)}</code></pre></main>
}