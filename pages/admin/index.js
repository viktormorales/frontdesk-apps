import Head from "next/head"
import Layout from "../../layouts/admin/Layout"
import Typography from '@material-ui/core/Typography'
import Container from "@material-ui/core/Container"

function Home() {
  return (
    <>
		<Head>
			<title>Index</title>
		</Head>
		<Layout>
			<Container>
				<Typography variant="h3">Bienvenido</Typography>
			</Container>
		</Layout>
    </>
  )
}

export default Home