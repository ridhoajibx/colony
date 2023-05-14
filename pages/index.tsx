import {
  useAppDispatch,
  useAppSelector,
} from '../redux/Hook';
import { Fragment, useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { getCookies } from 'cookies-next';
import { useRouter } from 'next/router';
import DefaultLayout from '../components/Layouts/DefaultLayouts';
import { getAuthMe, selectAuth, webLogout } from '../redux/features/auth/authReducers';
import AuthLayout from '../components/Layouts/AuthLayouts';
import Link from 'next/link';
import { MdArrowBack, MdLogin, MdLogout, MdMail, MdMailOutline } from 'react-icons/md';
import Button from '../components/Button/Button';
import Cards from '../components/Cards/Cards';
import Modal from '../components/Modal';
import { FaCircleNotch, FaRegQuestionCircle } from 'react-icons/fa';

type Props = {
  pageProps: any
}

const Home = ({ pageProps }: Props) => {
  // props
  const { token, access, firebaseToken } = pageProps;

  const router = useRouter();
  const dispatch = useAppDispatch();
  const { data, isLogin, pending, error, message } = useAppSelector(selectAuth);
  const { user } = data;

  // sidebar
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isSignOut, setIsSignOut] = useState(false);

  useEffect(() => {
    if (!token) {
      return;
    }
    dispatch(getAuthMe({ token, callback: () => router.push("/authentication?page=sign-in") }))
  }, [token])

  const isOpenSignOut = () => setIsSignOut(true)
  const isCloseSignOut = () => setIsSignOut(false)

  const onSignOut = () => {
    let data = { token }
    dispatch(webLogout({
      data,
      callback: () => router.push("/")
    }))
  }

  return (
    <AuthLayout
      title="Select Access"
      logo="./image/logo/logo-icon.svg"
      description=""
    >
      <div className='relative w-full h-full flex items-center rounded-xl bg-white shadow-default p-10 overflow-x-hidden overflow-y-auto'>
        <div className={`w-full lg:w-1/2 h-full flex flex-col p-6 lg:pr-10 gap-2 text-gray-5 justify-between`}>
          <div className="w-full flex flex-col justify-center gap-6">
            <div className='flex flex-col gap-2 fixed lg:static top-0 inset-x-0 bg-white p-4 lg:p-0'>
              <div className="w-full flex flex-col lg:flex-row items-center">
                <h2 className='font-bold text-2xl text-graydark dark:text-white sm:text-title-xl2 text-center sm:text-left'>Welcome Back {user?.firstName || '-'}</h2>
                <Button
                  onClick={() => console.log("profile")}
                  type='button'
                  variant="primary-outline-none"
                  className='font-semibold ml-0 lg:ml-auto'
                >
                  <h2 className='text-sm sm:text-base'>
                    Manage Profile.
                  </h2>
                </Button>
              </div>
              <p className='text-gray-5 text-sm sm:text-title-sm text-center lg:text-left'>Do you have any plan today?</p>
            </div>

            <Cards
              className='mt-24 lg:mt-0 w-full flex flex-col lg:flex-row items-center sm:items-start justify-center bg-gray p-6 rounded-xl overflow-y-hidden overflow-x-auto'
            >
              <div className='w-full lg:w-1/5'>
                <img src="./image/user/user-01.png" alt="avatar" className='rounded-full shadow-1 object-cover object-center w-14 h-14 mx-auto' />
              </div>
              <div className='w-full lg:w-5/5'>
                <div className='w-full flex flex-col lg:flex-row items-center justify-center sm:justify-start gap-2 my-3 sm:my-0'>
                  <div className='font-semibold text-graydark text-base lg:text-title-md'>{ user?.lastName || '-' }</div>
                  <h3 className='text-sm lg:text-base'>{`${user?.firstName || ''} ${user?.lastName || ''}`}</h3>
                </div>
                <div className='w-full flex flex-1 gap-2 justify-center sm:justify-start'>
                  <div>
                    <MdMail className='w-6 h-6' />
                  </div>
                  <p>{user?.email || "-"}</p>
                </div>
              </div>
            </Cards>
          </div>

          <div className='w-full flex flex-col justify-center gap-6'>
            <h3 className='text-lg tracking-wide'>Select Your Access :</h3>
            <div className="grid cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
              <Cards className='tracking-wide w-full flex flex-col flex-1 border border-gray shadow-card-2 p-4 rounded-xl gap-2'>
                <img src="./image/logo/logo-icon.svg" alt="icon" className='w-14 h-14 object-contain' />
                <h3 className='font-semibold'>Owner</h3>
                <p className='text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, beatae!</p>
              </Cards>

              <Cards className='tracking-wide w-full flex flex-col flex-1 border border-gray shadow-card-2 p-4 rounded-xl gap-2'>
                <img src="./image/logo/logo-icon.svg" alt="icon" className='w-14 h-14 object-contain' />
                <h3 className='font-semibold'>Employee</h3>
                <p className='text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, beatae!</p>
              </Cards>

              <Cards className='tracking-wide w-full flex flex-col flex-1 border border-gray shadow-card-2 p-4 rounded-xl gap-2'>
                <img src="./image/logo/logo-icon.svg" alt="icon" className='w-14 h-14 object-contain' />
                <h3 className='font-semibold'>Tenant</h3>
                <p className='text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, beatae!</p>
              </Cards>

              <Cards className='tracking-wide w-full flex flex-col flex-1 border border-gray shadow-card-2 p-4 rounded-xl gap-2'>
                <img src="./image/logo/logo-icon.svg" alt="icon" className='w-14 h-14 object-contain' />
                <h3 className='font-semibold'>Third Party</h3>
                <p className='text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, beatae!</p>
              </Cards>
            </div>
          </div>

          <div className="w-full flex flex-col justify-center gap-6">
            <div className='w-full flex flex-col gap-2 items-start mb-5 text-left'>
              <Button
                onClick={isOpenSignOut}
                type='button'
                variant="primary-outline-none"
                className='mb-5.5 px-0 py-0'
              >
                <span className='p-2 rounded-lg bg-primary text-white hover:opacity-80 hover:shadow-1'>
                  <MdLogin className='w-6 h-6 rotate-180' />
                </span>
                <h2 className='text-base lg:text-lg text-graydark dark:text-white'>
                  Sign Out.
                </h2>
              </Button>
            </div>
          </div>
        </div>

        <div className={`hidden w-full lg:w-1/2 h-full lg:block transition-transform duration-500 border bg-primary text-white border-stroke rounded-3xl ease-in-out`}>
          <div className="w-full h-full flex flex-col items-center justify-between">
            <Link className='w-full pt-5.5 flex items-center gap-4 px-10' href='/authentication?page=sign-in'>
              <img src="../image/logo/logo-icon-white.png" alt="logo" />
              <h2 className='text-lg text-white sm:text-title-lg'>
                Colony.
              </h2>
            </Link>
            <div className='w-full flex flex-col px-10 justify-center'>
              <div className='flex flex-col justify-center'>
                <h2 className='text-title-md2 lg:text-title-lg mb-5'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit
                </h2>

                <p className='leading-1 text-sm'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quod, minus cumque molestias voluptatibus veniam minima soluta accusamus aspernatur praesentium maiores?</p>
              </div>
            </div>
            <div className='w-full flex flex-col justify-end py-10 px-10 tracking-wider'>
              <div className='w-full p-6 rounded-lg bg-[#111f2c3d] text-sm'>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. In tempore debitis beatae doloremque eveniet eos sunt repellendus accusantium ab distinctio.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* signout */}
      <Modal
        isOpen={isSignOut}
        onClose={isCloseSignOut}
        size='small'
      >
        <div className="w-full px-6 flex flex-col items-center justify-center min-h-full h-[350px] max-h-[650px] gap-4 text-graydark tracking-wider">
          <h3 className='text-title-xl2 font-bold'>Sign Out</h3>
          <FaRegQuestionCircle className='w-20 h-20 text-primary' />
          <p>Are you sure to Sign Out ?</p>
          <div className='w-full flex items-center gap-2 justify-center'>
            <Button
              className="rounded-lg px-4"
              variant="primary"
              type="button"
              onClick={onSignOut}
              disabled={pending}
            >
              {pending ? <Fragment>
                Signing out ....
                <FaCircleNotch className='w-5 h-5 animate-spin-2' />
              </Fragment> : "Yes, Sign out!"}
            </Button>
            <Button
              className="rounded-lg px-4"
              variant="danger"
              type="button"
              onClick={isCloseSignOut}
            >No</Button>
          </div>
        </div>
      </Modal>
    </AuthLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // Parse cookies from the request headers
  const cookies = getCookies(context)

  // Access cookies using the cookie name
  const token = cookies['accessToken'] || null;
  const access = cookies['access'] || null;
  const firebaseToken = cookies['firebaseToken'] || null;

  if (token && access == "resendEmail") {
    return {
      redirect: {
        destination: "/authentication/verify-account?page=verify", // Redirect to the home page
        permanent: false,
      },
    };
  }

  if (!token) {
    return {
      redirect: {
        destination: "/authentication?page=sign-in", // Redirect to the home page
        permanent: false
      },
    };
  }

  return {
    props: { token, access, firebaseToken },
  };
};

export default Home;
