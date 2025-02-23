import React from 'react';
import { User, Home, Settings, LogOut } from 'lucide-react';

export function Profile() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center space-x-4">
          <div className="bg-gray-100 p-4 rounded-full">
            <User className="h-12 w-12 text-gray-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">John Doe</h1>
            <p className="text-gray-600">john.doe@example.com</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">My Listed Properties</h2>
          <div className="space-y-4">
            {/* Property listings will be mapped here */}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
          <div className="space-y-4">
            <button className="w-full flex items-center justify-between px-4 py-2 text-left hover:bg-gray-50 rounded-lg">
              <span className="flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                Account Settings
              </span>
            </button>
            <button className="w-full flex items-center justify-between px-4 py-2 text-left hover:bg-gray-50 rounded-lg text-red-600">
              <span className="flex items-center">
                <LogOut className="h-5 w-5 mr-2" />
                Sign Out
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}