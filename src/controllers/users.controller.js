import { userModel } from "../dao/models/users.models.js";
import nodemailer from "nodemailer";

export const getUser = async (req, res) => {
    try {
        const users = await userModel.find()
        res.status(200).send({ respuesta: 'OK', mensaje: users })
    } catch (error) {
        res.status(400).send({ respuesta: 'Error en consultar usuarios', mensaje: error })
    }
}

export const getUserById = async (req, res) => {
    const { id } = req.params
    try {
        const user = await userModel.findById(id)
        if (user) {
            res.status(200).send({ respuesta: 'OK', mensaje: user })
        } else {
            res.status(404).send({ respuesta: 'Error en consultar usuario', mensaje: 'User not Found' })
        }
    } catch (error) {
        res.status(400).send({ respuesta: 'Error en consultar usuario', mensaje: error })
    }
}



export const putUser = async (req, res) => {
    const { id } = req.params
    const { nombre, apellido, edad, email, password } = req.body
    try {
        const user = await userModel.findByIdAndUpdate(id, { nombre, apellido, edad, email, password })
        if (user) {
            res.status(200).send({ respuesta: 'OK', mensaje: user })
        } else {
            res.status(404).send({ respuesta: 'Error en actualizar usuario', mensaje: 'User not Found' })
        }
    } catch (error) {
        res.status(400).send({ respuesta: 'Error en actualizar usuario', mensaje: error })
    }
}

export const userDelete = async (req, res) => {
    const { id } = req.params
    try {
        const user = await userModel.findByIdAndDelete(id)
        if (user) {
            res.status(200).send({ respuesta: 'OK', mensaje: user })
        } else {
            res.status(404).send({ respuesta: 'Error en eliminar usuario', mensaje: 'User not Found' })
        }
    } catch (error) {
        res.status(400).send({ respuesta: 'Error en eliminar usuario', mensaje: error })
    }
}

const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "mail@gmail.com",
      pass: process.env.PASSWORD_EMAIL,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  
  export const sendPasswordResetEmail = async (userEmail) => {
    const resetToken = crypto.randomBytes(20).toString("hex");
    // Guarda resetToken en la base de datos junto con el correo del usuario y una marca de tiempo
  
    const resetLink = `http://localhost:5173/reset-password/${resetToken}`;
  
    const mailOptions = {
      from: "alan.g.passarelli@gmail.com",
      to: userEmail,
      subject: "Restablecimiento de Contraseña",
      html: `<p>Haz clic en el siguiente enlace para restablecer tu contraseña: <a href="${resetLink}">Restablecer Contraseña</a></p>`,
    };
  
    await transporter.sendMail(mailOptions);
  };
  
  export const getUserByEmail = async (email) => {
    return userModel.findOne({ email });
  };

