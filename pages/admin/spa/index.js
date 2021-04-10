import Head from "next/head"
import Layout from "../../../layouts/admin/Layout"
import Container from '@material-ui/core/Container'
import { Typography } from "@material-ui/core"

function Spa() {
	
	return (
	<>
		<Head>
			<title>Spa</title>
		</Head>
		<Layout>
			<Container>
				<Typography variant="h3">Spa</Typography>
                
			</Container>
		</Layout>
	</>
	)
}

export default Spa