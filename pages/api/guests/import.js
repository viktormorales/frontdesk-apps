import { connectToDatabase } from "../../../utils/mongodb"
import formidable from 'formidable'
import moment from 'moment'
import { Timestamp } from "mongodb";
import { dateFormatter } from "@material-ui/data-grid";
const xlsxFile = require('read-excel-file/node');

export default async (req, res) => {
    if (req.method === 'POST') {
		// Inicia "formidable"
		const form = new formidable.IncomingForm();
		form.parse(req, (err, fields, files) => {
			if (err)
				return err
			
			const fecha = new Date()
			const schema = {
				'N° Habitacion': {
					prop: '#',
					type: Number
				},
				'Cliente': {
					prop: 'cliente',
					type: String
				},
				'Check Out': {
					prop: 'date',
					type: (value) => {
						return moment.utc(value).format('DD-MM-YY hh:mm') 
						//FIJATE CON ESTO
						//moment('2016-01-01T00:00:00+02:00').format()
						//This date is shifted by 2 hours, moving from +2 to UTC
						//Local vs UTC vs Offset (PALABRA PARA BUSCAR EN MOMENTJS)
					}
					// Excel stores dates as integers.
					// E.g. '24/03/2018' === 43183.
					// Such dates are parsed to UTC+0 timezone with time 12:00 .
				},
				'Adultos': {
					prop: 'adultos',
					type: Number
				}
			}
			xlsxFile(files.file.path, { schema }).then((rows) => {
				/*
				// Quita la primera fila cabecera
				rows.splice(0,1);
				// Declara array controlador
				let unique = {};
				// Array donde guardar las filas filtrdas
				let filtered = {};
				// Incrementador
				let i = 0;
				// Recorre el array "rows" asignando a cada fila la variable "row"
				rows.forEach((row) => {
					// Si la columna 2 de la fila actual no se encuentra en nuestra nueva variable de control "unique"
					if(!unique[row[2]]) {
						// Agrega el item al array controlador para comparar en el próximo FOR
						unique[row[2]] = [row[2]];
						// Agrega el item al array filtrado con las columnas
						filtered[i] = [row[2], row[3], row[5], row[7], row[12], row[13]];
						i++
					}
				});
				*/
				// Devuelve la respuesta JSON
				res.json({fields, rows});
			});
		})

    } else {
        // Handle any other HTTP method
        res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    }
};

export const config = {
	api: {
	  bodyParser: false
	}
}