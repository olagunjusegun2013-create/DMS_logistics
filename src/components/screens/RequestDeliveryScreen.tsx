import React, { useState } from 'react';
import { MAP_ROUTE_CORRIDOR, INITIAL_ORDERS } from '../../data/logisticsData';
import { ScreenId, ShipmentOrder } from '../../types/logistics';
import { CustomerOrdersHistoryModal } from '../sections/CustomerOrdersHistoryModal';
import { CustomerSupportModal } from '../sections/CustomerSupportModal';

interface RequestDeliveryScreenProps {
  onNavigate: (screenId: ScreenId) => void;
  onOrderCreated?: (order: ShipmentOrder) => void;
  orders?: ShipmentOrder[];
}

export const RequestDeliveryScreen: React.FC<RequestDeliveryScreenProps> = ({
  onNavigate,
  onOrderCreated,
  orders,
}) => {
  const [category, setCategory] = useState<'documents' | 'electronics' | 'cold-chain' | 'general'>(
    'cold-chain'
  );
  const [priorityTier, setPriorityTier] = useState<'express' | 'nextday' | 'economy'>('express');
  const [weight, setWeight] = useState<number>(2.4);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isOrdersModalOpen, setIsOrdersModalOpen] = useState(false);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);

  // Pricing calculation
  const baseDistance = 4500;
  const weightCharge = Math.round(weight * 500);
  const insurance = 800;
  const priorityCost = priorityTier === 'express' ? 2000 : priorityTier === 'nextday' ? 800 : 0;
  const subtotal = baseDistance + weightCharge + insurance + priorityCost;
  const vat = Math.round(subtotal * 0.075);
  const total = subtotal + vat;

  const handleDispatch = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      if (onOrderCreated) {
        const randomNum = Math.floor(10000 + Math.random() * 90000);
        onOrderCreated({
          trackingNo: `#DMS-TRK-${randomNum}`,
          type: category === 'cold-chain' ? 'Refrigerated Cold-Chain (2.4kg)' : category === 'electronics' ? 'Electronics & Tech Hardware (1.8kg)' : 'Standard Express Parcel',
          weight: `${weight}kg`,
          customer: 'Ikoyi BioLabs / Olawale Martins',
          phone: '+234 812 555 4902',
          origin: 'Ikeja Whse 4C',
          originDetail: 'Dock Bay 3',
          destination: 'Ikoyi Residential',
          destinationDetail: 'Kingsway Rd 3rd Floor',
          courierInitials: 'TB',
          courierName: 'Tunde Bakare',
          courierVehicle: 'Van #APP-882',
          timestamp: 'Just now',
          eta: priorityTier === 'express' ? 'ETA: ~35 mins' : 'ETA: Next Morning',
          status: 'In Transit',
          statusVariant: 'transit',
        });
      } else {
        setTimeout(() => {
          onNavigate('track-shipment');
        }, 1500);
      }
    }, 1200);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f8f9ff] text-[#0c1d2c] font-sans antialiased">
      {/* Main Page Area */}
      <main className="w-full flex-1 flex flex-col justify-between">
        <div>
          {/* Progress Stepper Header */}
          <section className="w-full bg-white shadow-sm border-b border-[#e2e8f0] py-3.5 sm:py-4 px-3.5 sm:px-6 mb-4 sm:mb-6">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-3 sm:gap-4">
              <div className="flex flex-col">
                <div className="flex items-center gap-1 text-[#43474d] text-[10px] sm:text-[11px] uppercase tracking-wider mb-1 font-semibold">
                  <span>Enterprise Portal</span>
                  <span>/</span>
                  <span>Logistics Booking</span>
                  <span>/</span>
                  <span className="text-[#994700]">Waybill Generator</span>
                </div>
                <h1 className="font-['Manrope'] text-lg sm:text-xl font-bold text-[#0c1d2c] tracking-tight">
                  Request a New Delivery
                </h1>
                <p className="text-xs text-[#43474d]">
                  Configure point-to-point consignment, special handling protocols, and schedule
                  autonomous fleet dispatch.
                </p>
              </div>

              {/* Stepper Nodes */}
              <div className="flex items-center gap-2 overflow-x-auto py-1 -mx-1 px-1">
                {/* Step 1 */}
                <div className="flex items-center gap-2 shrink-0">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#142b45] text-white flex items-center justify-center font-mono text-xs font-semibold shadow-sm ring-2 ring-[#994700]">
                    01
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-[#00162e] font-bold">Parties</span>
                    <span className="text-[10px] text-[#43474d] hidden sm:inline">Pickup &amp; Recipient</span>
                  </div>
                </div>
                <div className="w-6 sm:w-8 h-0.5 bg-[#994700] shrink-0"></div>

                {/* Step 2 */}
                <div className="flex items-center gap-2 shrink-0 opacity-70">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#e4efff] text-[#43474d] flex items-center justify-center font-mono text-xs font-semibold">
                    02
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-[#0c1d2c] font-semibold">Parcel</span>
                    <span className="text-[10px] text-[#43474d] hidden sm:inline">Specs &amp; Handling</span>
                  </div>
                </div>
                <div className="w-6 sm:w-8 h-0.5 bg-[#c4c6ce] shrink-0"></div>

                {/* Step 3 */}
                <div className="flex items-center gap-2 shrink-0 opacity-70">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#e4efff] text-[#43474d] flex items-center justify-center font-mono text-xs font-semibold">
                    03
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-[#0c1d2c] font-semibold">Service</span>
                    <span className="text-[10px] text-[#43474d] hidden sm:inline">SLA &amp; Windows</span>
                  </div>
                </div>
                <div className="w-6 sm:w-8 h-0.5 bg-[#c4c6ce] shrink-0"></div>

                {/* Step 4 */}
                <div className="flex items-center gap-2 shrink-0 opacity-70">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#e4efff] text-[#43474d] flex items-center justify-center font-mono text-xs font-semibold">
                    04
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-[#0c1d2c] font-semibold">Review</span>
                    <span className="text-[10px] text-[#43474d] hidden sm:inline">Settlement</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Main Booking Canvas */}
          <div className="max-w-7xl mx-auto px-3.5 sm:px-6 w-full pb-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
              {/* Form Column (8 Cols) */}
              <div className="lg:col-span-8 flex flex-col gap-6">
                {/* SECTION 1: PICKUP INFORMATION */}
                <div className="bg-white rounded-xl shadow-sm border border-[#e2e8f0] p-5">
                  <div className="flex items-center justify-between pb-3 mb-4 bg-[#eef4ff] px-4 py-2 rounded-lg">
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-lg bg-[#142b45] text-white flex items-center justify-center text-xs font-bold">
                        1
                      </span>
                      <div>
                        <h2 className="font-['Manrope'] text-sm font-bold text-[#0c1d2c]">
                          Pickup Information
                        </h2>
                        <p className="text-xs text-[#43474d]">
                          Origin hub and manifest dispatch node
                        </p>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-[#994700] text-[22px]">
                      warehouse
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2 flex flex-col gap-1">
                      <label className="text-[10px] text-[#43474d] uppercase font-bold tracking-wider">
                        Origin Preset Profile
                      </label>
                      <select className="w-full h-9 px-3 rounded-lg bg-[#eef4ff] border border-[#c4c6ce] text-xs text-[#0c1d2c] outline-none cursor-pointer">
                        <option>Ikeja Warehouse 4C (Plot 12 Commercial Ave, Industrial Zone)</option>
                        <option>Dangote HQ - Victoria Island (Marble Towers, 7th Fl)</option>
                        <option>Lekki Logistics Hub - Phase 1 Depot</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] text-[#43474d] uppercase font-bold tracking-wider">
                        Sender Contact Person
                      </label>
                      <input
                        className="w-full h-9 px-3 rounded-lg bg-[#eef4ff] border border-[#c4c6ce] text-xs text-[#0c1d2c] outline-none"
                        defaultValue="B. Adeleke (Outbound Ops)"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] text-[#43474d] uppercase font-bold tracking-wider">
                        Dispatch Phone Line
                      </label>
                      <div className="flex items-center">
                        <span className="h-9 px-2.5 bg-[#e4efff] border border-r-0 border-[#c4c6ce] text-[#43474d] font-mono text-xs flex items-center rounded-l-lg">
                          +234
                        </span>
                        <input
                          className="w-full h-9 px-3 rounded-r-lg bg-[#eef4ff] border border-[#c4c6ce] text-xs font-mono text-[#0c1d2c] outline-none"
                          defaultValue="803 491 8820"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] text-[#43474d] uppercase font-bold tracking-wider">
                        Requested Pickup Date
                      </label>
                      <input
                        type="date"
                        className="w-full h-9 px-3 rounded-lg bg-[#eef4ff] border border-[#c4c6ce] text-xs font-mono text-[#0c1d2c] outline-none"
                        defaultValue="2025-05-18"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] text-[#43474d] uppercase font-bold tracking-wider">
                        Dock Pickup Window
                      </label>
                      <select className="w-full h-9 px-3 rounded-lg bg-[#eef4ff] border border-[#c4c6ce] text-xs text-[#0c1d2c] outline-none">
                        <option>Immediate / Next Available Rider (09:00 - 11:00)</option>
                        <option>Afternoon Shift (13:00 - 15:30)</option>
                        <option>Evening Consignment Cut-Off (17:00 - 19:00)</option>
                      </select>
                    </div>

                    <div className="md:col-span-2 flex flex-col gap-1">
                      <label className="text-[10px] text-[#43474d] uppercase font-bold tracking-wider">
                        Internal Pickup Guidance / Gate Access
                      </label>
                      <textarea
                        className="w-full p-2.5 rounded-lg bg-[#eef4ff] border border-[#c4c6ce] text-xs text-[#0c1d2c] outline-none resize-none"
                        rows={2}
                        defaultValue="Loading Bay 3 at the rear warehouse entrance. Driver must request Gate Pass from Chief Security Officer on arrival."
                      />
                    </div>
                  </div>
                </div>

                {/* SECTION 2: RECIPIENT DETAILS */}
                <div className="bg-white rounded-xl shadow-sm border border-[#e2e8f0] p-5">
                  <div className="flex items-center justify-between pb-3 mb-4 bg-[#eef4ff] px-4 py-2 rounded-lg">
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-lg bg-[#142b45] text-white flex items-center justify-center text-xs font-bold">
                        2
                      </span>
                      <div>
                        <h2 className="font-['Manrope'] text-sm font-bold text-[#0c1d2c]">
                          Recipient &amp; Destination Details
                        </h2>
                        <p className="text-xs text-[#43474d]">
                          Target consignee, drop-off geolocation &amp; validation
                        </p>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-[#994700] text-[22px]">
                      location_on
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] text-[#43474d] uppercase font-bold tracking-wider">
                        Recipient Full Name
                      </label>
                      <input
                        className="w-full h-9 px-3 rounded-lg bg-[#eef4ff] border border-[#c4c6ce] text-xs text-[#0c1d2c] outline-none"
                        defaultValue="Dr. Olawale Martins"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] text-[#43474d] uppercase font-bold tracking-wider">
                        Company / Department
                      </label>
                      <input
                        className="w-full h-9 px-3 rounded-lg bg-[#eef4ff] border border-[#c4c6ce] text-xs text-[#0c1d2c] outline-none"
                        defaultValue="Ikoyi BioLabs &amp; Clinical Diagnostics"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] text-[#43474d] uppercase font-bold tracking-wider">
                        Recipient Direct Phone
                      </label>
                      <div className="flex items-center">
                        <span className="h-9 px-2.5 bg-[#e4efff] border border-r-0 border-[#c4c6ce] text-[#43474d] font-mono text-xs flex items-center rounded-l-lg">
                          +234
                        </span>
                        <input
                          className="w-full h-9 px-3 rounded-r-lg bg-[#eef4ff] border border-[#c4c6ce] text-xs font-mono text-[#0c1d2c] outline-none"
                          defaultValue="812 555 4902"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] text-[#43474d] uppercase font-bold tracking-wider">
                        Recipient Email (Electronic POD)
                      </label>
                      <input
                        type="email"
                        className="w-full h-9 px-3 rounded-lg bg-[#eef4ff] border border-[#c4c6ce] text-xs text-[#0c1d2c] outline-none"
                        defaultValue="o.martins@biolabs.ng"
                      />
                    </div>

                    <div className="md:col-span-2 flex flex-col gap-1">
                      <label className="text-[10px] text-[#43474d] uppercase font-bold tracking-wider">
                        Exact Destination Address
                      </label>
                      <input
                        className="w-full h-9 px-3 rounded-lg bg-[#eef4ff] border border-[#c4c6ce] text-xs text-[#0c1d2c] outline-none"
                        defaultValue="Plot 84A, Kingsway Road (Alfred Rewane), Golden Plaza 3rd Floor, Ikoyi, Lagos"
                      />
                    </div>

                    <div className="md:col-span-2 flex flex-col gap-1">
                      <label className="text-[10px] text-[#43474d] uppercase font-bold tracking-wider">
                        Consignee Handover Instructions
                      </label>
                      <input
                        className="w-full h-9 px-3 rounded-lg bg-[#eef4ff] border border-[#c4c6ce] text-xs text-[#0c1d2c] outline-none"
                        defaultValue="Ring 3rd floor reception intercom. Do NOT leave with ground security; hand directly to recipient."
                      />
                    </div>
                  </div>
                </div>

                {/* SECTION 3: PACKAGE SPECIFICATIONS & SPECIAL HANDLING */}
                <div className="bg-white rounded-xl shadow-sm border border-[#e2e8f0] p-5">
                  <div className="flex items-center justify-between pb-3 mb-4 bg-[#eef4ff] px-4 py-2 rounded-lg">
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-lg bg-[#142b45] text-white flex items-center justify-center text-xs font-bold">
                        3
                      </span>
                      <div>
                        <h2 className="font-['Manrope'] text-sm font-bold text-[#0c1d2c]">
                          Consignment Specifications
                        </h2>
                        <p className="text-xs text-[#43474d]">
                          Classifications, physical metrics, and containment conditions
                        </p>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-[#994700] text-[22px]">
                      inventory_2
                    </span>
                  </div>

                  {/* Category Selection Pills */}
                  <div className="flex flex-col gap-1 mb-4">
                    <label className="text-[10px] text-[#43474d] uppercase font-bold tracking-wider">
                      Consignment Category
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                      {[
                        { id: 'documents', label: 'Documents', icon: 'description' },
                        { id: 'electronics', label: 'Electronics', icon: 'devices' },
                        { id: 'cold-chain', label: 'Cold-Chain', icon: 'vaccines' },
                        { id: 'general', label: 'General Cargo', icon: 'pallet' },
                      ].map((cat) => (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => setCategory(cat.id as any)}
                          className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold transition ${
                            category === cat.id
                              ? 'bg-[#142b45] text-white shadow-sm'
                              : 'bg-[#eef4ff] text-[#43474d] hover:bg-[#e4efff]'
                          }`}
                        >
                          <span className="material-symbols-outlined text-[16px]">{cat.icon}</span>
                          <span>{cat.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Metrics Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] text-[#43474d] uppercase font-bold tracking-wider">
                        Approx Weight (kg)
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          step="0.1"
                          value={weight}
                          onChange={(e) => setWeight(parseFloat(e.target.value) || 0)}
                          className="w-full h-9 px-3 rounded-lg bg-[#eef4ff] border border-[#c4c6ce] text-xs font-mono text-[#0c1d2c] outline-none"
                        />
                        <span className="absolute right-3 top-2 text-[11px] font-mono text-[#43474d]">
                          KG
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] text-[#43474d] uppercase font-bold tracking-wider">
                        Dimensions (L × W × H cm)
                      </label>
                      <input
                        className="w-full h-9 px-3 rounded-lg bg-[#eef4ff] border border-[#c4c6ce] text-xs font-mono text-[#0c1d2c] outline-none"
                        defaultValue="32 × 24 × 18"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] text-[#43474d] uppercase font-bold tracking-wider">
                        Declared Value (₦)
                      </label>
                      <div className="relative">
                        <input
                          className="w-full h-9 pl-7 pr-3 rounded-lg bg-[#eef4ff] border border-[#c4c6ce] text-xs font-mono text-[#0c1d2c] outline-none"
                          defaultValue="185,000"
                        />
                        <span className="absolute left-2.5 top-2 text-[11px] font-mono text-[#43474d]">
                          ₦
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Special Handling Checklist */}
                  <div className="pt-2">
                    <span className="text-[10px] text-[#43474d] uppercase font-bold tracking-wider block mb-2">
                      Mandatory Handling &amp; Custody Protocols
                    </span>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                      <label className="flex items-center gap-2.5 p-2.5 rounded-lg bg-[#eef4ff] hover:bg-[#e4efff] cursor-pointer transition">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="w-4 h-4 rounded text-[#994700] accent-[#994700]"
                        />
                        <div className="flex flex-col">
                          <span className="text-xs font-semibold text-[#0c1d2c]">Fragile Cargo</span>
                          <span className="text-[10px] text-[#43474d]">Shock &amp; tilt sensors</span>
                        </div>
                      </label>

                      <label className="flex items-center gap-2.5 p-2.5 rounded-lg bg-[#eef4ff] hover:bg-[#e4efff] cursor-pointer transition">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="w-4 h-4 rounded text-[#994700] accent-[#994700]"
                        />
                        <div className="flex flex-col">
                          <span className="text-xs font-semibold text-[#0c1d2c]">
                            Physical Signature
                          </span>
                          <span className="text-[10px] text-[#43474d]">Biometric/OTP POD</span>
                        </div>
                      </label>

                      <label className="flex items-center gap-2.5 p-2.5 rounded-lg bg-[#eef4ff] hover:bg-[#e4efff] cursor-pointer transition">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="w-4 h-4 rounded text-[#994700] accent-[#994700]"
                        />
                        <div className="flex flex-col">
                          <span className="text-xs font-semibold text-[#0c1d2c]">Cold Storage</span>
                          <span className="text-[10px] text-[#43474d]">2°C to 8°C Monitored</span>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>

                {/* SECTION 4: DELIVERY PRIORITY & SERVICE LEVEL */}
                <div className="bg-white rounded-xl shadow-sm border border-[#e2e8f0] p-5">
                  <div className="flex items-center justify-between pb-3 mb-4 bg-[#eef4ff] px-4 py-2 rounded-lg">
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-lg bg-[#142b45] text-white flex items-center justify-center text-xs font-bold">
                        4
                      </span>
                      <div>
                        <h2 className="font-['Manrope'] text-sm font-bold text-[#0c1d2c]">
                          Transit Priority &amp; SLA Commitment
                        </h2>
                        <p className="text-xs text-[#43474d]">
                          Guaranteed delivery window and courier tier
                        </p>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-[#994700] text-[22px]">bolt</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {/* Option 1: Express */}
                    <div
                      onClick={() => setPriorityTier('express')}
                      className={`relative flex flex-col p-4 rounded-xl cursor-pointer shadow-sm transition border ${
                        priorityTier === 'express'
                          ? 'border-2 border-[#994700] bg-white'
                          : 'border-[#e2e8f0] bg-[#eef4ff] hover:bg-[#e4efff]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-2 py-0.5 rounded bg-[#994700] text-white text-[10px] font-bold uppercase tracking-wider">
                          Fastest
                        </span>
                        <input
                          type="radio"
                          name="priority"
                          checked={priorityTier === 'express'}
                          onChange={() => setPriorityTier('express')}
                          className="w-4 h-4 accent-[#994700]"
                        />
                      </div>
                      <span className="font-['Manrope'] text-sm font-bold text-[#0c1d2c]">
                        Same-Day Express
                      </span>
                      <p className="text-xs text-[#43474d] mt-1 mb-3 leading-relaxed">
                        Direct express courier dispatched immediately. Delivered in 2–4 hours.
                      </p>
                      <div className="mt-auto pt-2 flex items-baseline justify-between border-t border-[#e2e8f0]">
                        <span className="text-[10px] text-[#43474d]">Fixed Priority</span>
                        <span className="font-mono text-xs font-bold text-[#994700]">+₦2,000</span>
                      </div>
                    </div>

                    {/* Option 2: Next-Day */}
                    <div
                      onClick={() => setPriorityTier('nextday')}
                      className={`relative flex flex-col p-4 rounded-xl cursor-pointer shadow-sm transition border ${
                        priorityTier === 'nextday'
                          ? 'border-2 border-[#994700] bg-white'
                          : 'border-[#e2e8f0] bg-[#eef4ff] hover:bg-[#e4efff]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-2 py-0.5 rounded bg-[#daeaff] text-[#00162e] text-[10px] font-semibold">
                          Standard
                        </span>
                        <input
                          type="radio"
                          name="priority"
                          checked={priorityTier === 'nextday'}
                          onChange={() => setPriorityTier('nextday')}
                          className="w-4 h-4 accent-[#994700]"
                        />
                      </div>
                      <span className="font-['Manrope'] text-sm font-bold text-[#0c1d2c]">
                        Next-Day Hub
                      </span>
                      <p className="text-xs text-[#43474d] mt-1 mb-3 leading-relaxed">
                        Batched regional transit. Delivered before 12:00 PM tomorrow.
                      </p>
                      <div className="mt-auto pt-2 flex items-baseline justify-between border-t border-[#e2e8f0]">
                        <span className="text-[10px] text-[#43474d]">Priority Surcharge</span>
                        <span className="font-mono text-xs font-bold text-[#0c1d2c]">+₦800</span>
                      </div>
                    </div>

                    {/* Option 3: Economy */}
                    <div
                      onClick={() => setPriorityTier('economy')}
                      className={`relative flex flex-col p-4 rounded-xl cursor-pointer shadow-sm transition border ${
                        priorityTier === 'economy'
                          ? 'border-2 border-[#994700] bg-white'
                          : 'border-[#e2e8f0] bg-[#eef4ff] hover:bg-[#e4efff]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-2 py-0.5 rounded bg-[#daeaff] text-[#43474d] text-[10px] font-semibold">
                          Bulk Rate
                        </span>
                        <input
                          type="radio"
                          name="priority"
                          checked={priorityTier === 'economy'}
                          onChange={() => setPriorityTier('economy')}
                          className="w-4 h-4 accent-[#994700]"
                        />
                      </div>
                      <span className="font-['Manrope'] text-sm font-bold text-[#0c1d2c]">
                        Economy Freight
                      </span>
                      <p className="text-xs text-[#43474d] mt-1 mb-3 leading-relaxed">
                        Consolidated road freight network. Delivered within 48 business hours.
                      </p>
                      <div className="mt-auto pt-2 flex items-baseline justify-between border-t border-[#e2e8f0]">
                        <span className="text-[10px] text-[#43474d]">Priority Surcharge</span>
                        <span className="font-mono text-xs font-bold text-[#0c1d2c]">₦0</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Route Corridor Map Banner */}
                <div className="bg-white rounded-xl shadow-sm border border-[#e2e8f0] p-5 flex flex-col gap-3">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 text-[#0c1d2c] font-semibold">
                      <span className="material-symbols-outlined text-[#00162e] text-[18px]">
                        alt_route
                      </span>
                      <span>Calculated Fleet Corridor: Ikeja Central to Ikoyi Island</span>
                    </div>
                    <span className="font-mono text-[#43474d]">
                      Approx. 18.4 km • Est. 42 min run time
                    </span>
                  </div>

                  <div
                    className="w-full h-44 rounded-lg bg-cover bg-center shadow-inner relative flex items-end p-3 border border-[#c4c6ce]"
                    style={{ backgroundImage: `url('${MAP_ROUTE_CORRIDOR}')` }}
                  >
                    <div className="bg-white/95 backdrop-blur px-3 py-1.5 rounded-lg shadow-sm flex items-center gap-4 text-xs">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#994700]"></div>
                        <span className="font-semibold text-[#0c1d2c]">Origin: Ikeja 4C</span>
                      </div>
                      <span className="text-[#74777e]">→</span>
                      <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#00162e]"></div>
                        <span className="font-semibold text-[#0c1d2c]">Destination: Ikoyi</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar Column (4 Cols) - Live Calculation & Confirmation */}
              <div className="lg:col-span-4 flex flex-col gap-6 sticky top-20">
                <div className="bg-white rounded-xl shadow-md border border-[#e2e8f0] p-5 flex flex-col">
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#e2e8f0]">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#994700] animate-pulse"></div>
                      <h3 className="font-['Manrope'] text-sm font-bold text-[#0c1d2c]">
                        Real-Time Tariff Quote
                      </h3>
                    </div>
                    <span className="font-mono text-xs px-2 py-0.5 rounded bg-[#e4efff] text-[#00162e] font-semibold">
                      LIVE TARIFF
                    </span>
                  </div>

                  {/* Manifest pill summary */}
                  <div className="p-3 rounded-lg bg-[#eef4ff] mb-4 flex flex-col gap-1 text-xs">
                    <div className="flex justify-between items-center text-[#43474d]">
                      <span className="text-[10px] uppercase font-bold">MANIFEST ID:</span>
                      <span className="font-mono font-bold text-[#00162e]">DMS-2025-NG-8891</span>
                    </div>
                    <div className="flex justify-between items-center text-[#43474d]">
                      <span className="text-[10px] uppercase font-bold">SERVICE LEVEL:</span>
                      <span className="font-semibold text-[#0c1d2c]">
                        {priorityTier === 'express'
                          ? 'Same-Day Express (2-4h)'
                          : priorityTier === 'nextday'
                          ? 'Next-Day Hub'
                          : 'Economy Freight'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-[#43474d]">
                      <span className="text-[10px] uppercase font-bold">ESTIMATED WEIGHT:</span>
                      <span className="font-mono font-bold text-[#0c1d2c]">
                        {weight.toFixed(2)} kg
                      </span>
                    </div>
                  </div>

                  {/* Dynamic Itemized Charges */}
                  <div className="flex flex-col gap-2 text-xs pb-3 border-b border-[#e2e8f0]">
                    <div className="flex items-center justify-between text-[#43474d]">
                      <span>Base Distance Fare (18.4 km)</span>
                      <span className="font-mono font-semibold text-[#0c1d2c]">₦4,500</span>
                    </div>
                    <div className="flex items-center justify-between text-[#43474d]">
                      <span>Weight Surcharge ({weight.toFixed(1)} kg)</span>
                      <span className="font-mono font-semibold text-[#0c1d2c]">
                        ₦{weightCharge.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[#43474d]">
                      <span>Priority Expedited Dispatch</span>
                      <span className="font-mono font-bold text-[#994700]">
                        ₦{priorityCost.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[#43474d]">
                      <span>Signature &amp; Transit Insurance</span>
                      <span className="font-mono font-semibold text-[#0c1d2c]">₦800</span>
                    </div>
                    <div className="flex items-center justify-between text-[#74777e] pt-1 text-[11px]">
                      <span>V.A.T. (7.5% Included)</span>
                      <span className="font-mono">₦{vat.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Total Due */}
                  <div className="my-4 bg-[#daeaff] p-3 rounded-xl flex items-baseline justify-between">
                    <div>
                      <span className="text-[10px] text-[#43474d] uppercase tracking-wider font-bold block">
                        Total Net Payable
                      </span>
                      <span className="text-[11px] text-[#43474d]">All taxes covered</span>
                    </div>
                    <span className="font-['Manrope'] text-2xl font-black text-[#00162e] tracking-tight">
                      ₦{total.toLocaleString()}
                    </span>
                  </div>

                  {/* Payment Ledger */}
                  <div className="flex flex-col gap-2 mb-4">
                    <label className="text-[10px] text-[#43474d] uppercase font-bold tracking-wider">
                      Settlement Ledger
                    </label>

                    <label className="flex items-center justify-between p-2.5 rounded-lg bg-[#eef4ff] cursor-pointer">
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="ledger"
                          defaultChecked
                          className="w-4 h-4 accent-[#994700]"
                        />
                        <div className="flex flex-col">
                          <span className="text-xs font-semibold text-[#0c1d2c]">
                            Corporate Credit Account
                          </span>
                          <span className="font-mono text-[10px] text-[#43474d]">
                            Bal: ₦450,000 (30-day term)
                          </span>
                        </div>
                      </div>
                      <span className="material-symbols-outlined text-[#00162e] text-[20px]">
                        account_balance_wallet
                      </span>
                    </label>

                    <label className="flex items-center justify-between p-2.5 rounded-lg bg-[#eef4ff] cursor-pointer">
                      <div className="flex items-center gap-2">
                        <input type="radio" name="ledger" className="w-4 h-4 accent-[#994700]" />
                        <div className="flex flex-col">
                          <span className="text-xs font-semibold text-[#0c1d2c]">
                            Instant Card / NIBSS Transfer
                          </span>
                          <span className="text-[10px] text-[#43474d]">
                            Automated webhook confirmation
                          </span>
                        </div>
                      </div>
                      <span className="material-symbols-outlined text-[#74777e] text-[20px]">
                        credit_card
                      </span>
                    </label>

                    <label className="flex items-center justify-between p-2.5 rounded-lg bg-[#eef4ff] cursor-pointer">
                      <div className="flex items-center gap-2">
                        <input type="radio" name="ledger" className="w-4 h-4 accent-[#994700]" />
                        <div className="flex flex-col">
                          <span className="text-xs font-semibold text-[#0c1d2c]">
                            Pay on Delivery (Consignee Escrow)
                          </span>
                          <span className="text-[10px] text-[#43474d]">Recipient settles on receipt</span>
                        </div>
                      </div>
                      <span className="material-symbols-outlined text-[#74777e] text-[20px]">
                        handshake
                      </span>
                    </label>
                  </div>

                  {/* Dispatch CTA Button */}
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={handleDispatch}
                      disabled={isSubmitting || isSuccess}
                      className={`w-full py-3 px-4 rounded-xl text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.98] ${
                        isSuccess
                          ? 'bg-emerald-600'
                          : 'bg-[#994700] hover:bg-[#6c3000]'
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="material-symbols-outlined animate-spin text-[18px]">
                            autorenew
                          </span>
                          <span>Booking Generated...</span>
                        </>
                      ) : isSuccess ? (
                        <>
                          <span className="material-symbols-outlined text-[18px]">
                            check_circle
                          </span>
                          <span>Dispatched #DMS-2025-NG-8891</span>
                        </>
                      ) : (
                        <>
                          <span className="material-symbols-outlined text-[18px]">
                            send_and_archive
                          </span>
                          <span>Confirm &amp; Dispatch Shipment</span>
                        </>
                      )}
                    </button>

                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <button className="py-2 px-3 rounded-lg bg-[#e4efff] hover:bg-[#daeaff] text-[#00162e] text-xs font-semibold flex items-center justify-center gap-1 transition">
                        <span className="material-symbols-outlined text-[16px]">
                          bookmark_border
                        </span>
                        <span>Save Draft</span>
                      </button>
                      <button className="py-2 px-3 rounded-lg bg-[#e4efff] hover:bg-[#daeaff] text-[#00162e] text-xs font-semibold flex items-center justify-center gap-1 transition">
                        <span className="material-symbols-outlined text-[16px]">print</span>
                        <span>Print Pro-Forma</span>
                      </button>
                    </div>
                  </div>

                  {/* SLA guarantee */}
                  <div className="mt-4 p-2.5 rounded-lg bg-[#e4efff] flex items-center gap-2 text-xs text-[#0c1d2c]">
                    <span className="material-symbols-outlined text-[#00162e] text-[18px] shrink-0">
                      verified_user
                    </span>
                    <span className="text-[11px] leading-tight">
                      Backed by DMS 99.8% On-Time SLA Guarantee. Real-time GPS telemetry link will
                      activate upon driver departure.
                    </span>
                  </div>
                </div>

                {/* Help Desk Mini */}
                <div className="bg-white rounded-xl shadow-sm border border-[#e2e8f0] p-4 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#142b45] text-white flex items-center justify-center">
                      <span className="material-symbols-outlined text-[18px]">support_agent</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-[#0c1d2c]">Need custom freight quote?</span>
                      <span className="text-[10px] text-[#43474d]">Lagos Dispatch Desk • Ext 402</span>
                    </div>
                  </div>
                  <button className="px-2.5 py-1 rounded bg-[#eef4ff] hover:bg-[#e4efff] text-[#00162e] text-xs font-semibold">
                    Connect
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="w-full bg-white border-t border-[#d3e4fa] py-4 px-6 text-xs text-[#43474d] flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>© 2025 DMS Enterprise Logistics Suite. Secure Customer Portal.</span>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-[#0c1d2c]">Service Level Agreements</a>
            <a href="#" className="hover:text-[#0c1d2c]">Compliance &amp; Security</a>
            <a href="#" className="hover:text-[#0c1d2c]">Dispatch Desk</a>
          </div>
        </footer>
      </main>

      {/* Customer Orders History Modal */}
      <CustomerOrdersHistoryModal
        isOpen={isOrdersModalOpen}
        onClose={() => setIsOrdersModalOpen(false)}
        orders={orders || INITIAL_ORDERS}
        onNavigate={onNavigate}
      />

      {/* Customer Support Modal */}
      <CustomerSupportModal
        isOpen={isSupportModalOpen}
        onClose={() => setIsSupportModalOpen(false)}
      />
    </div>
  );
};
