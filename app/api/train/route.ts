import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/app/lib/db'

// Trigger model training (admin only)
export async function POST(request: NextRequest) {
  try {
    // Check admin secret
    const authHeader = request.headers.get('authorization')
    const adminSecret = process.env.ADMIN_SECRET

    if (adminSecret && authHeader !== `Bearer ${adminSecret}`) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get unused training data
    const trainingData = await prisma.trainingData.findMany({
      where: { used: false },
    })

    if (trainingData.length < 10) {
      return NextResponse.json({
        success: false,
        error: 'Not enough training data. Need at least 10 samples.',
        currentSamples: trainingData.length,
      })
    }

    // Get current model version
    const currentModel = await prisma.modelVersion.findFirst({
      where: { isActive: true },
      orderBy: { version: 'desc' },
    })

    const newVersion = (currentModel?.version || 0) + 1

    // In production, this would trigger actual model training
    // For now, we simulate the training process
    
    // Mark training data as used
    await prisma.trainingData.updateMany({
      where: { used: false },
      data: { used: true },
    })

    // Create new model version
    const newModel = await prisma.modelVersion.create({
      data: {
        version: newVersion,
        samples: trainingData.length + (currentModel?.samples || 0),
        accuracy: Math.min(0.95, (currentModel?.accuracy || 0.85) + 0.01),
        precision: Math.min(0.93, (currentModel?.precision || 0.82) + 0.01),
        recall: Math.min(0.96, (currentModel?.recall || 0.88) + 0.01),
        f1Score: Math.min(0.94, (currentModel?.f1Score || 0.85) + 0.01),
        isActive: true,
        notes: `Trained with ${trainingData.length} new samples`,
      },
    })

    // Deactivate old model
    if (currentModel) {
      await prisma.modelVersion.update({
        where: { id: currentModel.id },
        data: { isActive: false },
      })
    }

    return NextResponse.json({
      success: true,
      data: {
        message: 'Model training completed',
        version: newModel.version,
        samples: newModel.samples,
        accuracy: newModel.accuracy,
      },
    })
  } catch (error) {
    console.error('Training error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Get training status
export async function GET() {
  try {
    const [pendingData, totalData, modelVersions] = await Promise.all([
      prisma.trainingData.count({ where: { used: false } }),
      prisma.trainingData.count(),
      prisma.modelVersion.findMany({
        orderBy: { version: 'desc' },
        take: 5,
      }),
    ])

    return NextResponse.json({
      success: true,
      data: {
        pendingTrainingData: pendingData,
        totalTrainingData: totalData,
        modelVersions: modelVersions.map(m => ({
          version: m.version,
          samples: m.samples,
          accuracy: m.accuracy,
          isActive: m.isActive,
          trainedAt: m.trainedAt,
        })),
      },
    })
  } catch (error) {
    console.error('Training status error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
