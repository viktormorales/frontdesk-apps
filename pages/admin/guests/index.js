import React, {useState} from 'react'
import Head from "next/head"
import dbConnect from "../../../middleware/mongodb"
import Guest from '../../../models/Guest'
import Layout from "../../../layouts/admin/Layout"
import Container from "@material-ui/core/Container"
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { DataGrid, useApiRef } from '@material-ui/data-grid';
import moment from 'moment'

// Esta información la usa el componente data-grid de Material UI
// para crear la cabecera de la tabla
const columns = [
	{ 
		field: 'checkout_time', 
		headerName: 'Hora', 
		width: 90,
	},
	{
		field: 'checkout_date',
		headerName: 'Checkout'
	},
	{ 
		field: 'suite', 
		headerName: '#', 
		width: 90 
	},
	{
		field: 'guest',
		headerName: 'Cliente',
		width: 200,
	},
	{ 
		field: 'pax', 
		headerName: 'PAX', 
		width: 120 
	},
];

const Guests = (props) => {

	// Los hooks permiten usar el estado y otras características de React sin escribir una clase.
	// Más información: https://es.reactjs.org/docs/hooks-intro.html
	const [guests, setGuests] = useState(props.guests);
	const [dateInput, setDate] = useState(moment().format('YYYY-MM-DD'));

	// Evento que se ejecuta al enviar el formulario de importación
	const importGuests = async event => {
		event.preventDefault();
		
		// obtiene inputs del formulario
		let selectedFile = event.target.importCSV.files[0];
		let selectedDate = event.target.date.value;
		if (typeof selectedFile === 'undefined')
			return 'error';
		
		if (selectedDate === '')
			return 'Fecha...'
			
		// crea el objeto FormData con los datos del formulario
		var formData = new FormData();
		formData.append('file', selectedFile);
		formData.append('date', selectedDate);
		
		// Envia los datos al servidor para ser procesados
		const res = await fetch('/api/guests', {
			method: 'POST',
			body: formData
		})
		
		// Actualiza el listado "guests"
		if (res.status === 200) { 
			let response = await res.json();
			console.log(response)
			setGuests(response.filtered)
		}
		
	}

	const guestsByDate = async event => {
		console.log(event.target.value);
		await dbConnect()

		const guestsFind = await Guest.find({})
		const guests = JSON.parse(JSON.stringify(guestsFind))
		
		if (!guests) {
			return {
				notFound: true,
			}
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
							<TextField id="standard-basic" type="date" name="date" label="" onChange={guestsByDate} defaultValue={dateInput} />
						</Grid>
						<Grid item xs={6}>
							<TextField type="file" name="importCSV" />
						</Grid>
						<Grid item xs={6}>
							<Button type="submit">Importar</Button>
						</Grid>
					</Grid>
				</form>

				<div style={{ height: 400, width: '100%' }}>
					<DataGrid rows={guests} columns={columns} pageSize={50} checkboxSelection />
				</div>
			</Container>
		</Layout>
	</>
	)
}

export async function getStaticProps(context) {

	await dbConnect()

	const guestsFind = await Guest.find({})
	const guests = JSON.parse(JSON.stringify(guestsFind))
	
	if (!guests) {
		return {
			notFound: true,
		}
	}
	
	return {
		props: {
			guests
		},
	}
}

export default Guests