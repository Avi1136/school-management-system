import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const menuGroups = [
  {
    group: "OVERVIEW",
    items: [
      { name: 'Dashboard', path: '/dashboard', icon: '⚡', permission: 'view_dashboard' },
      { name: 'Updates', path: '/updates', icon: '📢', permission: 'view_updates' },
      { name: 'Calendar', path: '/calendar', icon: '📅', permission: 'view_calendar' },
    ]
  },
  {
    group: "ACADEMICS",
    items: [
      { name: 'Student Roster', path: '/students', icon: '🎓', permission: 'view_students' },
      { name: 'Faculty Staff', path: '/faculty', icon: '👥', permission: 'view_staff' },
      { name: 'Attendance', path: '/attendance', icon: '📋', permission: 'view_attendance' },
      { name: 'Time Table', path: '/timetable', icon: '⏱️', permission: 'view_timetable' },
    ]
  },
  {
    group: "FINANCIALS & ADMIN",
    items: [
      { name: 'Fee Collection', path: '/fees', icon: '💳', permission: 'manage_fees' },
      { name: 'Admissions', path: '/admissions', icon: '📥', permission: 'manage_admissions' },
      { name: 'Examinations', path: '/examinations', icon: '📊', permission: 'manage_exams' },
      { name: 'Settings', path: '/settings', icon: '⚙️', permission: 'view_profile' },
    ]
  }
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { hasPermission } = useAuth();

  return (
    <aside style={{
      width: '240px',
      backgroundColor: '#faf9f6',
      borderRight: '1px solid #e8e5de',
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      padding: '24px 16px',
      userSelect: 'none',
      flexShrink: 0
    }}>
      {/* App Branding */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '0 8px 24px 8px' }}>
        <div style={{
          width: '32px',
          height: '32px',
          borderRadius: '8px',
          background: '#201c18',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: '800',
          fontSize: '14px'
        }}>
          eP
        </div>
        <span style={{ fontWeight: '800', fontSize: '18px', color: '#201c18', letterSpacing: '-0.5px' }}>
          ePFuture
        </span>
      </div>

      {/* Navigation Links */}
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {menuGroups.map((group, gIdx) => {
          const validItems = group.items.filter(item => hasPermission(item.permission));
          if (validItems.length === 0) return null;

          return (
            <div key={gIdx}>
              <div style={{ fontSize: '10px', fontWeight: '800', color: '#a0988e', letterSpacing: '1px', marginBottom: '8px', padding: '0 8px' }}>
                {group.group}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                {validItems.map((item, idx) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <div
                      key={idx}
                      onClick={() => navigate(item.path)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '9px 12px',
                        borderRadius: '8px',
                        fontSize: '13px',
                        fontWeight: isActive ? '700' : '500',
                        color: isActive ? '#201c18' : '#6b635b',
                        background: isActive ? '#eae6df' : 'transparent',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <span style={{ fontSize: '14px' }}>{item.icon}</span>
                      <span>{item.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;