import { GoogleGenAI } from "@google/genai";
import 'dotenv/config' 

// The client gets the API key from the enviroment variable `GEMINI_API_KEY`
const genAI = new GoogleGenAI(process.env.GEMINI_API_KEY);
async function main() {
    const response = await genAI.models.generateContent({
        model: "gemini-2.5-flash",
        contents: 'Explain how IA works in a few words',
        config: {
            thinkingConfig: {
                thinkingBudget: 0, //Disable thinking
            }
        }
    })
    console.log(response.text)
}


