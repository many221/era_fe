import axios from 'axios';
import { ParseRequest } from '../types/ParseRequest';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

// Create axios instance with default config
const api = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});

export const parseAndFormat = async (request: ParseRequest): Promise<string> => {
    try {
        const requestBody = {
            county_name: request.countyName.toLowerCase(),
            link: request.link,
            parse_method: request.parseMethod,
            result_type: `${request.resultType}s`
        };
        
        console.log('API URL:', baseURL);
        console.log('Request body being sent:', JSON.stringify(requestBody, null, 2));
        
        const response = await api.post('/parse-and-format', requestBody);

        console.log('Successful response:', response.data);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.code === 'ERR_NETWORK') {
                throw new Error(`Unable to connect to the server at ${baseURL}. Please check if the API is accessible.`);
            }
            console.error('Axios error:', {
                status: error.response?.status,
                statusText: error.response?.statusText,
                data: error.response?.data,
                code: error.code,
                url: baseURL
            });
            throw new Error(`Server error: ${error.response?.status} - ${error.response?.data || error.message}`);
        }
        console.error('Error details:', error);
        throw error;
    }
}; 