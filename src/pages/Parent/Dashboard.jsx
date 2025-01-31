import React from 'react';
import ChildList from '../../components/Parent/ChildDashboard/ChildList';

console.log(ChildList);


const Dashboard = () => {
  return (
    <div>
      <h1>Panel Rodzica</h1>
      
      <ChildList />
    </div>
  );
};

export default Dashboard;

