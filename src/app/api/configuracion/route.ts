import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // In a real application, this would save to database
    // For now, we'll just log and return success
    console.log('Configuration saved:', body)
    
    // Simulate some processing time
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    return NextResponse.json({ 
      success: true, 
      message: 'Configuración guardada exitosamente',
      config: body
    })
  } catch (error) {
    console.error('Error saving configuration:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    // Return default configuration
    const defaultConfig = {
      nombreSistema: 'Metro Líneas',
      zonaHoraria: 'GMT-5 (América/Bogotá)',
      idioma: 'Español',
      moneda: 'COP (Peso Colombiano)',
      horarioInicio: '05:00',
      horarioFin: '23:00',
      intervaloTrenes: '3',
      capacidadMaxima: '200'
    }
    
    return NextResponse.json(defaultConfig)
  } catch (error) {
    console.error('Error fetching configuration:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}