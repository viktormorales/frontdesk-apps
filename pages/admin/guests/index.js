import React, {forwardRef, useState} from 'react'
import Head from "next/head"
import Layout from "../../../layouts/admin/Layout"
import Container from "@material-ui/core/Container"
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import moment from 'moment'
import MaterialTable from 'material-table'
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import {
	DatePicker,
  TimePicker,
  DateTimePicker,
  MuiPickersUtilsProvider,
  } from "@material-ui/pickers";

const Guests = (props) => {

	// Los hooks permiten usar el estado y otras características de React sin escribir una clase.
	// Más información: https://es.reactjs.org/docs/hooks-intro.html
	const tableIcons = {
		Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
		Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
		Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
		Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
		DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
		Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
		Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
		Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
		FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
		LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
		NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
		PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
		ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
		Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
		SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
		ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
		ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
	  };
	
	const [columns, setColumns] = useState([
		{ 
			field: 'checkoutTime', 
			title: 'LCO',
			render: (rowData) => {
				let tomorrow = moment().add(1, 'days').format('YYYY-MM-DD');
				let checkout = moment(rowData.checkout).format('YYYY-MM-DD');
				let checkoutTime = moment.utc(rowData.checkout).format('HH:mm');
				return `${tomorrow == checkout ? checkoutTime : '' }`
			}
		},
		{ 
			field: 'suite', 
			title: '#',
		},
		{
			field: 'guestName',
			title: 'Cliente',
		},
		{ 
			field: 'checkin', 
			title: 'Checkin',
		},
		{ field: 'checkout', title: 'Checkout' },
		{ field: 'pax', title: 'PAX' }
	]);

	const [guests, setGuests] = useState(props.guests);
	
	// Evento que se ejecuta al enviar el formulario de importación
	const importGuests = async event => {
		event.preventDefault();
		
		// obtiene inputs del formulario
		let selectedFile = event.target.importCSV.files[0];
		//let selectedDate = event.target.date.value;
		if (typeof selectedFile === 'undefined')
			return 'error';
		
		//if (selectedDate === '')
			//return 'Fecha...'
			
		// crea el objeto FormData con los datos del formulario
		var formData = new FormData();
		formData.append('file', selectedFile);
		// formData.append('date', selectedDate);
		
		// Envia los datos al servidor para ser procesados
		const res = await fetch('/api/guests', {
			method: 'POST',
			body: formData
		})
		
		// Actualiza el listado "guests"
		if (res.status === 200) { 
			let response = await res.json();
			console.log(response)
			// setGuests(response.filtered)
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
							<TextField type="file" name="importCSV" />
						</Grid>
						<Grid item xs={6}>
							<Button type="submit">Importar</Button>
						</Grid>
					</Grid>
				</form>

				<MaterialTable
					icons={tableIcons}
					columns={columns}
					data={guests}
					title=""
					editable={{
						onRowAdd: newData =>
						  new Promise((resolve, reject) => {
							setTimeout(() => {
							  //setData([...data, newData]);
							  console.log(newData);
							  resolve();
							}, 1000)
						  }),
						onRowUpdate: (newData, oldData) =>
						  new Promise((resolve, reject) => {
							setTimeout(() => {
							  //const dataUpdate = [...data];
							  const index = oldData.tableData.id;
							  //dataUpdate[index] = newData;
							  //setData([...dataUpdate]);
								console.log(newData)
							  resolve();
							}, 1000)
						  }),
						onRowDelete: oldData =>
						  new Promise((resolve, reject) => {
							setTimeout(() => {
							  const dataDelete = [...data];
							  const index = oldData.tableData.id;
							  //dataDelete.splice(index, 1);
							  //setData([...dataDelete]);
							  console.log(index)
							  resolve()
							}, 1000)
						  }),
					  }}
					options={{
						rowStyle: rowData => ({
							backgroundColor: (moment().add(1, 'days').format('YYYY-MM-DD') ==  moment(rowData.checkout).format('YYYY-MM-DD') ? 'lightgrey' : '')
						}),
						exportButton: true,
						actionsColumnIndex: -1,
						pageSize: 20
					}}
				/>
			</Container>
		</Layout>
	</>
	)
}

export async function getStaticProps() {

	const response = await fetch('http://localhost:3000/api/guests');
	const data = await response.json();
	
	return { 
		props: {
	  		guests: data.guests
		}
  	}
}

export default Guests