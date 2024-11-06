import React, { useState } from 'react';
import { FileText, Share2, AlertCircle } from 'lucide-react';

type LinkType = 'zip' | 'html' | 'pdf' | 'xml';
type OutputType = 'candidates' | 'measures';

function App() {
  const [county, setCounty] = useState('');
  const [fileLink, setFileLink] = useState('');
  const [outputType, setOutputType] = useState<OutputType>('candidates');
  const [linkType, setLinkType] = useState<LinkType>('html');
  const [result, setResult] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setResult(`
      <div class="election-results">
        <h2>${county} County Results</h2>
        <div class="results-data">
          <p>Results processed from ${fileLink}</p>
        </div>
      </div>
    `);
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("https://images.unsplash.com/photo-1449034446853-66c86144b0ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")'
      }}
    >
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">Election Results Parser</h1>
          <p className="text-blue-200">Transform election data into embeddable HTML content</p>
        </div>

        <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-8 mb-8 border-t-4 border-red-700">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="county" className="block text-sm font-medium text-gray-700">
                  County Name
                </label>
                <input
                  id="county"
                  type="text"
                  value={county}
                  onChange={(e) => setCounty(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-700 focus:border-blue-700 transition"
                  placeholder="Enter county name"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="fileLink" className="block text-sm font-medium text-gray-700">
                  File Link
                </label>
                <input
                  id="fileLink"
                  type="url"
                  value={fileLink}
                  onChange={(e) => setFileLink(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-700 focus:border-blue-700 transition"
                  placeholder="Enter file URL"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="outputType" className="block text-sm font-medium text-gray-700">
                  Output Type
                </label>
                <select
                  id="outputType"
                  value={outputType}
                  onChange={(e) => setOutputType(e.target.value as OutputType)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-700 focus:border-blue-700 transition"
                >
                  <option value="candidates">Candidates</option>
                  <option value="measures">Ballot Measures</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="linkType" className="block text-sm font-medium text-gray-700">
                  Link Type
                </label>
                <select
                  id="linkType"
                  value={linkType}
                  onChange={(e) => setLinkType(e.target.value as LinkType)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-700 focus:border-blue-700 transition"
                >
                  <option value="html">HTML</option>
                  <option value="pdf">PDF</option>
                  <option value="xml">XML</option>
                  <option value="zip">ZIP</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-red-700 via-blue-700 to-red-700 hover:from-red-800 hover:via-blue-800 hover:to-red-800 text-white font-medium py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center space-x-2 shadow-lg"
            >
              <FileText className="h-5 w-5" />
              <span>Process Results</span>
            </button>
          </form>
        </div>

        {result && (
          <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-8 border-t-4 border-blue-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Embeddable HTML</h2>
              <button
                onClick={() => navigator.clipboard.writeText(result)}
                className="inline-flex items-center space-x-2 text-blue-700 hover:text-blue-800"
              >
                <Share2 className="h-5 w-5" />
                <span>Copy Code</span>
              </button>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <pre className="text-sm text-gray-700 whitespace-pre-wrap">{result}</pre>
            </div>
            <div className="mt-4 flex items-center text-sm text-gray-500">
              <AlertCircle className="h-4 w-4 mr-2" />
              <span>Copy this code and embed it in your website</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;