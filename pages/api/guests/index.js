import dbConnect from "../../../middleware/mongodb"
import Guest from '../../../models/Guest'
import formidable from 'formidable'
import moment from 'moment'
const Excel = require('exceljs')

dbConnect();

export default async (req, res) => {
	const { method } = req
	
	switch (method) {
		case 'GET':
			try {
				// Si no se especifica la fecha, toma el valor de hoy por defecto
				let findByDate = req.query.date || moment().format('YYYY-MM-DD');
				
				// Formatear fecha y asignar a variables para comparar
				let chk_in = moment.utc(findByDate).startOf('day').toISOString()
				let	chk_out = moment.utc(findByDate).endOf('day').toISOString()
				console.log({chk_in, chk_out})

				// Busca huéspedes donde 
				// CHECKIN <= fecha buscada
				// y el CHECKOUT >= fecha buscada
				// Y ordena ASCENDENTE por número de SUITE
				// COMPARAR HORAS
				const guests = await Guest.find({
					checkin: { $lte: chk_in },
					checkout: {$gte: chk_out }
				}).sort({ suite: 1 });

				res.status(200).json({success:true, total: guests.length, guests})
			} catch (error) {
				res.status(400).json({success:false})
			}
			break
		case 'POST':
			try {
				const form = new formidable.IncomingForm();
				form.parse(req, (err, fields, files) => {
					if (err)
						return err
	
					// Inicia ExcelJS
					const workbook = new Excel.Workbook();
					workbook.xlsx.readFile(files.file.path)
					.then(() => {
						// Trabaja sobre la primera hoja de la planilla elegida
						const worksheet = workbook.getWorksheet(1);
						
						// Elimina la primera fila (cabeceras del excel)
						worksheet.spliceRows(0,1)

						// Array final con listado filtrado
						let filtered = [];

						// Recorre cada fila del archivo Excel
						worksheet.eachRow((row, rowNumber) => {
							try {
								// Busca que no exista en la DB un código de reserva igual
								Guest.findOne({bookingCode: row.values[2]}, (err, guest) => {
									if (err) console.log(err);
									
									// Si ya existe el huesped, agregar acompañantes
									// Sino agregarlo
									if (guest) {
										//MIENTRAS CODIGO DE RSVA IGUAL => SI PEPE NO EXISTE, AGREGALO
										// comparar pax con acompañantes actuales
										// segundo comparar nmbres
										// agregar dato al objeto "acompañante"
									} else {
										
										let guest_info = {
											bookingCode: row.values[2],
											checkin: row.values[5],
											checkout: row.values[6],
											suite: row.values[3],
											guestName: row.values[4],
										}
										filtered.push(guest_info);
										let new_guest = Guest.create(guest_info);
									}
								})
							} catch(error) {
								console.log(error)
							}
						});
	
						// Devuelve la respuesta JSON con el listado filtrado
						res.status(200);
						res.json({fields, filtered});
						res.end();
					})
				})
			} catch (error) {
				res.status(400).json({success:false});
				res.end();
			}
			break;
		default:
			res.status(400).json({ success: false });
			res.end();
			break;
	}
    
};

export const config = {
	api: {
	  bodyParser: false
	}
}