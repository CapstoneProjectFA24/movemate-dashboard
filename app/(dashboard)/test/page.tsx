import { getHouses } from '@/lib/actions/house'
import { SearchParams } from '@/types/table';
import React from 'react'
import TestCompo from './test-compo';
export interface IndexPageProps {
    searchParams: SearchParams;
  }
const TestPage =  ({ searchParams }: IndexPageProps) => {
    const housePromise = getHouses(searchParams)
    return (
        <React.Suspense
          fallback={
            <div>...loading</div>
          }
        >
            <TestCompo housePromise={housePromise}/>
        </React.Suspense>
  )
}

export default TestPage