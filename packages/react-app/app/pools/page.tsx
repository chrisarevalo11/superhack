'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useWorldID } from '@/contexts/WorldIDContext';
import { DiscoverRounds } from '@allo-team/kit';
import Link from 'next/link';
export default function Pools() {
  const { isWorldIDVerified } = useWorldID();
  const router = useRouter();

  useEffect(() => {
    if (!isWorldIDVerified) {
      router.push('/');
    }
  }, [isWorldIDVerified, router]);

  if (!isWorldIDVerified) {
    return null;
  }

  return (
    <section>
      <h3 className="text-lg font-semibold">Discover Rounds</h3>
      <DiscoverRounds
        /*
      DiscoverRounds is a pre-made component that does most of the heavy lifting
      in fetching and displaying rounds.
      
      It fetches the rounds based on a provided query (with sane defaults) and
      renders it (as a grid by default but easy to customize with own components).
    */
        query={{
          /* 
        The query prop enables a powerful way to fetch data from the indexer. 
        
        For example:
        - only rounds with these strategies (deployed contract address)
        - order by when they were created, newest first
        - with first and offset we can paginate the results and decide how many to show */
          where: {
            // chainId: { in: [Number(44787)] },
            // Approved applications
            applications: {
              where: { status: { in: ["APPROVED"] } },
              orderBy: { status: "asc" },
            },
          },

          orderBy: { unique_donors_count: "desc" },
          offset: 0,
          first: 12,
        }}
        /*

      The renderItem function lets us change what component is rendered.
      
      For example:
        - Wrap the default RoundItem component in a link  */
          renderItem={(round, Component) => (
            <Link href={`/rounds/${round.chainId}/${round.id}`} key={round.id}>
              <Component {...round} />
            </Link>
          )}
        /*

      Columns let us choose how to render the rounds.
      
      For example:
      - 1 column on phones
      - 2 columns on small to medium
      - 3 columns on medium to large
      - 4 columns on large and above
      
      We could also set it to [1] to render as list on all screens
      */
        columns={[1, 2, 3]}
      />
    </section>
  );
}