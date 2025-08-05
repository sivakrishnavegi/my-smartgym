'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { QRCode } from 'react-qrcode-logo';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { CalendarCheck, History } from 'lucide-react';
import useAxiosAuth from '@/lib/axiosAuth';
import { toast } from 'react-toastify';

interface AttendanceLog {
  date: string;
  checkInTime: string;
  status: string;
}

const CheckInPage = () => {
  const axiosAuth = useAxiosAuth();

  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState('');
  const [status, setStatus] = useState('');
  const [qrCodeData, setQrCodeData] = useState('');
  const [logs, setLogs] = useState<AttendanceLog[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchLogs = async () => {
    try {
      const res = await axiosAuth.post('/attendance/logs');
      setLogs(res.data.logs || []);
    } catch (err) {
      console.log('Failed to fetch logs');
    }
  };

  const handleCheckIn = async () => {
    setLoading(true);
    try {
      const res = await axiosAuth.post('/attendance/checkin');
      const { success, message, data } = res.data;

      const currentStatus = data?.status || '';
      const checkInTimeStr = data?.checkInTime
        ? new Date(data.checkInTime).toLocaleTimeString()
        : '';

      setStatus(currentStatus);
      setCheckInTime(checkInTimeStr);

      if (!success && currentStatus !== 'success') {
        setQrCodeData(res.data.qrCodeData || `check-in:${data.userId}:${Date.now()}`);
        toast.info('Scan QR to complete check-in process.');
      } else if (success && data.qrCodeData) {
        setQrCodeData(data.qrCodeData);
        toast.success('QR Code generated! Awaiting confirmation.');
      } else if (success && currentStatus === 'success') {
        setIsCheckedIn(true);
        toast.success('✅ You have already checked in successfully.');
      } else {
        toast.info(message || 'No action needed.');
      }

    } catch (err) {
      toast.error('Check-in failed');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-green-600">Today&#39;s Check-In</h1>
        <Button
          onClick={handleCheckIn}
          disabled={loading || status === 'success'}
          className="bg-green-600 text-white"
        >
          {loading ? 'Processing...' : status === 'success' ? 'Already Checked In' : 'Generate QR & Check-In'}
        </Button>
      </div>

      {/* QR or Status */}
      <Card className="bg-zinc-900 border-none text-white">
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-green-400">
            <CalendarCheck size={20} /> Check-In Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          {status === 'success' ? (
            <p className="text-green-500">
              ✅ Checked in at <strong>{checkInTime}</strong> (Status: <em>{status}</em>)
            </p>
          ) : qrCodeData ? (
            <div className="flex flex-col items-center gap-2">
              <QRCode value={qrCodeData} size={180} />
              <p className="text-sm text-gray-400 mt-2">Scan this code to complete attendance</p>
            </div>
          ) : (
            <p className="text-gray-500">Not checked in yet. Tap the button above to generate your QR.</p>
          )}
        </CardContent>
      </Card>

      {/* Logs */}
      <Card className="bg-zinc-900 border-none text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-400">
            <History size={20} /> Recent Logs
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          {logs.length > 0 ? (
            logs.map((log, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div>
                  <p>{new Date(log.date).toLocaleDateString()}</p>
                  <p className="text-xs text-gray-400">{new Date(log.checkInTime).toLocaleTimeString()}</p>
                </div>
                <p className="text-green-500 capitalize">{log.status}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-400">No logs found.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CheckInPage;
