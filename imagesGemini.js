import { GoogleGenAI, Modality } from "@google/genai";
import * as fs from 'node:fs'
import 'dotenv/config' 


async function main(){

    // The client gets the API key from the enviroment variable `GEMINI_API_KEY`
    const genAI = new GoogleGenAI(process.env.GEMINI_API_KEY);

    const contents = 
    "Hi you can create a 3D render image butterfly" + "the color of the butterfly is blue and white" + "the background is a green forest" + "the butterfly is flying in the forest"

    // Set responseModalities to include "Images" so the model can generate an image
    const response = await genAI.models.generateContent({
        model: "gemini-2.0-flash-preview-image-generation",
        contents: contents,
        config: {
            responseModalities: [Modality.TEXT, Modality.IMAGE],
        },
    })

    for (const part of response.candidates[0].content.parts){
        // Based on the part type, either show the text or save the image
        if (part.text){
            console.log(part.text)
        } else if (part.inlineData) {
            const imageData = part.inlineData.data;
            const buffer = Buffer.from(imageData, "base64")
            fs.writeFileSync("gemini-native-image.webp", buffer);
            console.log("Image saved as gemini-native-image.webp");
        }
    }
}

main().catch(console.error);