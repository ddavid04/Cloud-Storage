import {v2 as cloudinary} from "cloudinary"

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
})

export default async function handler(req, res) {
    const url = req.url.split('?')
    const searchTerm = url[1]
    const data = await cloudinary.search.expression(searchTerm).execute()
    res.status(200).json(data.resources)
}