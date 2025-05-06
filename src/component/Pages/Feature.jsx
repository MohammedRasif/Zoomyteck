import React, { useEffect } from 'react';
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { ArrowRight } from 'lucide-react';
import { useDarkMood } from '../../context/ThemeContext';

const Feature = () => {
  const { darkMode } = useDarkMood();
   // Reset scroll position to top when component mounts
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  // Construction-related data for the charts and tables
  const spendingData = [
    { name: 'Residential', value: 40, color: '#9B5DE5' },
    { name: 'Commercial', value: 30, color: '#00BBF9' },
    { name: 'Infrastructure', value: 15, color: '#00F5D4' },
    { name: 'Industrial', value: 10, color: '#FEE440' },
    { name: 'Renovation', value: 5, color: '#F15BB5' },
  ];

  const contractData = [
    { name: 'Jan', value: 15 },
    { name: 'Feb', value: 18 },
    { name: 'Mar', value: 22 },
    { name: 'Apr', value: 20 },
    { name: 'May', value: 28 },
    { name: 'Jun', value: 25 },
    { name: 'Jul', value: 30 },
    { name: 'Aug', value: 23 },
    { name: 'Sep', value: 19 },
    { name: 'Oct', value: 17 },
  ];

  const tableData = [
    { name: 'BuildRight Corp', projects: 150, value: '$12.5M', growth: '+15%', growthValue: 15 },
    { name: 'ConstructTech Solutions', projects: 95, value: '$8.7M', growth: '+6%', growthValue: 6 },
    { name: 'SteelFrame Dynamics', projects: 80, value: '$7.2M', growth: '-3%', growthValue: -3 },
    { name: 'UrbanBuild Group', projects: 60, value: '$4.8M', growth: '+8%', growthValue: 8 },
  ];

  return (
    <div className={` ${darkMode ? 'bg-black text-white' : 'bg-gradient-to-r from-[#EAEFFB] via-[#F5F3E6] to-[#EAEFFB] text-black'}`}>
      <div className="container mx-auto  py-8">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Construction Market Analysis</h1>
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-800'}`}>
            Gain deep insights into construction contract patterns and identify growth opportunities with our powerful analytics.
          </p>
        </header>

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Spending by Category Chart */}
          <div className={`${darkMode ? '' : ' '}  rounded-xl  backdrop-blur-sm p-4`}>
            <h3 className="text-sm font-medium mb-4">Spending by Project Type</h3>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={spendingData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {spendingData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: darkMode ? '#1A1F2C' : '#ffffff',
                      borderColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : '#e5e7eb',
                      color: darkMode ? 'white' : 'black',
                    }}
                  />
                  <Legend
                    layout="horizontal"
                    verticalAlign="bottom"
                    align="center"
                    wrapperStyle={{
                      fontSize: '12px',
                      color: darkMode ? '#FFFFFF' : '#4b5563',
                    }}
                  />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Contracts by Value Chart */}
          <div className={`${darkMode ? '' : ''}  rounded-xl  backdrop-blur-sm p-4`}>
            <h3 className="text-sm font-medium mb-4">Contracts by Value (Monthly)</h3>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart data={contractData} margin={{ top: 5, right: 30, left: 20, bottom: 25 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.1)' : '#e5e7eb'} />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 12, fill: darkMode ? '#C8C8C9' : '#4b5563' }}
                  />
                  <YAxis
                    tick={{ fontSize: 12, fill: darkMode ? '#C8C8C9' : '#4b5563' }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: darkMode ? '#1A1F2C' : '#ffffff',
                      borderColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : '#e5e7eb',
                      color: darkMode ? 'white' : 'black',
                    }}
                  />
                  <Bar dataKey="value" fill="#9B5DE5" radius={[4, 4, 0, 0]} />
                </RechartsBarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Top Contracting Agencies Table */}
        <div className="mb-8">
          <div className={`${darkMode ? 'bg-[#1A1F2C]/60 border-white/10' : 'bg-white/80 border-gray-200'} border rounded-xl  backdrop-blur-sm p-4`}>
            <h3 className="text-sm font-medium mb-4">Top Construction Contractors</h3>
            <div className="overflow-auto">
              <table className="w-full text-sm">
                <thead className={`text-xs uppercase ${darkMode ? 'text-gray-400 border-white/10' : 'text-gray-500 border-gray-200'} border-b`}>
                  <tr>
                    <th className="text-left py-2 px-4">CONTRACTOR</th>
                    <th className="text-right py-2 px-4"># PROJECTS</th>
                    <th className="text-right py-2 px-4">TOTAL VALUE</th>
                    <th className="text-right py-2 px-4">M/M GROWTH</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row, index) => (
                    <tr key={index} className={`border-b ${darkMode ? 'border-white/5' : 'border-gray-100'}`}>
                      <td className="py-2 px-4 text-left">{row.name}</td>
                      <td className="py-2 px-4 text-right">{row.projects}</td>
                      <td className="py-2 px-4 text-right">{row.value}</td>
                      <td
                        className={`py-2 px-4 text-right ${
                          row.growthValue >= 0 ? 'text-green-400' : 'text-red-400'
                        }`}
                      >
                        {row.growth}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className={`${darkMode ? 'bg-[#1A1F2C]/60 border-white/10' : 'bg-white/80 border-gray-200'} border rounded-xl  backdrop-blur-sm p-6`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-medium">Project Portfolio</h3>
              <span className="text-purple-400 bg-purple-400/10 px-2 py-1 rounded text-xs">+15%</span>
            </div>
            <p className="text-2xl font-bold mb-2">$45.6M</p>
            <div className={`flex items-center text-xs ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'} cursor-pointer`}>
              <span>View details</span>
              <ArrowRight className="h-3 w-3 ml-1" />
            </div>
          </div>

          <div className={`${darkMode ? 'bg-[#1A1F2C]/60 border-white/10' : 'bg-white/80 border-gray-200'} border rounded-xl  backdrop-blur-sm p-6`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-medium">Contract Awards</h3>
              <span className="text-blue-400 bg-blue-400/10 px-2 py-1 rounded text-xs">+10%</span>
            </div>
            <p className="text-2xl font-bold mb-2">142</p>
            <div className={`flex items-center text-xs ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'} cursor-pointer`}>
              <span>View details</span>
              <ArrowRight className="h-3 w-3 ml-1" />
            </div>
          </div>

          <div className={`${darkMode ? 'bg-[#1A1F2C]/60 border-white/10' : 'bg-white/80 border-gray-200'} border rounded-xl  backdrop-blur-sm p-6`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-medium">Contractor Analytics</h3>
              <span className="text-green-400 bg-green-400/10 px-2 py-1 rounded text-xs">+12%</span>
            </div>
            <p className="text-2xl font-bold mb-2">68</p>
            <div className={`flex items-center text-xs ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'} cursor-pointer`}>
              <span>View details</span>
              <ArrowRight className="h-3 w-3 ml-1" />
            </div>
          </div>

          <div className={`${darkMode ? 'bg-[#1A1F2C]/60 border-white/10' : 'bg-white/80 border-gray-200'} border rounded-xl  backdrop-blur-sm p-6`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-medium">Market Trends</h3>
              <span className="text-yellow-400 bg-yellow-400/10 px-2 py-1 rounded text-xs">+7%</span>
            </div>
            <p className="text-2xl font-bold mb-2">$18.3M</p>
            <div className={`flex items-center text-xs ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'} cursor-pointer`}>
              <span>View details</span>
              <ArrowRight className="h-3 w-3 ml-1" />
            </div>
          </div>
        </div>

        {/* Description Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className={`${darkMode ? 'bg-[#1A1F2C]/60 border-white/10' : 'bg-white/80 border-gray-200'} border rounded-xl  backdrop-blur-sm p-6`}>
            <h3 className="text-sm font-medium mb-4">Project Portfolio Management</h3>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Track spending trends across construction projects and sectors, and identify top emerging contractors.
              Our tools help you stay ahead and make more competitive bids. Dive deep into the data and
              enhance your strategic positioning.
            </p>
          </div>

          <div className={`${darkMode ? 'bg-[#1A1F2C]/60 border-white/10' : 'bg-white/80 border-gray-200'} border rounded-xl  backdrop-blur-sm p-6`}>
            <h3 className="text-sm font-medium mb-4">Contract Intelligence</h3>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Analyze construction contracts based on project values, win rates, and find the strengths, weaknesses, and
              gaps in contractors' portfolios for strategic advantage. Monitor key metrics and identify
              opportunities for business growth.
            </p>
          </div>
        </div>

        {/* Additional Description Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className={`${darkMode ? 'bg-[#1A1F2C]/60 border-white/10' : 'bg-white/80 border-gray-200'} border rounded-xl  backdrop-blur-sm p-6`}>
            <h3 className="text-sm font-medium mb-4">Contractor Analysis</h3>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Track leading contractors and spending patterns. Identify future partners, evaluate contractor
              market position, and analyze growth curves. Get comprehensive insights on market leaders
              and emerging players in the construction industry.
            </p>
          </div>

          <div className={`${darkMode ? 'bg-[#1A1F2C]/60 border-white/10' : 'bg-white/80 border-gray-200'} border rounded-xl  backdrop-blur-sm p-6`}>
            <h3 className="text-sm font-medium mb-4">Construction Market Trends</h3>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              See which construction segments are on the rise based on your specific criteria. Learn how to
              strategically position your offerings within lucrative emerging categories. Stay ahead of
              market shifts with our advanced trend analysis.
            </p>
          </div>
        </div>

       
        
      </div>
    </div>
  );
};

export default Feature;