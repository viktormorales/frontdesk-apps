import Head from "next/head"
import Layout from "../components/Layout";

function Home() {
  return (
    <>
      <Head>
        <title>Index</title>
      </Head>
      <Layout>
      <main className="container">
        <h1>
          Welcome to <a href="https://nextjs.org" className="btn-blue">Next.js!</a>
        </h1>
        </main>
      </Layout>
    </>
  )
}

export default Home