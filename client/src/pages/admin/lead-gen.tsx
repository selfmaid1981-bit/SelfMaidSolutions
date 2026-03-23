import { useState } from 'react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Upload, FileText, CheckCircle, AlertCircle, Loader2, Database, Globe } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ProcessResult {
  success: boolean;
  message: string;
  totalRows: number;
  invalidSkipped: number;
  duplicatesRemoved: number;
  leadsAdded: number;
  emailsFound: number;
  errors: number;
  leads: { name: string; email: string; phone: string; score: number }[];
}

export default function LeadGenPage() {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<ProcessResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const adminKey = localStorage.getItem('adminApiKey') || '';

  const handleUpload = async () => {
    if (!file) return;
    setProcessing(true);
    setError(null);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const resp = await fetch('/api/admin/lead-gen/upload-csv', {
        method: 'POST',
        headers: { 'x-admin-api-key': adminKey },
        body: formData,
      });

      const data = await resp.json();
      if (!resp.ok) throw new Error(data.message || 'Upload failed');
      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-[#1F2A37] mb-2">Lead Generation Pipeline</h1>
        <p className="text-gray-600 mb-8">Upload Google Maps CSV data to clean, enrich, and push leads to your outreach sheet</p>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5 text-[#C6A969]" />
                Upload CSV
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
                  <input
                    type="file"
                    accept=".csv"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    className="hidden"
                    id="csv-upload"
                  />
                  <label htmlFor="csv-upload" className="cursor-pointer">
                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    {file ? (
                      <p className="text-[#1F2A37] font-medium">{file.name} ({(file.size / 1024).toFixed(1)} KB)</p>
                    ) : (
                      <>
                        <p className="text-gray-600 font-medium">Click to select a CSV file</p>
                        <p className="text-gray-400 text-sm mt-1">From Instant Data Scraper, Google Maps Export, etc.</p>
                      </>
                    )}
                  </label>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
                  <p className="font-medium text-[#1F2A37] mb-2">Expected CSV columns:</p>
                  <p>name (required), address, phone, website, category, rating, reviews</p>
                  <p className="text-gray-400 mt-1">Column names are matched flexibly — most scraper exports work automatically</p>
                </div>

                <Button
                  onClick={handleUpload}
                  disabled={!file || processing}
                  className="w-full bg-[#1F2A37] hover:bg-[#1F2A37]/90 text-white py-3"
                >
                  {processing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Processing leads...
                    </>
                  ) : (
                    <>
                      <Database className="w-4 h-4 mr-2" />
                      Process & Push to Sheet
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {error && (
            <Card className="border-red-200 bg-red-50">
              <CardContent className="p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
                <p className="text-red-700">{error}</p>
              </CardContent>
            </Card>
          )}

          {result && (
            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-700">
                  <CheckCircle className="w-5 h-5" />
                  Processing Complete
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <p className="text-2xl font-bold text-[#1F2A37]">{result.totalRows}</p>
                    <p className="text-xs text-gray-500">Total Rows</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-3 text-center">
                    <p className="text-2xl font-bold text-green-600">{result.leadsAdded}</p>
                    <p className="text-xs text-gray-500">New Leads</p>
                  </div>
                  <div className="bg-yellow-50 rounded-lg p-3 text-center">
                    <p className="text-2xl font-bold text-yellow-600">{result.duplicatesRemoved}</p>
                    <p className="text-xs text-gray-500">Duplicates</p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-3 text-center">
                    <p className="text-2xl font-bold text-blue-600">{result.emailsFound}</p>
                    <p className="text-xs text-gray-500">Emails Found</p>
                  </div>
                </div>

                {result.leads.length > 0 && (
                  <div>
                    <p className="font-medium text-[#1F2A37] mb-2">Added Leads:</p>
                    <div className="max-h-64 overflow-y-auto border rounded-lg">
                      <table className="w-full text-sm">
                        <thead className="bg-gray-50 sticky top-0">
                          <tr>
                            <th className="text-left p-2 font-medium">Name</th>
                            <th className="text-left p-2 font-medium">Phone</th>
                            <th className="text-left p-2 font-medium">Email</th>
                            <th className="text-center p-2 font-medium">Score</th>
                          </tr>
                        </thead>
                        <tbody>
                          {result.leads.map((lead, i) => (
                            <tr key={i} className="border-t">
                              <td className="p-2">{lead.name}</td>
                              <td className="p-2 text-gray-600">{lead.phone || '—'}</td>
                              <td className="p-2 text-gray-600">
                                {lead.email ? (
                                  <span className="flex items-center gap-1 text-green-600">
                                    <Globe className="w-3 h-3" />
                                    {lead.email}
                                  </span>
                                ) : '—'}
                              </td>
                              <td className="p-2 text-center">
                                <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                                  lead.score >= 3 ? 'bg-green-100 text-green-700' :
                                  lead.score >= 2 ? 'bg-yellow-100 text-yellow-700' :
                                  'bg-gray-100 text-gray-700'
                                }`}>
                                  {lead.score}/3
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                <p className="text-sm text-gray-500 mt-4">
                  {result.message}
                </p>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">How It Works</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-600 space-y-2">
              <p><strong>1. Scrape</strong> — Use Instant Data Scraper (free Chrome extension) to export Google Maps results as CSV</p>
              <p><strong>2. Upload</strong> — Drop the CSV here. The system auto-detects columns.</p>
              <p><strong>3. Clean</strong> — Names, phones, and addresses are normalized. Invalid rows are skipped.</p>
              <p><strong>4. Deduplicate</strong> — Checks against your database and existing Google Sheet to prevent duplicates.</p>
              <p><strong>5. Enrich</strong> — Visits each business website to find contact emails (no paid APIs).</p>
              <p><strong>6. Score</strong> — Each lead gets a 0–3 score (+1 website, +1 phone, +1 email found).</p>
              <p><strong>7. Push</strong> — Clean leads go straight to your Google Sheet for automated outreach.</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}
