import React, { useState } from 'react'
import { useUserTracking } from '../contexts/TrackingContext'

export const TrackingDebug: React.FC = () => {
  const { trackingData, sendTrackingData, getSessionId, getVisitUid, getEvents } = useUserTracking()
  const [isVisible, setIsVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSendData = async () => {
    setIsLoading(true)
    try {
      await sendTrackingData()
      alert('Datos enviados exitosamente')
    } catch (error) {
      alert('Error enviando datos: ' + error)
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    alert('Copiado al portapapeles')
  }

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg z-50"
      >
        Debug Tracking
      </button>
    )
  }

  return (
    <div className="fixed inset-4 bg-black/90 text-white p-6 rounded-lg z-50 overflow-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Debug de Tracking</h2>
        <button
          onClick={() => setIsVisible(false)}
          className="bg-red-600 px-4 py-2 rounded"
        >
          Cerrar
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Información del Usuario */}
        <div className="bg-gray-800 p-4 rounded">
          <h3 className="text-lg font-bold mb-4">Información del Usuario</h3>
          {trackingData ? (
            <div className="space-y-2 text-sm">
              <div><strong>Visit UID:</strong> {trackingData.visitUid}</div>
              <div><strong>Session ID:</strong> {trackingData.sessionId}</div>
              <div><strong>User Agent:</strong> {trackingData.userAgent.substring(0, 50)}...</div>
              <div><strong>Plataforma:</strong> {trackingData.platform}</div>
              <div><strong>Idioma:</strong> {trackingData.language}</div>
              <div><strong>IP:</strong> {trackingData.ipAddress || 'No disponible'}</div>
              <div><strong>Timezone:</strong> {trackingData.timezone}</div>
              <div><strong>Dispositivo:</strong> {trackingData.isMobile ? 'Mobile' : trackingData.isTablet ? 'Tablet' : 'Desktop'}</div>
            </div>
          ) : (
            <p>Cargando...</p>
          )}
        </div>

        {/* Información de Pantalla */}
        <div className="bg-gray-800 p-4 rounded">
          <h3 className="text-lg font-bold mb-4">Pantalla</h3>
          {trackingData ? (
            <div className="space-y-2 text-sm">
              <div><strong>Resolución:</strong> {trackingData.screenWidth}x{trackingData.screenHeight}</div>
              <div><strong>Viewport:</strong> {trackingData.viewportWidth}x{trackingData.viewportHeight}</div>
              <div><strong>Pixel Ratio:</strong> {trackingData.pixelRatio}</div>
              <div><strong>Color Depth:</strong> {trackingData.colorDepth}</div>
            </div>
          ) : (
            <p>Cargando...</p>
          )}
        </div>

        {/* Información de Tiempo */}
        <div className="bg-gray-800 p-4 rounded">
          <h3 className="text-lg font-bold mb-4">Tiempo</h3>
          {trackingData ? (
            <div className="space-y-2 text-sm">
              <div><strong>Tiempo Activo:</strong> {Math.round(trackingData.totalActiveTime / 1000)}s</div>
              <div><strong>Última Actividad:</strong> {new Date(trackingData.lastActivityTime).toLocaleTimeString()}</div>
              <div><strong>Inicio Sesión:</strong> {new Date(trackingData.sessionStartTime).toLocaleTimeString()}</div>
            </div>
          ) : (
            <p>Cargando...</p>
          )}
        </div>

        {/* Información de Interacciones */}
        <div className="bg-gray-800 p-4 rounded">
          <h3 className="text-lg font-bold mb-4">Interacciones</h3>
          {trackingData ? (
            <div className="space-y-2 text-sm">
              <div><strong>Page Views:</strong> {trackingData.pageViews}</div>
              <div><strong>Clicks:</strong> {trackingData.clicks}</div>
              <div><strong>Scroll Depth:</strong> {Math.round(trackingData.scrollDepth)}%</div>
              <div><strong>Mouse Movements:</strong> {trackingData.mouseMovements}</div>
            </div>
          ) : (
            <p>Cargando...</p>
          )}
        </div>
      </div>

      {/* Eventos */}
      <div className="mt-6 bg-gray-800 p-4 rounded">
        <h3 className="text-lg font-bold mb-4">Eventos ({getEvents().length})</h3>
        <div className="max-h-40 overflow-auto">
          {getEvents().map((event, index) => (
            <div key={index} className="text-sm mb-2 p-2 bg-gray-700 rounded">
              <strong>{event.type}</strong> - {new Date(event.timestamp).toLocaleTimeString()}
            </div>
          ))}
        </div>
      </div>

      {/* Acciones */}
      <div className="mt-6 flex gap-4">
        <button
          onClick={handleSendData}
          disabled={isLoading}
          className="bg-green-600 px-4 py-2 rounded disabled:opacity-50"
        >
          {isLoading ? 'Enviando...' : 'Enviar Datos'}
        </button>
        
        <button
          onClick={() => copyToClipboard(JSON.stringify(trackingData, null, 2))}
          className="bg-blue-600 px-4 py-2 rounded"
        >
          Copiar Datos
        </button>
        
        <button
          onClick={() => copyToClipboard(JSON.stringify(getEvents(), null, 2))}
          className="bg-purple-600 px-4 py-2 rounded"
        >
          Copiar Eventos
        </button>
      </div>
    </div>
  )
} 