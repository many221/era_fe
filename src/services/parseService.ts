import axios from 'axios';
import { ParseRequest } from '../types/ParseRequest';

export const parseAndFormat = async (request: ParseRequest): Promise<string> => {
    try {
        const requestBody = {
            county_name: request.countyName.toLowerCase(),
            link: request.link,
            parse_method: request.parseMethod,
            result_type: request.resultType + 's'
        };
        
        console.log('Request body being sent:', JSON.stringify(requestBody, null, 2));
        
        const response = await axios.post('http://localhost:8080/api/parse-and-format', requestBody, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        console.log('Successful response:', response.data);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Axios error:', {
                status: error.response?.status,
                statusText: error.response?.statusText,
                data: error.response?.data
            });
            throw new Error(`Server error: ${error.response?.status} - ${error.response?.data || error.message}`);
        }
        console.error('Error details:', error);
        throw error;
    }
}; 