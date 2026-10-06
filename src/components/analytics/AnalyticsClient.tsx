'use client';

import { useEffect } from 'react';
import { installGlobalErrorTracking } from '@/lib/analytics';
import { DataTrackListener } from './DataTrackListener';
import { OutboundLinkTracker } from './OutboundLinkTracker';

/** Ponto único de montagem no layout: erros globais (js_error) e cliques externos (outbound_click). */
export function AnalyticsClient() {
  useEffect(() => installGlobalErrorTracking(), []);
  return (
    <>
      <OutboundLinkTracker />
      <DataTrackListener />
    </>
  );
}
