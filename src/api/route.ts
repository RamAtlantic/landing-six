import twilio from "twilio";

export async function POST(request: Request) {
  try {
    const { phone } = await request.json()

    if (!phone) {
      return new Response(JSON.stringify({ error: "Phone number is required" }), { status: 400, headers: { 'Content-Type': 'application/json' } })
    }

    // Inicializar cliente de Twilio
    const accountSid = import.meta.env.TWILIO_ACCOUNT_SID
    const authToken = import.meta.env.TWILIO_AUTH_TOKEN
    const twilioNumber = import.meta.env.TWILIO_PHONE_NUMBER

    const twilioClient = twilio(accountSid, authToken)

    // Generar un código aleatorio de 6 dígitos
    const code = Math.floor(100000 + Math.random() * 900000)

    // Crear el mensaje
    const message = `¡Gracias por registrarte en Sportsbet! Tu código de verificación es: ${code}. Ingresa a https://sportsbet.bet.ar/codigo?c=${code} para activar tu cuenta.`

    // Enviar el mensaje de WhatsApp
    await twilioClient.messages.create({
      body: message,
      from: `whatsapp:${twilioNumber}`,
      to: `whatsapp:${phone}`,
    })

    return new Response(JSON.stringify({ success: true }), { status: 200, headers: { 'Content-Type': 'application/json' } })
  } catch (error) {
    console.error("Error sending WhatsApp message:", error)
    return new Response(JSON.stringify({ error: "Failed to send WhatsApp message" }), { status: 500, headers: { 'Content-Type': 'application/json' } })
  }
}
