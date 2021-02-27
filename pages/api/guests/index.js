import dbConnect from "../../../middleware/mongodb"
import Guest from '../../../models/Guest'
import formidable from 'formidable'
import moment from 'moment'
const Excel = require('exceljs')

export default async (req, res) => {
	const { method } = req
	
	await dbConnect()
	
	switch (method) {
		case 'GET':
			try {
				const guests = await Guest.find({})
				res.status(200).json({success:true, guests})
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
						// Array de control
						let unique = {};
						// Array final con listado filtrado
						let filtered = [];
						let i = 0;
						let guest = '';
						// Recorre cada fila del archivo Excel
						worksheet.eachRow((row, rowNumber) => {
							// Si nuestra array de control no tiene asignado el valor actual
							if (!unique[row.values[3]]) {
								// Lo asigna para el próximo recorrido
								unique[row.values[3]] = row.values[3];
								// Asigna las filas a nuestra array final
								filtered[i] = {
									id: i,
									inhouse_at: fields.date,
									suite: row.values[3],
									guest: row.values[4],
									checkout: row.values[6],
									pax: row.values[8] + row.values[13] + row.values[14]
								}
								// Save
								guest = new Guest(filtered[i])
								guest.save((err) => {
									if (err) return console.log(err)
								})
								i++;
							}
						});
	
						// Devuelve la respuesta JSON con el listado filtrado
						res.status(200);
						res.json({fields, filtered});
					})
				})
			} catch (error) {
				res.status(400).json({success:false})
			}
			break;
		default:
			res.status(400).json({ success: false });
			break;
	}
    
};

export const config = {
	api: {
	  bodyParser: false
	}
}