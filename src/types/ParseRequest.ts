export interface ParseRequest {
    countyName: string;
    link: string;
    parseMethod: 'zip' | 'html' | 'pdf' | 'xml';
    resultType: 'candidates' | 'measures';
} 