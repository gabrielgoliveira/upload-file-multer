const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

module.exports = {
    dest: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'), /*Se não tiver nada definido no destination, o multer
    vai utilizar essa variavel dest*/

    storage: multer.diskStorage({
        destination: (req, file, cb) =>  {
            cb(null, path.resolve(__dirname, '..', '..', 'tmp', 'uploads'));
        },

        filename: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                if(err) cb(err);

                const filename = `${hash.toString('hex')}-${file.originalname}`;

                cb(null, filename);
            })
        }

    }),

    limits: {
        /*adicionar restrição referente ao tamanho do arquivo*/
        fileSize: 2 * 1024 * 1024,
    },

    fileFilter: (req, file, cb) => {
        /*Adicionar restrições do tipo de arquivo */
        const allowedMimes = [
            "image/jpeg",
            "image/pjpeg",
            "image/png",
            "image/gif"
        ];

        //verifica se o tipo de arquivo enviado está na lista de arquivos aceitos
        if(allowedMimes.includes(file.mimetype)) {
            cb(null, true); /*primeiro parametro é um erro, segundo é true ou false*/
        } else {
            cb(new Error('Invalid File Type.'));
        }
    },

};