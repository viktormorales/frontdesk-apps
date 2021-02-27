import Head from "next/head"
import Layout from "../../../layouts/admin/Layout"
import Container from '@material-ui/core/Container'
import { Typography } from "@material-ui/core"

function Breakfast() {
	
	return (
	<>
		<Head>
			<title>Desayunos</title>
		</Head>
		<Layout>
			<Container>
				<Typography variant="h3">Desayunos</Typography>
                
			</Container>
		</Layout>
	</>
	)
}

export default Breakfast