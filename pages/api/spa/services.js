import dbConnect from "../../../middleware/mongodb"
import Spaservice from "../../../models/Spaservice"

dbConnect();

export default async (req, res) => {
	
	const { method } = req
	
	switch (method) {
		case 'GET':
			try {
				const services = await Spaservice.find({});

				res.status(200).json({success:true, services})
			} catch (error) {
				res.status(400).json({success:false})
			}
			break
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