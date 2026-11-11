import React, { useState } from 'react';
import { CustomerAccount, ScreenId } from '../../types/logistics';

interface CustomersSectionProps {
  customers: CustomerAccount[];
  onNavigate: (screenId: ScreenId) => void;
  onDeleteCustomer: (id: string) => void;
  onDeleteAllDemoCustomers: () => void;
  onAddCustomer: (customer: CustomerAccount) => void;
}

export const CustomersSection: React.FC<CustomersSectionProps> = ({
  customers,
  onNavigate,
  onDeleteCustomer,
  onDeleteAllDemoCustomers,
  onAddCustomer,
}) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [tier, setTier] = useState<'Enterprise Platinum' | 'Corporate Gold' | 'Standard Business'>('Enterprise Platinum');
  const [searchQuery, setSearchQuery] = useState('');

  const demoCount = customers.filter((c) => c.isDemo).length;

  const handleCreateCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newCustomer: CustomerAccount = {
      id: `cust-${Date.now()}`,
      name: name.trim(),
      contactPerson: contact.trim() || 'Logistics Coordinator',
      email: email.trim() || 'operations@client.com',
      phone: phone.trim() || '+234 800 000 0000',
      activeOrders: 0,
      totalSpend: '₦0',
      rating: 5.0,
      tier,
      isDemo: false,
    };

    onAddCustomer(newCustomer);
    setName('');
    setContact('');
    setEmail('');
    setPhone('');
    setIsAddModalOpen(false);
  };

  const filteredCustomers = customers.filter((c) => {
    const q = searchQuery.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      c.contactPerson.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q)
    );
  });

  return (
    <div className="flex-1 p-3.5 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[26px] text-secondary">groups</span>
            <h1 className="font-['Manrope'] text-2xl font-extrabold text-[#0c1d2c]">
              Enterprise Corporate Consignors &amp; Clients
            </h1>
          </div>
          <p className="text-xs text-[#74777e] mt-1">
            Registered business accounts, credit ledgers, contract SLA tiers, and contact coordinators
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          {demoCount > 0 && (
            <button
              type="button"
              onClick={onDeleteAllDemoCustomers}
              className="px-3.5 py-2 bg-error-container text-error hover:bg-error hover:text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-error/20"
              title="Delete all pre-seeded demo clients from database"
            >
              <span className="material-symbols-outlined text-[16px]">domain_disabled</span>
              Delete Demo Accounts ({demoCount})
            </button>
          )}

          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 bg-[#994700] hover:bg-[#d97732] text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">add_business</span>
            + Onboard Real Enterprise Client
          </button>
        </div>
      </div>

      {/* Search Input */}
      <div className="bg-white p-3.5 rounded-xl border border-outline-variant/30 shadow-sm">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search enterprise accounts by corporate name, coordinator, or email..."
            className="w-full bg-[#f8f9ff] text-xs px-3 py-2 pl-9 rounded-lg border border-outline-variant/40 focus:outline-none focus:ring-1 focus:ring-secondary"
          />
          <span className="material-symbols-outlined text-[18px] text-[#74777e] absolute left-2.5 top-2.5">
            search
          </span>
        </div>
      </div>

      {/* Customer Directory Table */}
      <div className="bg-white rounded-xl border border-outline-variant/30 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-xs">
            <thead className="bg-[#eef4ff] text-[#43474d] font-semibold uppercase tracking-wider border-b border-outline-variant/20">
              <tr>
                <th className="p-3.5">Client Organization</th>
                <th className="p-3.5">Key Contact / Role</th>
                <th className="p-3.5">Contact Details</th>
                <th className="p-3.5">Contract Tier</th>
                <th className="p-3.5 text-center">Active Waybills</th>
                <th className="p-3.5">Total Revenue</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/15">
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-12 text-center text-slate-500">
                    <span className="material-symbols-outlined text-[40px] text-slate-300 block mb-2">
                      domain
                    </span>
                    <p className="font-semibold text-sm text-[#0c1d2c]">No enterprise accounts registered</p>
                    <p className="text-xs text-[#74777e] mt-1">
                      Click &ldquo;+ Onboard Real Enterprise Client&rdquo; to add your organization&apos;s corporate accounts.
                    </p>
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-[#f8f9ff] transition-colors group">
                    <td className="p-3.5">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-[#142b45] text-white flex items-center justify-center font-bold text-xs shrink-0">
                          {customer.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <span className="font-bold text-[#0c1d2c] block">{customer.name}</span>
                          {customer.isDemo && (
                            <span className="text-[9px] bg-amber-100 text-amber-800 font-mono px-1 py-0.5 rounded font-bold">
                              DEMO ACCOUNT
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="p-3.5">
                      <span className="font-semibold text-[#0c1d2c] block">{customer.contactPerson}</span>
                      <span className="text-[11px] text-[#74777e]">Authorized Consignor</span>
                    </td>
                    <td className="p-3.5">
                      <span className="text-[#0c1d2c] block">{customer.email}</span>
                      <span className="font-mono text-[11px] text-[#74777e]">{customer.phone}</span>
                    </td>
                    <td className="p-3.5">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          customer.tier === 'Enterprise Platinum'
                            ? 'bg-purple-100 text-purple-800'
                            : customer.tier === 'Corporate Gold'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {customer.tier}
                      </span>
                    </td>
                    <td className="p-3.5 text-center">
                      <span className="font-mono font-bold text-sm text-[#0c1d2c]">
                        {customer.activeOrders}
                      </span>
                    </td>
                    <td className="p-3.5">
                      <span className="font-mono font-bold text-[#0c1d2c]">{customer.totalSpend}</span>
                    </td>
                    <td className="p-3.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => onNavigate('request-delivery')}
                          className="px-2.5 py-1 bg-[#142b45] text-white hover:bg-[#00162e] rounded text-[11px] font-semibold transition-colors cursor-pointer"
                        >
                          + Waybill
                        </button>
                        <button
                          type="button"
                          onClick={() => onDeleteCustomer(customer.id)}
                          className="p-1 text-rose-600 hover:bg-rose-50 rounded transition-colors cursor-pointer"
                          title="Delete Customer Account"
                        >
                          <span className="material-symbols-outlined text-[17px]">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Client Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#0c1d2c]/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl border border-outline-variant/30 animate-in fade-in zoom-in">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-outline-variant/20">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[22px] text-secondary">add_business</span>
                <h3 className="font-['Manrope'] font-bold text-base text-[#0c1d2c]">
                  Onboard Enterprise Client
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

            <form onSubmit={handleCreateCustomer} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-[#43474d] uppercase tracking-wider mb-1">
                  Company / Corporate Entity Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Zenith Bank Plc"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#f8f9ff] text-xs px-3 py-2 rounded-lg border border-outline-variant/40 focus:outline-none focus:ring-1 focus:ring-secondary"
                />
              </div>

              <div>
                <label className="block font-bold text-[#43474d] uppercase tracking-wider mb-1">
                  Primary Contact Person / Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Adeola Williams (Head of Logistics)"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className="w-full bg-[#f8f9ff] text-xs px-3 py-2 rounded-lg border border-outline-variant/40 focus:outline-none focus:ring-1 focus:ring-secondary"
                />
              </div>

              <div>
                <label className="block font-bold text-[#43474d] uppercase tracking-wider mb-1">
                  Corporate Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. logistics@zenithbank.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#f8f9ff] text-xs px-3 py-2 rounded-lg border border-outline-variant/40 focus:outline-none focus:ring-1 focus:ring-secondary"
                />
              </div>

              <div>
                <label className="block font-bold text-[#43474d] uppercase tracking-wider mb-1">
                  Corporate Phone Number
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. +234 802 334 5566"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#f8f9ff] text-xs px-3 py-2 rounded-lg border border-outline-variant/40 focus:outline-none focus:ring-1 focus:ring-secondary"
                />
              </div>

              <div>
                <label className="block font-bold text-[#43474d] uppercase tracking-wider mb-1">
                  SLA Service Tier
                </label>
                <select
                  value={tier}
                  onChange={(e) => setTier(e.target.value as any)}
                  className="w-full bg-[#f8f9ff] text-xs px-3 py-2 rounded-lg border border-outline-variant/40 focus:outline-none focus:ring-1 focus:ring-secondary"
                >
                  <option value="Enterprise Platinum">Enterprise Platinum (Priority Corridor)</option>
                  <option value="Corporate Gold">Corporate Gold (Standard SLA)</option>
                  <option value="Standard Business">Standard Business</option>
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
                  Onboard Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
