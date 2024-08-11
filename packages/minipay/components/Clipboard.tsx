'use client';

import useClipboard from '@/lib/hooks';
import { Check, Copy } from 'lucide-react';

export default function Clipboard({
  text,
  className,
}: {
  text: string;
  className?: string;
}): JSX.Element {
  const { copied, copyToClipboard } = useClipboard();

  return (
    <button disabled={copied} className={className}>
      {copied ? (
        <Check size={18} />
      ) : (
        <Copy onClick={() => copyToClipboard(text)} size={18} />
      )}
    </button>
  );
}
