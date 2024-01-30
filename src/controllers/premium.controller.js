// premium.controller.js
import { userModel } from "../dao/models/users.models.js";

export const updatePremium = async (req, res) => {
    const { uid } = req.params;

    try {
        const user = await userModel.findById(uid);

        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado.' });
        }

        // Verificar si el usuario ha cargado los documentos requeridos
        const requiredDocuments = ['Identificación', 'Comprobante de domicilio', 'Comprobante de estado de cuenta'];

        if (requiredDocuments.every(requiredDoc => user.documents.some(doc => doc.name === requiredDoc))) {
            // Actualizar el estado del usuario a premium
            user.premium = true;
            // Actualizar la última conexión del usuario
            user.last_connection = new Date();
            // Guardar el usuario actualizado en la base de datos
            await user.save();

            return res.status(200).json({ message: 'Usuario actualizado a premium exitosamente.' });
        } else {
            return res.status(400).json({ error: 'Faltan documentos requeridos.' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error interno del servidor.' });
    }
};

