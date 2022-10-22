import React from 'react';
import { useRouter } from 'next/router';

import MindMap from '../../components/Mindmap';

export default function MindMapPage() {
  const router = useRouter();
  const { mindMapId } = router.query;

  return <MindMap mindMapId={mindMapId} />;
}
