// src/pages/api/examples.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../server/db/client";
    

const tracker = async (req: NextApiRequest, res: NextApiResponse) => {
  const {tracker} = req.query;
  const token = (tracker as string).split('.')[0]
  if(!token) {
    res.status(404).end('not_found')
    return;
  } 
  try {
    await prisma.pixelTracker.update({
      where: {tracker: token},
      data: {openCount: {increment: 1}}
    })

    const image = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='

    const pixelImage = Buffer.from(image, "base64");
    res.writeHead(200, {
      'Content-Type': 'image/png',
      'Content-Length': pixelImage.length
    })
    // We replaced all the event handlers with a simple call to readStream.pipe()
    res.end(pixelImage)
  } catch (error: any) {
    console.log(error)
    res.status(500).json({error: error?.message})
  }
};

export default tracker;
