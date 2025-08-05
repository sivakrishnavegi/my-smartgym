'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { CheckCircle, Dumbbell, CalendarCheck, Target } from 'lucide-react';
import Link from 'next/link';

const UserDashboard = () => {
  const handleCheckIn = () => {
    // Trigger QR generation or API call
    console.log('Check-in initiated');
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page Title */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-green-600">Welcome back, Hulk!</h1>
        <Link href={'/dashboard/user/check-in'} className=''>
        <Button
          onClick={handleCheckIn}
          className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
        >
          <CheckCircle size={18} />
          Check-In
        </Button>
        </Link>
      </div>

      {/* Dashboard Widgets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Workout Summary */}
        <Card className="bg-zinc-900 border-none text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-400">
              <Dumbbell size={20} /> Workout Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>Last Session: Chest & Back</p>
            <p>Calories Burned: 540 kcal</p>
            <p>Duration: 1 hr 15 mins</p>
          </CardContent>
        </Card>

        {/* Attendance */}
        <Card className="bg-zinc-900 border-none text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-400">
              <CalendarCheck size={20} /> Attendance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>Days This Month: 14 / 30</p>
            <p>Last Check-in: 3 hours ago</p>
          </CardContent>
        </Card>

        {/* Goal Tracker */}
        <Card className="bg-zinc-900 border-none text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-400">
              <Target size={20} /> Goal Tracker
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>Goal: Lose 3kg in 30 days</p>
            <p>Progress: 1.2kg down ✅</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserDashboard;
