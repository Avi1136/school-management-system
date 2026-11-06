import React from 'react';

const StatCard = ({ title, value, colorClass }) => {
  return (
    <div className={`stat-card ${colorClass}`}>
      <div className="stat-card-title">{title}</div>
      <div className="stat-card-value">{value}</div>
    </div>
  );
};

export default StatCard;