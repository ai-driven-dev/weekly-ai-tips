import Title from '@/src/components/ui/title';
import { fetchTips } from '@/src/features/tipManagement/api/fetchTips';
import TipListCards from '@/src/features/tipManagement/components/TipListCards';

export default async function Page() {
  const tipsDraft = await fetchTips('draft');
  const tipsWaitingApproval = await fetchTips('ready');
  const tipsScheduled = await fetchTips('scheduled');
  const tipsRejected = await fetchTips('rejected');

  return (
    <main>
      <Title>Dashboard</Title>

      <Title level={2}>📝 Your draft tips</Title>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TipListCards tips={tipsDraft} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <div>
          <Title level={2}>🚀 Scheduled</Title>
          <TipListCards tips={tipsScheduled} />
        </div>
        <div>
          <Title level={2}>👀 Waiting approval</Title>
          <TipListCards tips={tipsWaitingApproval} />
        </div>
        <div>
          <Title level={2}>👋 Rejected tips</Title>
          <TipListCards tips={tipsRejected} />
        </div>
      </div>
    </main>
  );
}
