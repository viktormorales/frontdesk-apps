import React, {useState} from 'react';
import Head from "next/head";
import Layout from "../../../layouts/admin/Layout";
import { Container, TextField, Typography, Grid, Button, Dialog, DialogActions, DialogContent, DialogTitle, Select, MenuItem, InputLabel } from '@material-ui/core'
import { DataGrid } from '@material-ui/data-grid';
import moment from 'moment';
import DateMomentUtils from '@date-io/moment';
import { DatePicker, TimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

/**
 * Render page
 */
 const Massage = (props) => {
    
    // Hooks
	const [open, setOpen] = useState(false);
    const [guests, setGuest] = useState([]);
    const [services, setService] = useState(props.services);
    const [selectedDate, handleSelectedDate] = useState(new Date());

    // Handlers
    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = (value) => {
        setOpen(false);
    };

    // Esta información la usa el componente data-grid de Material UI
    // para crear la cabecera de la tabla
    const columns = [
        { 
            field: 'guest', 
            headerName: 'Huesped', 
            width: 90,
        },
        {
            field: 'suite',
            headerName: '#'
        },
        { 
            field: 'resident', 
            headerName: 'Residente', 
            width: 90 
        },
        {
            field: 'phone',
            headerName: 'Teléfono',
            width: 200,
        },
        { 
            field: 'from_time', 
            headerName: 'Inicio', 
            width: 120 
        },
        { 
            field: 'to_time', 
            headerName: 'Fin', 
            width: 120 
        },
        { 
            field: 'service', 
            headerName: 'Servicio', 
            width: 120 
        },
    ];

    // Render
	return (
	<>
		<Head>
			<title>Masajes</title>
		</Head>
		<Layout>
			<Container>
				<Typography variant="h3">Masajes</Typography>
				
                <Grid container spacing={3} m={5}>
                    <Grid item xs={6}>
                        <Button variant="contained" color="primary" onClick={handleClickOpen}>Agregar</Button>
                        <AddDialog open={open} onClose={handleClose} serviceList={services} />
                    </Grid>
                    <Grid item xs={6}>
                        <MuiPickersUtilsProvider utils={DateMomentUtils} locale="es">
                            <DatePicker autoOk showTodayButton todayLabel="Hoy" label="Fecha" format="DD/MM/yyyy" value={selectedDate} onChange={handleSelectedDate} />
                        </MuiPickersUtilsProvider>
                    </Grid>
                </Grid>

				<div style={{ height: 400, width: '100%' }}>
					<DataGrid rows={guests} columns={columns} pageSize={50} checkboxSelection />
				</div>
			</Container>
		</Layout>
	</>
	)
}

/**
 * Add new dialog
 * @param {*} props 
 * @returns 
 */
const AddDialog = (props) => {

    // Hooks
    const [selectedDate, handleDateChange] = useState(new Date());
    const [fromTime, handleFromTime] = useState(new Date());
    const [toTime, setToTime] = useState(new Date());
    const [services, setServices] = useState(props.serviceList)
    const [service, setService] = useState('');

    const { onClose, selectedValue, open } = props;
    
  
    // Handlers
    const handleClose = () => {
      onClose(selectedValue);
    };

    const handleSubmit = () => {
        console.log('Agregar...')
    }

    const changeService = (field) => {
        console.log(field)
        setService(field.target.value)
    }
    
    // Render
    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Nuevo masaje</DialogTitle>
            <DialogContent>
                <Grid container spacing={3}>
                    <Grid item xs={2}>
                        <TextField type="number" label="Departamento" size="2" autoFocus />
                    </Grid>
                    <Grid item xs={5}>
                        <TextField type="text" label="Huesped" />
                    </Grid>
                    <Grid item xs={5}>
                        <TextField type="text" label="Teléfono" />
                    </Grid>
                    <Grid item xs={12}>
                        <InputLabel shrink id="select-service-label">Servicio</InputLabel>
                        <Select displayEmpty labelId="select-service-label" value={service} onChange={changeService} fullWidth>
                            <MenuItem value=""><em>- Elegir -</em></MenuItem>
                            {services.map((service) => (
                                <MenuItem value={service.service} data-duration={service.duration}>{service.service} ({service.duration})</MenuItem>
                            ))}
                        </Select>
                    </Grid>
                    
                    <MuiPickersUtilsProvider utils={DateMomentUtils} locale="es">
                        <Grid item xs={4}>
                            <DatePicker autoOk showTodayButton todayLabel="Hoy" label="Fecha" format="DD/MM/yyyy" value={selectedDate} onChange={handleDateChange} />
                        </Grid>
                        <Grid item xs={4}>
                            <TimePicker autoOk ampm={false} minutesStep={5} label="Inicio" value={fromTime} onChange={handleFromTime} />
                        </Grid>
                        <Grid item xs={4}>
                            <TimePicker autoOk ampm={false} minutesStep={5} label="Fin" value={toTime} onChange={setToTime} />
                        </Grid>
                    </MuiPickersUtilsProvider>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="secondary">Cancelar</Button>
                <Button variant="contained" onClick={handleSubmit} color="primary">Agregar</Button>
            </DialogActions>
        </Dialog>
    );
}


export async function getServerSideProps(context) {

	const res = await fetch('http://localhost:3000/api/spa/services');
	const data = await res.json();

	return { 
		props: {
	  		services: data.services
		}
  	}
}

export default Massage