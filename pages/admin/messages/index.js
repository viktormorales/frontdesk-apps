import React, {forwardRef, useState} from 'react'
import Head from "next/head"
import Layout from "../../../layouts/admin/Layout"
import Typography from '@material-ui/core/Typography'
import { Container, Button } from '@material-ui/core'
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



const Messages = (props) => {
	
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
		{ field: 'checkout_time', title: 'LCO' },
		{ field: 'suite', title: '#' },
		{
		  field: 'guestName',
		  title: 'Cliente',
		},
		{ field: 'agency', title: 'Agencia' },
		{ field: 'service', title: 'Servicio' },
		{ field: 'service_time', title: 'Hora' },
		{ field: 'wakeup_time', title: 'Wake' },
	
	]);

	const [guests,setGuests] = useState(props.guests)
	
	return (
	<>
		<Head>
			<title>Mensajes</title>
		</Head>
		<Layout>
			<Container>
				<Typography variant="h3">Mensajes</Typography>
				
				<MaterialTable
					icons={tableIcons}
					columns={columns}
					data={guests}
					title=""
					editable={{
						onRowUpdate: (newData, oldData) =>
						  new Promise((resolve, reject) => {
							setTimeout(() => {
							  //const dataUpdate = [...data];
							  const index = oldData.tableData.id;
							  //dataUpdate[index] = newData;
							  //setData([...dataUpdate]);
								console.log(index)
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
						actionsColumnIndex: -1
					}}
				/>
		
			</Container>
		</Layout>
	</>
	)
}

// This function gets called at build time
export async function getStaticProps() {
	
	const response = await fetch('http://localhost:3000/api/guests');
	const data = await response.json();

	return { 
		props: {
	  		guests: data.guests
		}
  	}
}

export default Messages