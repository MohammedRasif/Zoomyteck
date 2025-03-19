"use client"

import { useState } from "react"

const CompanyDetails = () => {
  const [logoPreview, setLogoPreview] = useState("https://res.cloudinary.com/dfsu0cuvb/image/upload/v1742376506/OBJECTS_w80o4b.png")

  return (
    <div className="bg-black text-white p-4">
      <div className="container mx-auto">
        <h1 className="text-4xl font-medium mb-1">Company Details</h1>
        <p className="text-sm text-gray-400 mb-6">Manage Your Company Details</p>

        {/* Company Logo Section */}
        <div className="flex items-start gap-6 mb-8">
          <div className="w-80 h-44 rounded-lg overflow-hidden">
            <div className="w-full h-full bg-gradient-to-b from-zinc-900  to-black border  border-gray-500 rounded-lg overflow-hidden flex items-center justify-center">
              {logoPreview ? (
                <img
                  src={logoPreview || "/placeholder.svg"}
                  alt="Company Logo"
                  className="w-40 "
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full">
                  <img src="/placeholder.svg?height=50&width=50" alt="Default Logo" className="w-12 h-12" />
                </div>
              )}
            </div>
          </div>

          <div className="space-y-12">
            <div>
              <h2 className="text-3xl font-medium mb-1">Company Logo</h2>
              <p className="text-[14px] text-gray-400 mb-1">The Proposed size is 300px*300px.</p>
              <p className="text-[14px] text-gray-400 mb-3">No Bigger Than 2.5 MB.</p>
            </div>

            <div className="flex gap-2">
              <label className="bg-white text-black text-[16px] font-[500] px-4 py-1.5 rounded-lg cursor-pointer hover:bg-gray-200 transition">
                <input type="file" className="hidden" accept="image/*" />
                Upload
              </label>

              <button className="border border-gray-600 text-[16px] font-[500] px-4 py-1.5 rounded-lg hover:bg-zinc-800 transition">
                Change
              </button>
            </div>
          </div>
        </div>

        {/* Form Fields */}
        <div className="">
          <div className="flex items-center space-x-10 mt-3">
          <div>
            <label className="block text-[14px] font-[400] text-gray-200 ">Company Name</label>
            <input
              type="text"
              placeholder="Enter company name"
              className="border-[2px] border-gray-500 dark:border-zinc-800 rounded-lg py-[9px] w-[500px] mt-2 pl-2 bg-black text-white placeholder-gray-500"
            />
          </div>

          <div>
            <label className="block text-[14px] font-[400] text-gray-200 ">Street Address</label>
            <input
              type="text"
              placeholder="Enter street address"
              className="border-[2px] border-gray-500 dark:border-zinc-800 rounded-lg py-[9px] w-[500px] mt-2 pl-2 bg-black text-white placeholder-gray-500"
            />
          </div>
          </div>

          <div className="flex items-center space-x-10 mt-3">
          <div>
            <label className="block text-[14px] font-[400] text-gray-200 ">Company Email</label>
            <input
              type="email"
              placeholder="Enter company email"
              className="border-[2px] border-gray-500 dark:border-zinc-800 rounded-lg py-[9px] w-[500px] mt-2 pl-2 bg-black text-white placeholder-gray-500"
            />
          </div>

          <div>
            <label className="block text-[14px] font-[400] text-gray-200 ">City</label>
            <input
              type="text"
              placeholder="Enter city"
              className="border-[2px] border-gray-500 dark:border-zinc-800 rounded-lg py-[9px] w-[500px] mt-2 pl-2 bg-black text-white placeholder-gray-500"
            />
          </div>
          </div>

          <div className="flex items-center space-x-10 mt-3">
          <div>
            <label className="block text-[14px] font-[400] text-gray-200 ">Company Phone</label>
            <input
              type="tel"
              placeholder="Enter company phone"
              className="border-[2px] border-gray-500 dark:border-zinc-800 rounded-lg py-[9px] w-[500px] mt-2 pl-2 bg-black text-white placeholder-gray-500"
            />
          </div>

          <div>
            <label className="block text-[14px] font-[400] text-gray-200 ">Postal/Zipcode</label>
            <input
              type="text"
              placeholder="Enter postal/zipcode"
              className="border-[2px] border-gray-500 dark:border-zinc-800 rounded-lg py-[9px] w-[500px] mt-2 pl-2 bg-black text-white placeholder-gray-500"
            />
          </div>
          </div>

          <div className="flex items-center space-x-10 mt-3">
          <div>
            <label className="block text-[14px] font-[400] text-gray-200 ">Company Website</label>
            <input
              type="url"
              placeholder="Enter company website"
              className="border-[2px] border-gray-500 dark:border-zinc-800 rounded-lg py-[9px] w-[500px] mt-2 pl-2 bg-black text-white placeholder-gray-500"
            />
          </div>

          <div>
            <label className="block text-[14px] font-[400] text-gray-200 ">State/Prov/Region</label>
            <input
              type="text"
              placeholder="Enter state/province/region"
              className="border-[2px] border-gray-500 dark:border-zinc-800 rounded-lg py-[9px] w-[500px] mt-2 pl-2 bg-black text-white placeholder-gray-500"
            />
          </div>
          </div>
        </div>

        {/* About Company */}
        <div className="mt-3">
          <label className="block text-[14px] font-[400] text-gray-200 ">About the company</label>
          <textarea
            rows={4}
            placeholder="Enter company description..."
            className="border-[2px] border-gray-500 dark:border-zinc-800 rounded-lg py-[9px] w-[500px] mt-2 pl-2 bg-black text-white placeholder-gray-500 resize-none"
          ></textarea>
        </div>

        {/* Update Button */}
        <button className="mt-6 bg-white cursor-pointer hover:bg-gray-300 px-10 py-3 rounded-lg font-[500] text-xl text-black">
          Update Information
        </button>
      </div>
    </div>
  )
}

export default CompanyDetails

