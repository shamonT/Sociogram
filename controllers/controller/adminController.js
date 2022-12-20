
import Admin from "../models/adminModel.js";
import Jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import asyncHandler from "express-async-handler"
 
export const registerAdmin = asyncHandler(async (req, res) => {
  console.log('Register admin called')
    const { name, email, password } = req.body
  
    if (!name || !email || !password) {
      res.status(400)
      throw new Error('Please add all fields')
    }
  
    // Check if user exists
    const adminExists = await Admin.findOne({ email })
  
    if (adminExists) {
      res.status(400)
      throw new Error('Admin already exists')
    }
  
    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
  
    // Create user
    const admin = await Admin.create({
      name,
      email,
      password: hashedPassword,
    })
  
    if (admin) {
      res.status(201).json({
        _id: admin.id,
        name: admin.name,
        email: admin.email,
        token: generateToken(admin._id),
      })
    } else {
      res.status(400)
      throw new Error('Invalid user data')
    }
  })
  




    export const  loginAdmin = asyncHandler(async (req, res) => {
  console.log('Login admin called')

        const { email, password } = req.body
      
        // Check for user email
        const admin = await Admin.findOne({ email })
      
        if (admin && (await bcrypt.compare(password, admin.password))) {
          res.status(201).json({
            _id: admin.id,
            name: admin.name,
            email: admin.email,
            token: generateToken(admin._id)
          })
        } else {
          res.status(400)
          throw new Error('Invalid credentials')
        }
      })
    

      const generateToken = (id) => {
        return Jwt.sign({ id }, process.env.JWT_SECRET, {
          expiresIn: '30d',
        })
      }
