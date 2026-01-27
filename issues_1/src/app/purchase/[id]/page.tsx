'use client';

import { useParams } from 'next/navigation';

export default function PurchaseDetailPage() {
  const params = useParams<{ id: string }>();
  const purchaseId = params.id;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">購入詳細</h1>
      <p className="mt-4">購入ID: {purchaseId}</p>

      {/* ここに詳細情報を表示 */}
    </div>
  );
}
