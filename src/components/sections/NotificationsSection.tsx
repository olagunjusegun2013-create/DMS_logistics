import React, { useState } from 'react';
import { NotificationItem, ScreenId } from '../../types/logistics';

interface NotificationsSectionProps {
  notifications: NotificationItem[];
  onNavigate: (screenId: ScreenId) => void;
  onMarkAllAsRead: () => void;
  onClearAll: () => void;
  onDismissNotification: (id: string) => void;
}

export const NotificationsSection: React.FC<NotificationsSectionProps> = ({
  notifications,
  onNavigate,
  onMarkAllAsRead,
  onClearAll,
  onDismissNotification,
}) => {
  const [filter, setFilter] = useState<'all' | 'urgent' | 'warning' | 'info' | 'success'>('all');

  const filteredNotifs = notifications.filter((n) => {
    if (filter === 'all') return true;
    return n.type === filter;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="flex-1 p-3.5 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[26px] text-secondary">notifications</span>
            <h1 className="font-['Manrope'] text-2xl font-extrabold text-[#0c1d2c]">
              Telemetry Alerts &amp; Dispatch Notifications
            </h1>
          </div>
          <p className="text-xs text-[#74777e] mt-1">
            Real-time geofence breaches, cold-chain temperature deviations, and courier priority events
          </p>
        </div>

        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button
              type="button"
              onClick={onMarkAllAsRead}
              className="px-3.5 py-2 bg-surface-container hover:bg-surface-container-high text-[#0c1d2c] rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">done_all</span>
              Mark All Read ({unreadCount})
            </button>
          )}

          {notifications.length > 0 && (
            <button
              type="button"
              onClick={onClearAll}
              className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-[#43474d] rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">clear_all</span>
              Clear All
            </button>
          )}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 bg-white p-2 rounded-xl border border-outline-variant/30 shadow-xs overflow-x-auto">
        {(['all', 'urgent', 'warning', 'info', 'success'] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setFilter(tab)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all cursor-pointer ${
              filter === tab
                ? 'bg-[#142b45] text-white shadow-xs'
                : 'text-[#74777e] hover:bg-[#f8f9ff] hover:text-[#0c1d2c]'
            }`}
          >
            {tab} Alerts
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifs.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-xl border border-outline-variant/30">
            <span className="material-symbols-outlined text-[48px] text-slate-300 block mb-2">
              notifications_off
            </span>
            <p className="font-bold text-base text-[#0c1d2c]">No notifications in this feed</p>
            <p className="text-xs text-[#74777e] mt-1">
              All fleet telemetry alerts are clear and operating within normal SLA thresholds.
            </p>
          </div>
        ) : (
          filteredNotifs.map((notif) => (
            <div
              key={notif.id}
              className={`bg-white rounded-xl border p-4 shadow-xs flex items-start justify-between gap-4 transition-all hover:shadow-md ${
                !notif.read ? 'border-secondary/40 bg-[#fffbf8]' : 'border-outline-variant/25'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                    notif.type === 'urgent'
                      ? 'bg-rose-100 text-rose-700'
                      : notif.type === 'warning'
                      ? 'bg-amber-100 text-amber-700'
                      : notif.type === 'success'
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-blue-100 text-blue-700'
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {notif.type === 'urgent'
                      ? 'error'
                      : notif.type === 'warning'
                      ? 'warning'
                      : notif.type === 'success'
                      ? 'verified'
                      : 'info'}
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-mono font-bold tracking-wider px-2 py-0.5 rounded bg-slate-100 text-[#43474d]">
                      {notif.category}
                    </span>
                    {!notif.read && (
                      <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                    )}
                    <span className="font-bold text-xs text-[#0c1d2c]">{notif.title}</span>
                  </div>
                  <p className="text-xs text-[#43474d] leading-relaxed max-w-2xl">{notif.message}</p>
                  <span className="text-[10px] text-[#74777e] font-mono block pt-0.5">
                    {notif.timestamp}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => onNavigate('live-tracking')}
                  className="px-2.5 py-1 text-xs text-[#142b45] hover:bg-[#eef4ff] rounded font-semibold transition-colors cursor-pointer"
                >
                  Inspect Radar
                </button>
                <button
                  type="button"
                  onClick={() => onDismissNotification(notif.id)}
                  className="p-1 text-[#74777e] hover:text-rose-600 rounded transition-colors cursor-pointer"
                  title="Dismiss Alert"
                >
                  <span className="material-symbols-outlined text-[16px]">close</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
