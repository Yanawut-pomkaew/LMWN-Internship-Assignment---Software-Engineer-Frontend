import express, { Application } from "express";
import controller from './controller/Restaurant';
import cors from 'cors';


const app: Application = express();
const port = 3001;

app.use(cors({
	credentials : true,
	origin : 'http://localhost:3000',
	optionsSuccessStatus: 200
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", async (req, res) => 
	res.send("LINE MAN Wongnai Frontend Assignment / you can request localhost:3001/Restaurant/info/567051 or 227018 to look forward info stores, details in ./api-gateway/index.ts file")
);
// api สำหรับข้อมูลร้านอาหาร
app.get("/Restaurant/info/:id", controller.getRestaurant);
// api สำหรับเมนูอาหารแบบ short
app.get("/Restaurant/short/:id/:menuName" ,controller.getShortMenu);
// api สำหรับเมนูอาหารแบบ full
app.get("/Restaurant/full/:id/:menuName" , controller.getFullMenu);

try {
	app.listen(port, (): void => {
		console.log(`Connected successfully on port ${port}`);
	});
} catch (error) {
	console.error(`Error occured: ${(error as Error).message}`);
}

export default app;
