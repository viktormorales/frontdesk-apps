import Head from "next/head"
import { connectToDatabase } from "../../../utils/mongodb"
import Layout from "../../../layouts/admin/Layout"
import Container from "@material-ui/core/Container"
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

function Guests({guests}) {
	
	const importGuests = async event => {
		event.preventDefault();
		
		// obtiene el archivo
		let selectedFile = event.target.importCSV.files[0];
		let selectedDate = event.target.date.value;
		if (typeof selectedFile === 'undefined')
			return 'error';
		
		if (selectedDate === '')
			return 'Fecha...'
			
		// crea el objeto FormData
		var formData = new FormData();
		formData.append('file', selectedFile);
		formData.append('date', event.target.date.value);
		
		const res = await fetch('/api/guests/import', {
			method: 'POST',
			body: formData
		})
		
		if (res.status === 200) {   
			let response = await res.json();
			console.log(response)
		}
		
	}

	return (
	<>
		<Head>
			<title>Huéspedes</title>
		</Head>
		<Layout>
			<Container>
				<Typography variant="h3">Huéspedes</Typography>
				<form autoComplete="off" onSubmit={importGuests} encType="multipart/form-data">
					<Grid container spacing={3}>
						<Grid item xs={6}>
							<TextField id="standard-basic" type="date" name="date" label="" />
						</Grid>
						<Grid item xs={6}>
							<TextField type="file" name="importCSV" />
						</Grid>
						<Grid item xs={6}>
							<Button type="submit">Importar</Button>
						</Grid>
					</Grid>
				</form>
			</Container>
		</Layout>
	</>
	)
}

// This function gets called at build time
export async function getServerSideProps() {
	const { db } = await connectToDatabase();
	
	const guests = [];

	return { props: { guests: JSON.parse(JSON.stringify(guests)) } }
}

export default Guests