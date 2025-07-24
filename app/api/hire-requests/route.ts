import { type NextRequest, NextResponse } from "next/server"

// This would be shared with applications route in a real app
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

// POST - Add new hire request
export async function POST(request: NextRequest) {
  try {
    const requestData = await request.json()

    const newHireRequest = {
      id: hireRequests.length + 1,
      clientName: requestData.clientName || "Anonymous Client",
      clientEmail: requestData.clientEmail || "Not provided",
      employeeName: requestData.employeeName,
      position: requestData.position,
      requestedAt: new Date().toISOString(),
      status: "pending",
      projectType: requestData.projectType || "Not specified",
      duration: requestData.duration || "Not specified",
      budget: requestData.budget || "Not specified",
    }

    hireRequests.push(newHireRequest)

    console.log("✅ New hire request added:", newHireRequest)

    return NextResponse.json({
      success: true,
      message: "Hire request submitted successfully",
      hireRequest: newHireRequest,
    })
  } catch (error) {
    console.error("❌ Error processing hire request:", error)
    return NextResponse.json({ success: false, message: "Failed to submit hire request" }, { status: 500 })
  }
}

// PUT - Update hire request status
export async function PUT(request: NextRequest) {
  try {
    const { id, status } = await request.json()

    const requestIndex = hireRequests.findIndex((req) => req.id === id)
    if (requestIndex === -1) {
      return NextResponse.json({ success: false, message: "Hire request not found" }, { status: 404 })
    }

    hireRequests[requestIndex] = {
      ...hireRequests[requestIndex],
      status,
      updatedAt: new Date().toISOString(),
    }

    return NextResponse.json({
      success: true,
      message: "Hire request updated successfully",
      hireRequest: hireRequests[requestIndex],
    })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to update hire request" }, { status: 500 })
  }
}
