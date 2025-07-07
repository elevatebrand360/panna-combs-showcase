import React, { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';

interface CheckResult {
  label: string;
  status: 'success' | 'fail' | 'pending';
  message?: string;
}

const testEndpoints = [
  { label: 'Main Site (HTTPS)', url: 'https://www.pannacombs.com/' },
  { label: 'Main Site (HTTP)', url: 'http://www.pannacombs.com/' },
  { label: 'Google DNS', url: 'https://dns.google/' },
  { label: 'Cloudflare DNS', url: 'https://1.1.1.1/' },
  { label: 'API Test (if any)', url: '/api/health' },
];

const NetworkDiagnostics: React.FC = () => {
  const [results, setResults] = useState<CheckResult[]>(
    testEndpoints.map(e => ({ label: e.label, status: 'pending' }))
  );
  const [ip, setIp] = useState<string>('');
  const [userAgent, setUserAgent] = useState<string>('');

  useEffect(() => {
    setUserAgent(navigator.userAgent);
    fetch('https://api.ipify.org?format=json')
      .then(res => res.json())
      .then(data => setIp(data.ip))
      .catch(() => setIp('Could not determine'));

    testEndpoints.forEach((endpoint, idx) => {
      fetch(endpoint.url, { method: 'HEAD', mode: 'no-cors' })
        .then(() => {
          setResults(prev => {
            const copy = [...prev];
            copy[idx] = { ...copy[idx], status: 'success', message: 'Reachable' };
            return copy;
          });
        })
        .catch((err) => {
          setResults(prev => {
            const copy = [...prev];
            copy[idx] = { ...copy[idx], status: 'fail', message: err.message || 'Not reachable' };
            return copy;
          });
        });
    });
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-2xl font-bold mb-4">Network Diagnostics</h1>
        <p className="mb-6 text-muted-foreground">This page checks if your device can reach the main site, DNS, and API endpoints. Share this info with your developer or hosting provider if you have issues.</p>
        <div className="mb-4">
          <div><b>Your IP:</b> {ip}</div>
          <div><b>User Agent:</b> <span className="break-all">{userAgent}</span></div>
        </div>
        <div className="space-y-4">
          {results.map((r, i) => (
            <div key={i} className="flex items-center gap-4 p-3 rounded border" style={{ background: r.status === 'success' ? '#e6ffed' : r.status === 'fail' ? '#ffeaea' : '#f8fafc' }}>
              <span className="font-medium w-48">{r.label}</span>
              <span className={r.status === 'success' ? 'text-green-600' : r.status === 'fail' ? 'text-red-600' : 'text-gray-500'}>
                {r.status === 'pending' ? 'Checking...' : r.status === 'success' ? '✅ Success' : '❌ Fail'}
              </span>
              <span className="text-xs text-muted-foreground">{r.message}</span>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <Button onClick={() => window.location.reload()}>Re-run Diagnostics</Button>
        </div>
        <div className="mt-8 text-sm text-muted-foreground">
          <p>If any check fails, try switching WiFi/mobile data, changing DNS to 8.8.8.8 or 1.1.1.1, or contacting your ISP/hosting provider with this info.</p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NetworkDiagnostics; 