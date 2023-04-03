import type { NextPage } from 'next'
import {AdminLayout} from "../components/layouts";
import {GetServerSideProps} from "next";
import {parseCookie} from "../utils";

const Home: NextPage = () => {
  return (
    <AdminLayout>
      <p>inicio (proximamente...)</p>
    </AdminLayout>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async ({req}) => {
  if (!parseCookie('isAuthenticated', req.headers.cookie!)) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}
