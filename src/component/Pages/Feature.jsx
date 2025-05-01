import React from 'react';
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { ArrowRight } from 'lucide-react';

const Feature = () => {
  // Sample data for the charts and tables
  const spendingData = [
    { name: 'IT Services', value: 35, color: '#9B5DE5' },
    { name: 'Software', value: 25, color: '#00BBF9' },
    { name: 'Hardware', value: 20, color: '#00F5D4' },
    { name: 'Consulting', value: 15, color: '#FEE440' },
    { name: 'Training', value: 5, color: '#F15BB5' },
  ];

  const contractData = [
    { name: 'Jan', value: 10 },
    { name: 'Feb', value: 12 },
    { name: 'Mar', value: 18 },
    { name: 'Apr', value: 15 },
    { name: 'May', value: 25 },
    { name: 'Jun', value: 22 },
    { name: 'Jul', value: 28 },
    { name: 'Aug', value: 19 },
    { name: 'Sep', value: 16 },
    { name: 'Oct', value: 14 },
  ];

  const tableData = [
    { name: 'Acme Digital', projects: 125, value: '$8.2M', growth: '+12%', growthValue: 12 },
    { name: 'Tech & System Solutions', projects: 84, value: '$6.2M', growth: '+4%', growthValue: 4 },
    { name: 'Globex Dynamics', projects: 76, value: '$5.7M', growth: '-2%', growthValue: -2 },
    { name: 'Initech Services Group', projects: 54, value: '$3.9M', growth: '+6%', growthValue: 6 },
  ];

  return (
    <div className="min-h-screen bg-[#1A1F2C] text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Market Analysis</h1>
          <p className="text-gray-400">
            Gain deep insights into government contracts patterns and identify growth opportunities with our powerful analytics.
          </p>
        </header>

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Spending by Category Chart */}
          <div className="bg-[#1A1F2C]/60 border border-white/10 rounded-xl shadow-lg backdrop-blur-sm p-4">
            <h3 className="text-sm font-medium mb-4">Spending by Category</h3>
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
                      backgroundColor: '#1A1F2C',
                      borderColor: 'rgba(255, 255, 255, 0.1)',
                      color: 'white',
                    }}
                  />
                  <Legend
                    layout="horizontal"
                    verticalAlign="bottom"
                    align="center"
                    wrapperStyle={{
                      fontSize: '12px',
                      color: '#FFFFFF',
                    }}
                  />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Contracts by Value Chart */}
          <div className="bg-[#1A1F2C]/60 border border-white/10 rounded-xl shadow-lg backdrop-blur-sm p-4">
            <h3 className="text-sm font-medium mb-4">Contracts by Value (FY Comparison)</h3>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart data={contractData} margin={{ top: 5, right: 30, left: 20, bottom: 25 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 12, fill: '#C8C8C9' }}
                  />
                  <YAxis
                    tick={{ fontSize: 12, fill: '#C8C8C9' }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1A1F2C',
                      borderColor: 'rgba(255, 255, 255, 0.1)',
                      color: 'white',
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
          <div className="bg-[#1A1F2C]/60 border border-white/10 rounded-xl shadow-lg backdrop-blur-sm p-4">
            <h3 className="text-sm font-medium mb-4">Top Contracting Agencies</h3>
            <div className="overflow-auto">
              <table className="w-full text-sm">
                <thead className="text-xs uppercase text-gray-400 border-b border-white/10">
                  <tr>
                    <th className="text-left py-2 px-4">CONTRACTOR / AGENCY</th>
                    <th className="text-right py-2 px-4"># PROJECTS</th>
                    <th className="text-right py-2 px-4">TOTAL VALUE</th>
                    <th className="text-right py-2 px-4">M/M GROWTH</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row, index) => (
                    <tr key={index} className="border-b border-white/5">
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
          <div className="bg-[#1A1F2C]/60 border border-white/10 rounded-xl shadow-lg backdrop-blur-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-medium">Strategic Portfolio</h3>
              <span className="text-purple-400 bg-purple-400/10 px-2 py-1 rounded text-xs">+12%</span>
            </div>
            <p className="text-2xl font-bold mb-2">$38.2M</p>
            <div className="flex items-center text-xs text-gray-400 hover:text-white cursor-pointer">
              <span>View details</span>
              <ArrowRight className="h-3 w-3 ml-1" />
            </div>
          </div>

          <div className="bg-[#1A1F2C]/60 border border-white/10 rounded-xl shadow-lg backdrop-blur-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-medium">Contract Intelligence</h3>
              <span className="text-blue-400 bg-blue-400/10 px-2 py-1 rounded text-xs">+8%</span>
            </div>
            <p className="text-2xl font-bold mb-2">127</p>
            <div className="flex items-center text-xs text-gray-400 hover:text-white cursor-pointer">
              <span>View details</span>
              <ArrowRight className="h-3 w-3 ml-1" />
            </div>
          </div>

          <div className="bg-[#1A1F2C]/60 border border-white/10 rounded-xl shadow-lg backdrop-blur-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-medium">Vendor Analytics</h3>
              <span className="text-green-400 bg-green-400/10 px-2 py-1 rounded text-xs">+15%</span>
            </div>
            <p className="text-2xl font-bold mb-2">54</p>
            <div className="flex items-center text-xs text-gray-400 hover:text-white cursor-pointer">
              <span>View details</span>
              <ArrowRight className="h-3 w-3 ml-1" />
            </div>
          </div>

          <div className="bg-[#1A1F2C]/60 border border-white/10 rounded-xl shadow-lg backdrop-blur-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-medium">Market Trends</h3>
              <span className="text-yellow-400 bg-yellow-400/10 px-2 py-1 rounded text-xs">+5%</span>
            </div>
            <p className="text-2xl font-bold mb-2">$12.7M</p>
            <div className="flex items-center text-xs text-gray-400 hover:text-white cursor-pointer">
              <span>View details</span>
              <ArrowRight className="h-3 w-3 ml-1" />
            </div>
          </div>
        </div>

        {/* Description Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#1A1F2C]/60 border border-white/10 rounded-xl shadow-lg backdrop-blur-sm p-6">
            <h3 className="text-sm font-medium mb-4">Strategic Portfolio Management</h3>
            <p className="text-sm text-gray-400">
              Track spending trends across agencies and sectors, and identify top emerging contractors.
              Our tools help you stay ahead and make more competitive bids. Dive deep into the data and
              enhance your strategic positioning.
            </p>
          </div>

          <div className="bg-[#1A1F2C]/60 border border-white/10 rounded-xl shadow-lg backdrop-blur-sm p-6">
            <h3 className="text-sm font-medium mb-4">Contract Intelligence</h3>
            <p className="text-sm text-gray-400">
              Analyze contracts based on award values, win rates, and find the strengths, weaknesses, and
              gaps in vendors' portfolios for strategic advantage. Monitor key metrics and identify
              opportunities for business growth.
            </p>
          </div>
        </div>

        {/* Additional Description Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-[#1A1F2C]/60 border border-white/10 rounded-xl shadow-lg backdrop-blur-sm p-6">
            <h3 className="text-sm font-medium mb-4">Vendor Analysis</h3>
            <p className="text-sm text-gray-400">
              Track leading contractors and spending patterns. Identify future partners, evaluate vendor
              market position, and analyze growth curves. Get comprehensive insights on market leaders
              and emerging players.
            </p>
          </div>

          <div className="bg-[#1A1F2C]/60 border border-white/10 rounded-xl shadow-lg backdrop-blur-sm p-6">
            <h3 className="text-sm font-medium mb-4">Market Trends</h3>
            <p className="text-sm text-gray-400">
              See which segments are on the rise based on your specific industry criteria. Learn how to
              strategically position your offerings within lucrative emerging categories. Stay ahead of
              market shifts with our advanced trend analysis.
            </p>
          </div>
        </div>

        {/* Footer-like Section */}
        <div className="mt-16 border-t border-white/10 pt-8 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-lg font-bold mb-4">GovScoreGuid</h4>
              <p className="text-sm text-gray-400">
                The premier platform to track US government contracts, vendors, and opportunities.
              </p>
              <div className="flex space-x-3 mt-4">
                <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                  <span className="text-xs">T</span>
                </div>
                <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                  <span className="text-xs">Li</span>
                </div>
                <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                  <span className="text-xs">M</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-3">Platform</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Features</li>
                <li>Getting Started</li>
                <li>Contract Database</li>
                <li>Pricing</li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-3">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Documentation</li>
                <li>API Reference</li>
                <li>Guides</li>
                <li>Blogs</li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-3">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>About</li>
                <li>Careers</li>
                <li>Contact</li>
                <li>Privacy</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feature;