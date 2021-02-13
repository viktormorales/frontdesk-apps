import Head from "next/head"
import Link from "next/link"
import Layout from "../layouts/Layout"
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button"

function Home() {
  return (
    <>
      <Head>
        <title>Index</title>
      </Head>
      <Layout>
        <Container>
          <Typography variant="h1">Bienvenido</Typography>
          <Link href="/admin"><Button variant="contained" color="primary">Ir a admin</Button></Link>
        </Container>
      </Layout>
    </>
  )
}

export default Home