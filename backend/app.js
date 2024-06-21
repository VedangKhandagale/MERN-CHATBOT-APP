import 'dotenv/config';
import { GoogleGenerativeAI } from '@google/generative-ai';
import express from'express'
import cors from 'cors'

const app = express();
app.use( express.json() );

const corsOptions={
  origin:['http://localhost:5173','http://localhost:5174']
}
app.use(cors(corsOptions))
// Access your API key as an environment variable
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

app.post( "/generate", async (req, res) => {

  const {prompt} = req.body;
  
  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text(); // Assuming response has a text() method
    res.send(text);
  } catch (error) {
    res.status(500).send({ error: 'Failed to generate content' });
    res.send( error ); // Send the error message

  }
})

app.listen(3030,console.log("server running") )

