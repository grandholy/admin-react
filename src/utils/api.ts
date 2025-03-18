const API_BASE_URL = `${window.location.origin}/api`;

// Generic function to handle fetch requests with error handling
async function fetchApi<T>(
  endpoint: string, 
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching from ${url}:`, error);
    throw error;
  }
}

// Settings API
export interface SettingsData {
  [key: string]: string;
}

export const settingsApi = {
  getAll: async (): Promise<SettingsData> => {
    return fetchApi<SettingsData>('/settings');
  },
  
  saveSettings: async (settings: Record<string, any>): Promise<{success: boolean}> => {
    // Convert any non-string values to strings
    const processedSettings: Record<string, string> = {};
    Object.entries(settings).forEach(([key, value]) => {
      if (value !== undefined) {
        processedSettings[key] = String(value);
      }
    });
    
    return fetchApi<{success: boolean}>('/settings', {
      method: 'POST',
      body: JSON.stringify(processedSettings),
    });
  },
  
  getSetting: async (key: string): Promise<{key: string, value: string}> => {
    return fetchApi<{key: string, value: string}>(`/settings/${key}`);
  }
};

// Health check
export const healthApi = {
  check: async (): Promise<{status: string, timestamp: string}> => {
    return fetchApi<{status: string, timestamp: string}>('/health');
  }
};

export default {
  settings: settingsApi,
  health: healthApi
}; 