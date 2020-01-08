


const mongoose = require('mongoose');
import Post from '../../db/models/ImageDetails';
//const {ImageInfo,validateImageInfo} =require('../../db/models/ImageDetails')
import fs from 'fs'


import formidable from 'formidable'
const CURRENT_WORKING_DIR = process.cwd();
const imagePath =CURRENT_WORKING_DIR+'\\public\\';


import errorHandler from "../../helpers/dbErrorHelper";


const postImage = async (req, res, next) => {
   
    

    const form = new formidable.IncomingForm()
    form.keepExtensions = true

    form.parse(req, (err, champs, files) => {
        if (err) {
            return res.status(400).json({
                error: "Impossible de charger l'image"
            })
        }

        let post = new Post(champs)
        post.postedBy = req.profile
        if (files.photo) {
            //besoin futur
            if (!(files.photo.type==='image/gif'||'image/png'||'image/jpeg'||'image/jpg')) {
                return res.status(400).json({

                    error: "Type de fichier non pris en charge"
                })
                
            }else{

                const filetype = files.photo.type.match(/[-\w.]+$/);
                const data = fs.readFileSync(files.photo.path)
                
                const imageId = `image-${Date.now()}`;
              try {
                fs.writeFileSync(`${imagePath}${imageId}.${filetype}`, data);
              }catch(err){
                return res.status(400).json({
                    error:"Problème lors de la sauvgarde de l'image!"
                })
              }
            post.imageURL = `/api/photo/${imageId}.${filetype}`
                }
        }
        //soit txt+img ou txt uniquement
        post.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler.getErrorMessage(err)
                })
            }

           return  res.json(result)
        })
    })

}

export default { postImage };