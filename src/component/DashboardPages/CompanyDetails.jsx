import { useState, useEffect, useRef } from "react";
import { useDarkMood } from "../../context/ThemeContext";
import { useGetCompantDeatilsQuery, useSubmitDeatilsMutation } from "../../Redux/feature/ApiSlice";

const CompanyDetails = () => {
  const { darkMode } = useDarkMood();
  const [submitDetails, { isLoading: isSubmitting, error: submitError }] = useSubmitDeatilsMutation();
  const { data, isLoading: isFetching, error: fetchError } = useGetCompantDeatilsQuery();
  const fileInputRef = useRef(null);

  // Form state for all fields
  const [formData, setFormData] = useState({
    logo: "",
    logoFile: null,
    name: "",
    email: "",
    phone: "",
    website: "",
    street: "",
    city: "",
    zipcode: "",
    state: "",
    description: "",
  });

  // Logo preview state (initialize empty)
  const [logoPreview, setLogoPreview] = useState("");

  // Populate form with fetched data
  useEffect(() => {
    if (data) {
      setFormData({
        logo: data.logo || "",
        logoFile: null,
        name: data.name || "",
        email: data.email || "",
        phone: data.phone || "",
        website: data.website || "",
        street: data.street || "",
        city: data.city || "",
        zipcode: data.zipcode || "",
        state: data.state || "",
        description: data.description || "",
      });
      setLogoPreview(data.logo || "");
    }
  }, [data]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle logo file upload
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2.5 * 1024 * 1024) {
        console.error("File size exceeds 2.5 MB");
        return;
      }
      setFormData((prev) => ({ ...prev, logoFile: file, logo: "" }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Trigger file input for "Change" button
  const handleChangeClick = () => {
    fileInputRef.current.click();
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSubmit = {
        logoFile: formData.logoFile,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        website: formData.website,
        street: formData.street,
        city: formData.city,
        zipcode: formData.zipcode,
        state: formData.state,
        description: formData.description,
      };
      const response = await submitDetails(dataToSubmit).unwrap();
      console.log("Response:", response);
      // Update formData with response logo URL if provided
      if (response.logo) {
        setFormData((prev) => ({ ...prev, logo: response.logo, logoFile: null }));
        setLogoPreview(response.logo);
      }
    } catch (err) {
      console.error("Failed to update company details:", err);
    }
  };

  // Fetching loading state
  if (isFetching) {
    return (
      <div className="dark:bg-black dark:text-white text-black p-4">
        <div className="container mx-auto">
          <h1 className="text-4xl font-medium mb-1">Company Details</h1>
          <p className="text-sm text-gray-400 mb-6">Manage Your Company Details</p>
        </div>
      </div>
    );
  }

  // Fetch error state
  if (fetchError) {
    return (
      <div className="dark:bg-black dark:text-white text-black p-4">
        <div className="container mx-auto">
          <h1 className="text-4xl font-medium mb-1">Company Details</h1>
          <p className="text-sm text-gray-400 mb-6">Manage Your Company Details</p>
          <p className="text-red-500">Error: {fetchError.data?.message || "Failed to load company details"}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dark:bg-black dark:text-white text-black p-4">
      <div className="container mx-auto">
        <h1 className="text-4xl font-medium mb-1">Company Details</h1>
        <p className="text-sm text-gray-400 mb-6">Manage Your Company Details</p>

        {/* Company Logo Section */}
        <div className="flex items-start gap-6 mb-8">
          <div className="w-80 h-44 rounded-lg overflow-hidden">
            <div className="w-full h-full bg-gradient-to-b dark:from-zinc-900 dark:to-black border border-gray-500 from-gray-200 to-white rounded-lg overflow-hidden flex items-center justify-center">
              {logoPreview ? (
                <img
                  src={logoPreview}
                  alt="Company Logo"
                  className="w-56 object-contain"
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
              <label className="dark:bg-black dark:text-white bg-white border dark:hover:bg-zinc-800 dark:border-gray-500 text-black text-[16px] font-[500] px-4 py-1.5 rounded-lg cursor-pointer hover:bg-gray-200">
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleLogoChange}
                  ref={fileInputRef}
                />
                Upload
              </label>

              <button
                type="button"
                onClick={handleChangeClick}
                className="border border-gray-600 text-[16px] font-[500] px-4 py-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
              >
                Change
              </button>
            </div>
          </div>
        </div>

        {/* Form Fields */}
        <form onSubmit={handleSubmit}>
          <div className="">
            <div className="flex items-center space-x-10 mt-3">
              <div>
                <label className="block text-[14px] text-black font-[500] dark:text-gray-400">Company Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter company name"
                  className="border-[2px] border-gray-500 dark:border-zinc-800 rounded-lg py-[9px] w-[500px] mt-2 pl-2 bg-white text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 dark:bg-zinc-900"
                  required
                />
              </div>

              <div>
                <label className="block text-[14px] text-black font-[500] dark:text-gray-400">Street Address</label>
                <input
                  type="text"
                  name="street"
                  value={formData.street}
                  onChange={handleInputChange}
                  placeholder="Enter street address"
                  className="border-[2px] border-gray-500 dark:border-zinc-800 rounded-lg py-[9px] w-[500px] mt-2 pl-2 bg-white text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 dark:bg-zinc-900"
                  required
                />
              </div>
            </div>

            <div className="flex items-center space-x-10 mt-3">
              <div>
                <label className="block text-[14px] text-black font-[500] dark:text-gray-400">Company Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter company email"
                  className="border-[2px] border-gray-500 dark:border-zinc-800 rounded-lg py-[9px] w-[500px] mt-2 pl-2 bg-white text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 dark:bg-zinc-900"
                  required
                />
              </div>

              <div>
                <label className="block text-[14px] text-black font-[500] dark:text-gray-400">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="Enter city"
                  className="border-[2px] border-gray-500 dark:border-zinc-800 rounded-lg py-[9px] w-[500px] mt-2 pl-2 bg-white text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 dark:bg-zinc-900"
                  required
                />
              </div>
            </div>

            <div className="flex items-center space-x-10 mt-3">
              <div>
                <label className="block text-[14px] text-black font-[500] dark:text-gray-400">Company Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter company phone"
                  className="border-[2px] border-gray-500 dark:border-zinc-800 rounded-lg py-[9px] w-[500px] mt-2 pl-2 bg-white text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 dark:bg-zinc-900"
                  required
                />
              </div>

              <div>
                <label className="block text-[14px] text-black font-[500] dark:text-gray-400">Postal/Zipcode</label>
                <input
                  type="text"
                  name="zipcode"
                  value={formData.zipcode}
                  onChange={handleInputChange}
                  placeholder="Enter postal/zipcode"
                  className="border-[2px] border-gray-500 dark:border-zinc-800 rounded-lg py-[9px] w-[500px] mt-2 pl-2 bg-white text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 dark:bg-zinc-900"
                  required
                />
              </div>
            </div>

            <div className="flex items-center space-x-10 mt-3">
              <div>
                <label className="block text-[14px] text-black font-[500] dark:text-gray-400">Company Website</label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  placeholder="Enter company website"
                  className="border-[2px] border-gray-500 dark:border-zinc-800 rounded-lg py-[9px] w-[500px] mt-2 pl-2 bg-white text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 dark:bg-zinc-900"
                  required
                />
              </div>

              <div>
                <label className="block text-[14px] text-black font-[500] dark:text-gray-400">State/Prov/Region</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  placeholder="Enter state/province/region"
                  className="border-[2px] border-gray-500 dark:border-zinc-800 rounded-lg py-[9px] w-[500px] mt-2 pl-2 bg-white text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 dark:bg-zinc-900"
                  required
                />
              </div>
            </div>
          </div>

          {/* Submit Button with Loading Indicator */}
          <div className="mt-6 flex items-center gap-4">
            <button
              type="submit"
              className="bg-black cursor-pointer hover:bg-gray-300 px-10 py-3 rounded-lg font-[500] text-xl text-white dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700 disabled:opacity-50"
              disabled={isSubmitting}
            >
              {data ? "Update" : "Submit"}
            </button>

            {isSubmitting && (
              <div className="flex items-center justify-center">
                <div className="w-6 h-6 border-4 border-t-transparent border-white dark:border-gray-400 rounded-full animate-spin"></div>
              </div>
            )}
          </div>

          {/* Error Message */}
          {submitError && (
            <p className="mt-2 text-red-500">
              Error: {submitError.data?.message || "Failed to update company details"}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default CompanyDetails;