import axios from 'axios';

interface MetaEventData {
  event_name: string;
  event_time: number;
  action_source: string;
  user_data: {
    em: string[];
  };
  custom_data: {
    currency: string;
    value: string;
    visit_uid?: string;
  };
}

export async function sendMetaEvent(email: string, value: string = "10", visitUid?: string): Promise<boolean> {
  try {
    const eventData: MetaEventData = {
      event_name: "Purchase",
      event_time: Math.floor(Date.now() / 1000),
      action_source: "website",
      user_data: {
        em: ["7b17fb0bd173f625b58636fb796407c22b3d16fc78302d79f0fd30c2fc2fc068"]
      },
      custom_data: {
        currency: "USD",
        value: value,
        ...(visitUid && { visit_uid: visitUid })
      }
    };

    const accessToken = import.meta.env.VITE_META_ACCESS_TOKEN;
    const pixelId = import.meta.env.VITE_META_PIXEL_ID;
    const endpoint = import.meta.env.VITE_API_ENDPOINT;
    
    if (!endpoint) {
      throw new Error('Endpoint no configurado');
    }

    if (!accessToken) {
      throw new Error('Access Token no configurado');
    }

    if (!pixelId) {
      throw new Error('Pixel ID no configurado');
    }

    const payload = {
      eventData,
      accessToken,
      pixelId,
      visitUid
    };

    const response = await axios.post(endpoint, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 10000
    });

    console.log('Evento enviado exitosamente:', response.data);
    return true;
  } catch (error) {
    console.error('Error enviando evento a Meta:', error);
    return false;
  }
} 