import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Modal from '../../components/common/Modal';

const Dashboard = () => {
  const { schoolData, user, hasPermission } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);

  const [studentsList, setStudentsList] = useState([
    { name: 'Emily Chen', roll: 'STU-2026-001', class: 'Grade 10-A', guardian: 'Marcus Chen', feeStatus: 'Paid', attendance: '96.5%' },
    { name: 'Lucas Reynolds', roll: 'STU-2026-002', class: 'Grade 10-B', guardian: 'Jessica Reynolds', feeStatus: 'Pending', attendance: '88.0%' },
    { name: 'Sophia Martinez', roll: 'STU-2026-003', class: 'Grade 11-Sci', guardian: 'Carlos Martinez', feeStatus: 'Paid', attendance: '98.2%' },
    { name: 'Daniel Kim', roll: 'STU-2026-004', class: 'Grade 10-A', guardian: 'Min-Jun Kim', feeStatus: 'Pending', attendance: '91.4%' },
  ]);

  return (
    <div style={{ padding: '32px', maxWidth: '1600px', margin: '0 auto', width: '100%' }}>
      
      {/* 1. Contextual Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' }}>
        <div>
          <div style={{ fontSize: '12px', fontWeight: '700', color: '#c85a32', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '4px' }}>
            {schoolData?.name} • {schoolData?.academicYear}
          </div>
          <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#201c18', letterSpacing: '-0.5px', margin: 0 }}>
            Hello, {user?.name ? user.name.split(' ')[0] : 'Principal'}
          </h1>
        </div>

        {hasPermission('manage_admissions') && (
          <button 
            onClick={() => setIsAddStudentOpen(true)}
            style={{ 
              background: '#201c18', 
              color: '#ffffff', 
              border: 'none', 
              padding: '11px 20px', 
              borderRadius: '10px', 
              fontSize: '13px', 
              fontWeight: '700', 
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <span>+</span> Register Student
          </button>
        )}
      </div>

      {/* 2. Asymmetrical Split Workspace */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '32px', alignItems: 'start' }}>
        
        {/* LEFT COLUMN: Core Work Area */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          
          {/* Key Metrics Inline Row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            <div style={{ background: '#ffffff', padding: '20px', borderRadius: '14px', border: '1px solid #e8e5de' }}>
              <span style={{ fontSize: '11px', fontWeight: '700', color: '#8c827a', textTransform: 'uppercase' }}>Enrolled Students</span>
              <div style={{ fontSize: '30px', fontWeight: '800', color: '#201c18', marginTop: '4px' }}>{1244 + studentsList.length}</div>
              <span style={{ fontSize: '12px', color: '#52796f', fontWeight: '600' }}>↑ +4.2% this term</span>
            </div>

            <div style={{ background: '#ffffff', padding: '20px', borderRadius: '14px', border: '1px solid #e8e5de' }}>
              <span style={{ fontSize: '11px', fontWeight: '700', color: '#8c827a', textTransform: 'uppercase' }}>Fee Collection</span>
              <div style={{ fontSize: '30px', fontWeight: '800', color: '#201c18', marginTop: '4px' }}>$142.8k</div>
              <span style={{ fontSize: '12px', color: '#52796f', fontWeight: '600' }}>92% of target</span>
            </div>

            <div style={{ background: '#ffffff', padding: '20px', borderRadius: '14px', border: '1px solid #e8e5de' }}>
              <span style={{ fontSize: '11px', fontWeight: '700', color: '#8c827a', textTransform: 'uppercase' }}>Attendance Today</span>
              <div style={{ fontSize: '30px', fontWeight: '800', color: '#201c18', marginTop: '4px' }}>95.6%</div>
              <span style={{ fontSize: '12px', color: '#c85a32', fontWeight: '600' }}>1,194 present</span>
            </div>
          </div>

          {/* Student Workspace Data Grid */}
          <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e8e5de', padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#201c18', margin: 0 }}>Student Roster</h3>
              <input 
                type="text" 
                placeholder="Search students..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  padding: '8px 14px',
                  borderRadius: '8px',
                  border: '1px solid #e8e5de',
                  fontSize: '12px',
                  outline: 'none',
                  background: '#faf9f6',
                  width: '220px'
                }}
              />
            </div>

            {/* Custom Row Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {studentsList
                .filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((stu, idx) => (
                  <div 
                    key={idx} 
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'space-between', // ✅ Fixed from justify-content
                      padding: '14px 16px', 
                      borderRadius: '10px', 
                      background: '#faf9f6',
                      border: '1px solid #f0ede6'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#eae6df', color: '#201c18', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '12px' }}>
                        {stu.name.split(' ').filter(Boolean).map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div style={{ fontWeight: '700', fontSize: '13px', color: '#201c18' }}>{stu.name}</div>
                        <div style={{ fontSize: '11px', color: '#8c827a' }}>{stu.roll} • {stu.class}</div>
                      </div>
                    </div>

                    <div style={{ fontSize: '12px', color: '#6b635b' }}>
                      Guardian: <strong>{stu.guardian}</strong>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <span style={{ 
                        background: stu.feeStatus === 'Paid' ? '#e2ece9' : '#fceee6', 
                        color: stu.feeStatus === 'Paid' ? '#52796f' : '#c85a32',
                        padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: '700'
                      }}>
                        {stu.feeStatus}
                      </span>
                      <span style={{ fontWeight: '700', fontSize: '12px', color: '#201c18', width: '45px', textAlign: 'right' }}>
                        {stu.attendance}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Activity & Quick Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Quick Notice Panel */}
          <div style={{ background: '#ffffff', padding: '24px', borderRadius: '16px', border: '1px solid #e8e5de' }}>
            <h4 style={{ fontSize: '14px', fontWeight: '800', color: '#201c18', marginBottom: '16px', margin: 0 }}>
              Campus Notices
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
              <div style={{ padding: '12px', background: '#faf9f6', borderRadius: '10px', fontSize: '12px' }}>
                <div style={{ fontWeight: '700', color: '#201c18' }}>Faculty Meeting</div>
                <div style={{ color: '#8c827a', marginTop: '2px' }}>Today at 3:00 PM in Conference Room B</div>
              </div>
              <div style={{ padding: '12px', background: '#faf9f6', borderRadius: '10px', fontSize: '12px' }}>
                <div style={{ fontWeight: '700', color: '#201c18' }}>Quarterly Fee Deadline</div>
                <div style={{ color: '#8c827a', marginTop: '2px' }}>Reminder emails sent to 42 guardians</div>
              </div>
            </div>
          </div>

          {/* Quick Actions Panel */}
          <div style={{ background: '#ffffff', padding: '24px', borderRadius: '16px', border: '1px solid #e8e5de' }}>
            <h4 style={{ fontSize: '14px', fontWeight: '800', color: '#201c18', marginBottom: '16px', margin: 0 }}>
              Frequent Actions
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '16px' }}>
              <button style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e8e5de', background: '#faf9f6', textAlign: 'left', fontSize: '12px', fontWeight: '600', cursor: 'pointer', color: '#201c18' }}>
                📋 Mark Attendance
              </button>
              <button style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e8e5de', background: '#faf9f6', textAlign: 'left', fontSize: '12px', fontWeight: '600', cursor: 'pointer', color: '#201c18' }}>
                💳 Record Fee Payment
              </button>
              <button style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e8e5de', background: '#faf9f6', textAlign: 'left', fontSize: '12px', fontWeight: '600', cursor: 'pointer', color: '#201c18' }}>
                📢 Post Announcement
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Add Student Modal */}
      {isAddStudentOpen && (
        <Modal isOpen={isAddStudentOpen} onClose={() => setIsAddStudentOpen(false)} title="Register Student">
          {/* Modal Form */}
        </Modal>
      )}
    </div>
  );
};

export default Dashboard;