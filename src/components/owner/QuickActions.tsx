import React from 'react';
import {
  Building2,
  PlusCircle,
  Clock,
  CalendarCheck,
  ShieldAlert,
} from 'lucide-react';

export interface QuickActionsProps {
  onAddCourt: () => void;
  onBlockSlot: () => void;
  onManageSlots: () => void;
  onViewBookings: () => void;
  onEditFacility: () => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({
  onAddCourt,
  onBlockSlot,
  onManageSlots,
  onViewBookings,
  onEditFacility,
}) => {
  const actions = [
    {
      label: 'Add Court',
      desc: 'Create and price playing courts',
      icon: PlusCircle,
      onClick: onAddCourt,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50 hover:bg-emerald-100/70 border-emerald-200/80',
    },
    {
      label: 'Block Slot',
      desc: 'Reserve hours for maintenance',
      icon: ShieldAlert,
      onClick: onBlockSlot,
      color: 'text-amber-600',
      bg: 'bg-amber-50 hover:bg-amber-100/70 border-amber-200/80',
    },
    {
      label: 'Time Slots',
      desc: 'Control daily schedule & pricing',
      icon: Clock,
      onClick: onManageSlots,
      color: 'text-blue-600',
      bg: 'bg-blue-50 hover:bg-blue-100/70 border-blue-200/80',
    },
    {
      label: 'View Bookings',
      desc: 'Track player reservations & passes',
      icon: CalendarCheck,
      onClick: onViewBookings,
      color: 'text-indigo-600',
      bg: 'bg-indigo-50 hover:bg-indigo-100/70 border-indigo-200/80',
    },
    {
      label: 'Facility Info',
      desc: 'Update photos, sports & amenities',
      icon: Building2,
      onClick: onEditFacility,
      color: 'text-teal-600',
      bg: 'bg-teal-50 hover:bg-teal-100/70 border-teal-200/80',
    },
  ];

  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
      <div className="mb-4">
        <h3 className="text-base font-bold font-display text-slate-900">
          Quick Operations
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Frequently used venue management tools and administrative actions
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {actions.map((act) => {
          const Icon = act.icon;
          return (
            <button
              key={act.label}
              onClick={act.onClick}
              className={`p-3.5 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between group active:scale-[0.98] ${act.bg}`}
            >
              <div className="w-8 h-8 rounded-lg bg-white shadow-2xs flex items-center justify-center mb-2.5">
                <Icon className={`w-4 h-4 ${act.color}`} />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 block group-hover:text-emerald-700 transition-colors">
                  {act.label}
                </span>
                <span className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                  {act.desc}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
