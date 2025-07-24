import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    // Extract form data
    const applicationData = {
      fullName: formData.get("fullName"),
      currentPosition: formData.get("currentPosition"),
      totalExperience: formData.get("totalExperience"),
      currentLocation: formData.get("currentLocation"),
      relocateToAhmedabad: formData.get("relocateToAhmedabad"),
      noticePeriod: formData.get("noticePeriod"),
      currentCTC: formData.get("currentCTC"),
      expectedCTC: formData.get("expectedCTC"),
      cv: formData.get("cv") as File,
    }

    // Here you would integrate with your email service (SendGrid, Nodemailer, etc.)
    // For now, we'll just log the data and return success

    console.log("New job application received:", applicationData)

    // Email configuration for accounts@brainito.com
    const emailData = {
      to: "accounts@brainito.com",
      subject: `New Job Application - ${applicationData.fullName}`,
      html: `
        <h2>New Job Application Received</h2>
        <p><strong>Name:</strong> ${applicationData.fullName}</p>
        <p><strong>Current Position:</strong> ${applicationData.currentPosition}</p>
        <p><strong>Experience:</strong> ${applicationData.totalExperience}</p>
        <p><strong>Location:</strong> ${applicationData.currentLocation}</p>
        <p><strong>Willing to Relocate:</strong> ${applicationData.relocateToAhmedabad}</p>
        <p><strong>Notice Period:</strong> ${applicationData.noticePeriod}</p>
        <p><strong>Current CTC:</strong> ₹${applicationData.currentCTC}</p>
        <p><strong>Expected CTC:</strong> ₹${applicationData.expectedCTC}</p>
        <p><strong>CV:</strong> ${applicationData.cv?.name || "No file uploaded"}</p>
      `,
    }

    // TODO: Implement actual email sending logic here
    // Example with SendGrid:
    // await sendEmail(emailData)

    return NextResponse.json({
      success: true,
      message: "Application submitted successfully",
    })
  } catch (error) {
    console.error("Error processing application:", error)
    return NextResponse.json({ success: false, message: "Failed to submit application" }, { status: 500 })
  }
}
