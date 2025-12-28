const express = require("express")
const path = require("path")
const cors = require("cors")

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Serve static files from public directory
app.use(express.static(path.join(__dirname, "public")))

// Contact form API endpoint
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body

    // Validate input
    if (!name || !email || !message) {
      return res.status(400).json({
        error: "All fields are required",
      })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: "Invalid email format",
      })
    }

    // Log the contact form submission
    console.log("\n=== New Contact Form Submission ===")
    console.log("Name:", name)
    console.log("Email:", email)
    console.log("Message:", message)
    console.log("Timestamp:", new Date().toISOString())
    console.log("===================================\n")

    // Here you can add additional functionality:
    // - Send email using nodemailer
    // - Save to database
    // - Send to CRM
    // - Trigger notifications

    // Example with nodemailer (commented out - requires configuration):
    /*
    const nodemailer = require('nodemailer');
    
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'anohquantum@gmail.com',
      subject: `Portfolio Contact: ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      replyTo: email
    });
    */

    // Return success response
    res.status(200).json({
      success: true,
      message: "Message sent successfully! We'll get back to you soon.",
    })
  } catch (error) {
    console.error("Error processing contact form:", error)
    res.status(500).json({
      error: "Server error. Please try again later.",
    })
  }
})

// Serve index.html for all other routes (SPA support)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"))
})

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
  console.log(`Contact form API available at http://localhost:${PORT}/api/contact`)
})
