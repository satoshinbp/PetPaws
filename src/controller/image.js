const multer = require('multer');
const { Storage } = require('@google-cloud/storage');

const storage = new Storage({
  projectId: process.env.FIREBASE_PROJECT_ID,
  keyFilename: process.env.CREDENTIAL_PATH,
});

const bucket = storage.bucket(process.env.FIREBASE_STORAGE_BUCKET);

const uploader = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // keep images size < 5 MB
  },
});

exports.create = (req, res) => {
  console.log(req);

  uploader.single('image');
  try {
    if (!req.file) {
      console.log('unkounko');
      res.status(400).send('No file uploaded.');
      return;
    }
    console.log('kiteruuuu');

    // This is where we'll upload our file to Cloud Storage
    const blob = bucket.file(req.file.originalname);

    // Create writable stream and specifying file mimetype
    const blobWriter = blob.createWriteStream({
      metadata: {
        contentType: req.file.mimetype,
      },
    });

    blobWriter.on('error', (err) => next(err));

    blobWriter.on('finish', () => {
      // Assembling public URL for accessing the file via HTTP
      const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURI(
        blob.name
      )}?alt=media`;

      // Return the file name and its public URL
      res.status(200).send({ fileName: req.file.originalname, fileLocation: publicUrl });
    });

    // When there is no more data to be consumed from the stream
    blobWriter.end(req.file.buffer);
  } catch (error) {
    console.log('bag,', error);
    res.status(400).send(`Error, could not upload file: ${error}`);
    return;
  }
};
