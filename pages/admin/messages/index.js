import Head from "next/head"
import { connectToDatabase } from "../../../utils/mongodb";
import Layout from "../../../layouts/admin/Layout"
import Typography from '@material-ui/core/Typography'
import { Container, Button } from '@material-ui/core'
import { DataGrid } from '@material-ui/data-grid';

const columns = [
	{ field: 'lco', headerName: 'LCO', width: 90 },
	{ field: 'suite', headerName: '#', width: 90 },
	{
	  field: 'guest',
	  headerName: 'Cliente',
	  width: 200,
	  description: 'This column has a value getter and is not sortable.',
	  sortable: false,
	  width: 160,
	  valueGetter: (params) =>
		`${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`,
	},
	{ field: 'agency', headerName: 'Agencia', width: 120 },
	{ field: 'service', headerName: 'Servicio', width: 120 },
	{ field: 'service_time', headerName: 'Hora', width: 90 },
	{ field: 'wakeup_time', headerName: 'Wake', width: 90 },

  ];
  
  const rows = [
	{ id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
	{ id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
	{ id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
	{ id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
	{ id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
	{ id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
	{ id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
	{ id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
	{ id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ];

export default function Messages({messages}) {
	
	return (
	<>
		<Head>
			<title>Mensajes</title>
		</Head>
		<Layout>
			<Container>
				<Typography variant="h3">Mensajes</Typography>
				
				<div style={{ height: 400, width: '100%' }}>
					<DataGrid rows={rows} columns={columns} pageSize={10} checkboxSelection />
				</div>
		
			</Container>
		</Layout>
	</>
	)
}

// This function gets called at build time
export async function getServerSideProps() {
	const { db } = await connectToDatabase();
	
	const messages = await db
		.collection("Message")
		.find({})
		.sort({ metacritic: -1 })
		.limit(20)
		.toArray();

	return { props: { messages: JSON.parse(JSON.stringify(messages)) } }
}