import multer from 'multer';
import { userModel } from '../dao/models/users.models.js';

const upload = multer({ dest: 'uploads/documents/' });

export const uploadDocuments = async (req, res) => {
  const { uid } = req.params;

  try {
    const user = await userModel.findById(uid);

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado.' });
    }

    const uploadedFiles = req.files;
    const documents = [];

    if (uploadedFiles) {
      uploadedFiles.forEach(file => {
        documents.push({
          name: file.originalname,
          reference: `/uploads/documents/${file.filename}`
        });
      });

      // Agregar documentos al usuario en la base de datos
      user.documents = documents;
      // Guardar el usuario actualizado en la base de datos
      await user.save();

      return res.status(200).json({ message: 'Documentos subidos exitosamente.' });
    } else {
      return res.status(400).json({ error: 'No se recibieron archivos.' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error interno del servidor.' });
  }
};



