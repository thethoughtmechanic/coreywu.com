
import { useState, useEffect } from "react";
import { ChevronLeft } from "lucide-react";
import { useLocation } from "wouter";

interface EmailSubmission {
  email: string;
  timestamp: string;
  page: string;
}

export default function EmailSubmissions() {
  const [, setLocation] = useLocation();
  const [submissions, setSubmissions] = useState<EmailSubmission[]>([]);

  useEffect(() => {
    // Get all email submissions from localStorage
    const stored = localStorage.getItem('email-submissions');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setSubmissions(parsed.sort((a: EmailSubmission, b: EmailSubmission) => 
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        ));
      } catch (error) {
        console.error('Error parsing stored submissions:', error);
      }
    }
  }, []);

  const clearAllSubmissions = () => {
    if (confirm('Are you sure you want to clear all email submissions?')) {
      localStorage.removeItem('email-submissions');
      setSubmissions([]);
    }
  };

  const exportToCsv = () => {
    const csvContent = [
      ['Email', 'Page', 'Timestamp'],
      ...submissions.map(sub => [sub.email, sub.page, sub.timestamp])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `email-submissions-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Back button */}
      <button
        onClick={() => setLocation('/')}
        className="inline-flex items-center gap-2 text-warm-brown hover:text-hover-brown transition-colors duration-200 mb-8"
      >
        <ChevronLeft className="w-4 h-4" />
        Back to Home
      </button>

      <div className="mb-8">
        <h1 className="text-4xl font-light text-amber-700 mb-4">
          Email Submissions
        </h1>
        <p className="text-warm-brown/70 mb-6">
          All email signups collected from your landing pages (stored locally in browser)
        </p>
        
        <div className="flex gap-4 mb-6">
          <button
            onClick={exportToCsv}
            disabled={submissions.length === 0}
            className="bg-warm-brown text-white px-4 py-2 rounded hover:bg-hover-brown transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Export to CSV ({submissions.length})
          </button>
          <button
            onClick={clearAllSubmissions}
            disabled={submissions.length === 0}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Clear All
          </button>
        </div>
      </div>

      {submissions.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-warm-brown/70 text-lg">No email submissions yet.</p>
          <p className="text-warm-brown/50 text-sm mt-2">
            Email signups will appear here automatically.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-light-brown">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-warm-brown uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-warm-brown uppercase tracking-wider">
                    Page
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-warm-brown uppercase tracking-wider">
                    Date & Time
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {submissions.map((submission, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {submission.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {submission.page}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(submission.timestamp).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
