import { type NextRequest, NextResponse } from "next/server"

// In-memory storage (in production, you'd use a database)
const applications: any[] = [
  {
    id: 1,
    fullName: "Priya Sharma",
    currentPosition: "Digital Marketing Executive",
    totalExperience: "3-5",
    currentLocation: "Mumbai",
    relocateToAhmedabad: "yes",
    noticePeriod: "30-days",
    currentCTC: "6,00,000",
    expectedCTC: "8,50,000",
    appliedFor: "Digital Marketing Manager",
    submittedAt: "2024-01-15T10:30:00Z",
    status: "pending",
    cvFileName: "priya_sharma_cv.pdf",
    email: "priya.sharma@email.com",
    phone: "+91 9876543210",
  },
  {
    id: 2,
    fullName: "Rahul Patel",
    currentPosition: "SEO Analyst",
    totalExperience: "2-3",
    currentLocation: "Ahmedabad",
    relocateToAhmedabad: "yes",
    noticePeriod: "15-days",
    currentCTC: "4,50,000",
    expectedCTC: "6,00,000",
    appliedFor: "SEO Specialist",
    submittedAt: "2024-01-14T14:20:00Z",
    status: "reviewed",
    cvFileName: "rahul_patel_resume.pdf",
    email: "rahul.patel@email.com",
    phone: "+91 9876543211",
  },
]

const hireRequests: any[] = [
  {
    id: 1,
    clientName: "TechCorp Solutions",
    clientEmail: "hr@techcorp.com",
    employeeName: "Priya S.",
    position: "Senior Digital Marketing Manager",
    requestedAt: "2024-01-15T11:00:00Z",
    status: "pending",
    projectType: "E-commerce Marketing",
    duration: "6 months",
    budget: "₹15,00,000",
  },
]

// GET - Fetch all applications
export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      applications,
      hireRequests,
    })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to fetch data" }, { status: 500 })
  }
}

// POST - Add new application
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    const newApplication = {
      id: applications.length + 1,
      fullName: formData.get("fullName") as string,
      currentPosition: formData.get("currentPosition") as string,
      totalExperience: formData.get("totalExperience") as string,
      currentLocation: formData.get("currentLocation") as string,
      relocateToAhmedabad: formData.get("relocateToAhmedabad") as string,
      noticePeriod: formData.get("noticePeriod") as string,
      currentCTC: formData.get("currentCTC") as string,
      expectedCTC: formData.get("expectedCTC") as string,
      appliedFor: (formData.get("appliedFor") as string) || "General Application",
      submittedAt: new Date().toISOString(),
      status: "pending",
      cvFileName: (formData.get("cv") as File)?.name || "No CV uploaded",
      email: (formData.get("email") as string) || "Not provided",
      phone: (formData.get("phone") as string) || "Not provided",
    }

    // Add to applications array
    applications.push(newApplication)

    // Send email notification (you can integrate with actual email service)
    const emailData = {
      to: "accounts@brainito.com",
      subject: `New Job Application - ${newApplication.fullName}`,
      html: `
        <h2>New Job Application Received</h2>
        <p><strong>Name:</strong> ${newApplication.fullName}</p>
        <p><strong>Current Position:</strong> ${newApplication.currentPosition}</p>
        <p><strong>Experience:</strong> ${newApplication.totalExperience} years</p>
        <p><strong>Location:</strong> ${newApplication.currentLocation}</p>
        <p><strong>Willing to Relocate:</strong> ${newApplication.relocateToAhmedabad}</p>
        <p><strong>Notice Period:</strong> ${newApplication.noticePeriod}</p>
        <p><strong>Current CTC:</strong> ₹${newApplication.currentCTC}</p>
        <p><strong>Expected CTC:</strong> ₹${newApplication.expectedCTC}</p>
        <p><strong>Applied For:</strong> ${newApplication.appliedFor}</p>
        <p><strong>CV:</strong> ${newApplication.cvFileName}</p>
        <p><strong>Email:</strong> ${newApplication.email}</p>
        <p><strong>Phone:</strong> ${newApplication.phone}</p>
        <p><strong>Submitted At:</strong> ${new Date(newApplication.submittedAt).toLocaleString()}</p>
      `,
    }

    console.log("📧 Email would be sent to accounts@brainito.com:", emailData)
    console.log("✅ New application added:", newApplication)

    return NextResponse.json({
      success: true,
      message: "Application submitted successfully",
      application: newApplication,
    })
  } catch (error) {
    console.error("❌ Error processing application:", error)
    return NextResponse.json({ success: false, message: "Failed to submit application" }, { status: 500 })
  }
}

// PUT - Update application status
export async function PUT(request: NextRequest) {
  try {
    const { id, status, notes } = await request.json()

    const applicationIndex = applications.findIndex((app) => app.id === id)
    if (applicationIndex === -1) {
      return NextResponse.json({ success: false, message: "Application not found" }, { status: 404 })
    }

    applications[applicationIndex] = {
      ...applications[applicationIndex],
      status,
      notes: notes || applications[applicationIndex].notes,
      updatedAt: new Date().toISOString(),
    }

    return NextResponse.json({
      success: true,
      message: "Application updated successfully",
      application: applications[applicationIndex],
    })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to update application" }, { status: 500 })
  }
}
