import nodemailer from 'nodemailer'
import { NextRequest, NextResponse } from 'next/server'

// Create email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD,
  },
})

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, message } = await request.json()

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Send email to your Gmail
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER, // Send to your own Gmail
      replyTo: email, // Reply-to the user's email
      subject: `New Message from ${name} - Portfolio Contact`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="margin: 0 0 10px 0; color: #333;">New Contact Form Submission</h2>
            <p style="margin: 0; color: #666;">You received a new message from your portfolio website.</p>
          </div>
          
          <div style="background: white; padding: 20px; border-radius: 8px; border: 1px solid #ddd;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
            <p><strong>Message:</strong></p>
            <div style="background: #f9f9f9; padding: 15px; border-left: 4px solid #007bff; border-radius: 4px; white-space: pre-wrap;">
${message}
            </div>
          </div>

          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center; color: #999; font-size: 12px;">
            <p>This email was sent from your portfolio contact form.</p>
          </div>
        </div>
      `,
    })

    // Also send a confirmation email to the user
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: email,
      subject: 'We received your message',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Thank you for reaching out!</h2>
          <p>Hi ${name},</p>
          <p>We've received your message and will get back to you as soon as possible, typically within 24 hours.</p>
          <p style="margin-top: 20px;">Best regards,<br/>Khalid Elalfie</p>
        </div>
      `,
    })

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Email sending error:', error)
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    )
  }
}
