import { GoogleGenAI } from "@google/genai";
import 'dotenv/config' 

// The client gets the API key from the enviroment variable `GEMINI_API_KEY`
const genAI = new GoogleGenAI(process.env.GEMINI_API_KEY);

async function main() {
    const response = await genAI.models.generateContent({
        model: "gemini-2.5-flash",
        contents: 'What is the sum of the first 50 prime numbers?',
        config: {
            thinkingConfig: {
                includeThoughts: true, // Enable thinking
            }
        }
    })

    for (const part of response.candidates[0].content.parts){
        if(!part.text) {
            continue // Skip thought parts
        }
        else if (part.thought) {
            console.log("Thought summary")
            console.log(part.text)
        }
        else {
            console.log("Answer: ")
            console.log(part.text)
        }
    }
}

main().catch(console.error);