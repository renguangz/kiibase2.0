import type { ComponentProps } from 'react';
import Head from 'next/head';

type Props = Partial<
  ComponentProps<typeof Head> & {
    title?: string;
    description?: string;
  }
>;

export default function Meta({ children, title, description }: Props) {
  return (
    <Head>
      <title>{title ?? ''}</title>
      <meta name="description" content={description ?? ''} />
      {children}
    </Head>
  );
}
