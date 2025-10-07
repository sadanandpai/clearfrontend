import React from 'react';
import { useTheme } from 'next-themes';
import { themes } from 'prism-react-renderer';
import { CodeSnippet } from '@/ui/components/core/code-snippet/code-snippet';

interface Props {
  code: string;
}

export function ChallengeSolution({ code }: Props) {
  const { resolvedTheme } = useTheme();

  return (
    <CodeSnippet code={code} theme={resolvedTheme === 'dark' ? themes.vsDark : themes.vsLight} />
  );
}
