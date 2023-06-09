import Head from 'next/head';
import Cards from '../components/Cards/Cards';
import {
  useAppDispatch,
  useAppSelector,
} from '../redux/Hook';
import {
  decrement,
  increment,
  incrementByAmount,
  selectCount,
} from '../redux/features/counter/counterSlice';
import { useState } from 'react';
import { getKanyeQuote, selectKanye } from '../redux/features/kanye/kanyeReducer';
import { AppProps } from 'next/app';
import { GetServerSideProps } from 'next';
import { getCookies, getCookie, setCookie, deleteCookie } from 'cookies-next';
import { useRouter } from 'next/router';

type Props = {
  pageProps: any
}

const Home = ({ pageProps }: Props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const count = useAppSelector(selectCount);
  const [incrementAmount, setIncrementAmount] = useState<number>(0);

  const { data, pending, error } = useAppSelector(selectKanye);

  // console.log(pageProps, "quote")

  return (
    <div className=''>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-full bg-gray-100">
        <div className='w-full'>
          <img src={"vercel.svg"} width="250" height="250" className='mx-auto' />
        </div>
        <Cards
          className="w-full"
        >
          <div className="w-full lg:w-1/2 p-4 mx-auto">
            <div className='w-full flex flex-col'>
              <div>Result : <span>{count}</span></div>
              <input
                value={incrementAmount}
                onChange={(e) => setIncrementAmount(Number(e.target.value))}
                type="number"
                className='w-full px-4 py-1.5 rounded mb-3'
              />
              <button
                onClick={() => dispatch(incrementByAmount(Number(incrementAmount)))}
                className="px-4 py-2 border "
              >
                Increment by amount
              </button>
            </div>
            <div className='w-full flex gap-2 my-3'>
              <button
                className="px-4 py-2 border "
                onClick={() => dispatch(decrement())}
              >
                Decrement by 1
              </button>
              <button
                className="px-4 py-2 border "
                onClick={() => dispatch(increment())}
              >
                Increment by 1
              </button>
            </div>
          </div>
        </Cards>

        <Cards
          className="w-full"
        >
          <h2>Generate random Kanye West quote</h2>
          {pending && <p>Loading...</p>}
          {data && <p>{data.quote}</p>}
          {error && <p>Oops, something went wrong</p>}
          <button
            className='px-4 py-2 border'
            onClick={() => dispatch(getKanyeQuote({
              params: "params",
              data: {},
              route: () => router.push("/authentication"),
            }))}
            disabled={pending}
          >
            Generate Kanye Quote
          </button>
        </Cards>
      </main>
    </div>
  )
}

export const getServerSideProps:GetServerSideProps = async (context: any) => {
  const token = await getCookie("accessToken", context)

  if(token){
    return {
      props: {
        token
      },
    };
  }
  
  return {
    props: {},
  }
}

export default Home;
