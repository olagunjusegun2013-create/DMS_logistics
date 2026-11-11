import React, { useState } from 'react';
import { Courier, ScreenId } from '../../types/logistics';

interface DriversManagementSectionProps {
  couriers: Courier[];
  onNavigate: (screenId: ScreenId) => void;
  onDeleteCourier: (courierId: string) => void;
  onDeleteAllDemoCouriers: () => void;
  onAddCourier: (courier: Courier) => void;
}

export const DriversManagementSection: React.FC<DriversManagementSectionProps> = ({
  couriers,
  onNavigate,
  onDeleteCourier,
  onDeleteAllDemoCouriers,
  onAddCourier,
}) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newVehicle, setNewVehicle] = useState('Toyota HiAce Van (LND-550-AZ)');
  const [newLocation, setNewLocation] = useState('Ikeja Industrial Zone');
  const [searchQuery, setSearchQuery] = useState('');

  const demoCount = couriers.filter((c) => c.isDemo).length;

  const handleCreateCourier = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const newCourier: Courier = {
      id: `drv-${Date.now()}`,
      name: newName.trim(),
      trackingCode: `#DMS-DRV-${Math.floor(100 + Math.random() * 900)}`,
      vehicle: newVehicle,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256',
      speed: '0 km/h • Stationed',
      status: 'Available Idle',
      statusColor: 'amber',
      eta: 'Ready for Dispatch',
      battery: '100% | 5G Optic',
      rating: 5.0,
      phone: newPhone.trim() || '+234 800 000 0000',
      location: newLocation,
      parcelsLeft: 0,
      isDemo: false,
    };

    onAddCourier(newCourier);
    setNewName('');
    setNewPhone('');
    setIsAddModalOpen(false);
  };

  const filteredCouriers = couriers.filter((c) => {
    const q = searchQuery.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      c.trackingCode.toLowerCase().includes(q) ||
      c.vehicle.toLowerCase().includes(q) ||
      c.location.toLowerCase().includes(q)
    );
  });

  return (
    <div className="flex-1 p-3.5 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[26px] text-secondary">badge</span>
            <h1 className="font-['Manrope'] text-2xl font-extrabold text-[#0c1d2c]">
              Courier &amp; Driver Fleet Directory
            </h1>
          </div>
          <p className="text-xs text-[#74777e] mt-1">
            Registered on-field logistics personnel, mobile handsets, and live status
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          {demoCount > 0 && (
            <button
              type="button"
              onClick={onDeleteAllDemoCouriers}
              className="px-3.5 py-2 bg-error-container text-error hover:bg-error hover:text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-error/20"
              title="Delete all pre-seeded demo drivers from database"
            >
              <span className="material-symbols-outlined text-[16px]">person_remove</span>
              Delete All Demo Accounts ({demoCount})
            </button>
          )}

          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 bg-[#994700] hover:bg-[#d97732] text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">person_add</span>
            + Register Real Driver
          </button>
        </div>
      </div>

      {/* KPI Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-white p-3.5 rounded-xl border border-outline-variant/30 shadow-xs">
          <span className="text-[11px] text-[#74777e] uppercase font-semibold">Total Drivers</span>
          <div className="text-xl font-bold text-[#0c1d2c] mt-0.5">{couriers.length}</div>
        </div>
        <div className="bg-white p-3.5 rounded-xl border border-outline-variant/30 shadow-xs">
          <span className="text-[11px] text-emerald-600 uppercase font-semibold">Active In Transit</span>
          <div className="text-xl font-bold text-emerald-700 mt-0.5">
            {couriers.filter((c) => c.status === 'In Transit').length}
          </div>
        </div>
        <div className="bg-white p-3.5 rounded-xl border border-outline-variant/30 shadow-xs">
          <span className="text-[11px] text-amber-600 uppercase font-semibold">Available Idle</span>
          <div className="text-xl font-bold text-amber-700 mt-0.5">
            {couriers.filter((c) => c.status === 'Available Idle').length}
          </div>
        </div>
        <div className="bg-white p-3.5 rounded-xl border border-outline-variant/30 shadow-xs">
          <span className="text-[11px] text-blue-600 uppercase font-semibold">Delivering Drop-Off</span>
          <div className="text-xl font-bold text-blue-700 mt-0.5">
            {couriers.filter((c) => c.status === 'Delivering Drop-off').length}
          </div>
        </div>
      </div>

      {/* Search Input */}
      <div className="bg-white p-3.5 rounded-xl border border-outline-variant/30 shadow-sm">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search driver by name, badge ID, plate, or corridor zone..."
            className="w-full bg-[#f8f9ff] text-xs px-3 py-2 pl-9 rounded-lg border border-outline-variant/40 focus:outline-none focus:ring-1 focus:ring-secondary"
          />
          <span className="material-symbols-outlined text-[18px] text-[#74777e] absolute left-2.5 top-2.5">
            search
          </span>
        </div>
      </div>

      {/* Drivers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredCouriers.length === 0 ? (
          <div className="col-span-full bg-white p-12 text-center rounded-xl border border-outline-variant/30">
            <span className="material-symbols-outlined text-[48px] text-slate-300 block mb-2">
              group_off
            </span>
            <p className="font-bold text-base text-[#0c1d2c]">No courier accounts in database</p>
            <p className="text-xs text-[#74777e] mt-1 max-w-sm mx-auto">
              All demo accounts have been deleted. Click &ldquo;+ Register Real Driver&rdquo; above to onboard your enterprise fleet couriers.
            </p>
            <button
              type="button"
              onClick={() => setIsAddModalOpen(true)}
              className="mt-4 px-4 py-2 bg-[#142b45] text-white text-xs font-semibold rounded-lg hover:bg-[#00162e] transition-colors cursor-pointer"
            >
              + Add First Driver
            </button>
          </div>
        ) : (
          filteredCouriers.map((courier) => (
            <div
              key={courier.id}
              className="bg-white rounded-xl border border-outline-variant/30 shadow-sm p-4 flex flex-col justify-between space-y-3.5 hover:shadow-md transition-shadow group relative"
            >
              {courier.isDemo && (
                <div className="absolute top-3 right-3 text-[9px] bg-amber-100 text-amber-800 font-mono px-1.5 py-0.5 rounded font-bold">
                  DEMO ACCOUNT
                </div>
              )}

              <div className="flex items-start gap-3">
                <img
                  src={courier.avatar}
                  alt={courier.name}
                  className="w-12 h-12 rounded-full object-cover border border-outline-variant/40 shrink-0"
                />
                <div className="flex-1 min-w-0 pr-6">
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold text-sm text-[#0c1d2c] truncate">{courier.name}</h3>
                  </div>
                  <p className="font-mono text-xs text-[#74777e]">{courier.trackingCode}</p>
                  <p className="text-[11px] text-[#43474d] truncate mt-0.5">{courier.vehicle}</p>
                </div>
              </div>

              {/* Status & Telemetry details */}
              <div className="bg-[#f8f9ff] rounded-lg p-2.5 space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[#74777e]">Duty Status:</span>
                  <span
                    className={`font-semibold inline-flex items-center gap-1 text-[11px] ${
                      courier.status === 'In Transit'
                        ? 'text-blue-700'
                        : courier.status === 'Available Idle'
                        ? 'text-emerald-700'
                        : 'text-purple-700'
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    {courier.status}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-[#74777e]">Corridor / Zone:</span>
                  <span className="font-medium text-[#0c1d2c] truncate max-w-[170px]">{courier.location}</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-[#74777e]">Speed &amp; Battery:</span>
                  <span className="font-mono text-[#43474d]">{courier.speed.split('•')[0]} | {courier.battery}</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-[#74777e]">Parcels in Rack:</span>
                  <span className="font-bold text-[#0c1d2c]">{courier.parcelsLeft} assigned</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between gap-2 pt-1 border-t border-outline-variant/15 text-xs">
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => onNavigate('driver-dashboard')}
                    className="px-2.5 py-1 bg-[#142b45] hover:bg-[#00162e] text-white rounded text-[11px] font-semibold transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[14px]">smartphone</span>
                    Shift App
                  </button>
                  <button
                    type="button"
                    onClick={() => onNavigate('driver-navigation')}
                    className="px-2.5 py-1 bg-surface-container hover:bg-surface-container-high text-[#0c1d2c] rounded text-[11px] font-semibold transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[14px]">turn_right</span>
                    GPS
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => onDeleteCourier(courier.id)}
                  className="p-1 text-rose-600 hover:bg-rose-50 rounded transition-colors cursor-pointer"
                  title="Delete Courier Account"
                >
                  <span className="material-symbols-outlined text-[17px]">delete</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Courier Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#0c1d2c]/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl border border-outline-variant/30 animate-in fade-in zoom-in">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-outline-variant/20">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[22px] text-secondary">person_add</span>
                <h3 className="font-['Manrope'] font-bold text-base text-[#0c1d2c]">
                  Register Real Courier Driver
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="text-[#74777e] hover:text-[#0c1d2c] text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateCourier} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-[#43474d] uppercase tracking-wider mb-1">
                  Full Legal Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Babatunde Alabi"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full bg-[#f8f9ff] text-xs px-3 py-2 rounded-lg border border-outline-variant/40 focus:outline-none focus:ring-1 focus:ring-secondary"
                />
              </div>

              <div>
                <label className="block font-bold text-[#43474d] uppercase tracking-wider mb-1">
                  Mobile Contact Phone
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. +234 803 771 9920"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  className="w-full bg-[#f8f9ff] text-xs px-3 py-2 rounded-lg border border-outline-variant/40 focus:outline-none focus:ring-1 focus:ring-secondary"
                />
              </div>

              <div>
                <label className="block font-bold text-[#43474d] uppercase tracking-wider mb-1">
                  Assigned Logistics Vehicle &amp; Plate
                </label>
                <select
                  value={newVehicle}
                  onChange={(e) => setNewVehicle(e.target.value)}
                  className="w-full bg-[#f8f9ff] text-xs px-3 py-2 rounded-lg border border-outline-variant/40 focus:outline-none focus:ring-1 focus:ring-secondary"
                >
                  <option value="Toyota HiAce Van (LND-550-AZ)">Toyota HiAce Van (LND-550-AZ)</option>
                  <option value="Yamaha Dispatch Motorcycle (KJA-992-BX)">Yamaha Dispatch Motorcycle (KJA-992-BX)</option>
                  <option value="Isuzu Heavy Cargo Truck (APP-884-CX)">Isuzu Heavy Cargo Truck (APP-884-CX)</option>
                  <option value="Suzuki Express Pickup (VIC-441-DX)">Suzuki Express Pickup (VIC-441-DX)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-[#43474d] uppercase tracking-wider mb-1">
                  Primary Corridor Station
                </label>
                <select
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  className="w-full bg-[#f8f9ff] text-xs px-3 py-2 rounded-lg border border-outline-variant/40 focus:outline-none focus:ring-1 focus:ring-secondary"
                >
                  <option value="Ikeja Industrial Zone">Ikeja Industrial Zone</option>
                  <option value="Victoria Island & Ikoyi">Victoria Island &amp; Ikoyi</option>
                  <option value="Lekki Phase 1 - Epe Corridor">Lekki Phase 1 - Epe Corridor</option>
                  <option value="Yaba - Lagos Mainland Central">Yaba - Lagos Mainland Central</option>
                  <option value="Apapa Port Logistics Terminal">Apapa Port Logistics Terminal</option>
                </select>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-[#0c1d2c] rounded-lg font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#994700] hover:bg-[#d97732] text-white rounded-lg font-bold shadow-sm"
                >
                  Register Driver
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
