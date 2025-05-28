


import { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IoCameraReverseOutline } from "react-icons/io5";
import { useChangePasswordMutation } from "../../Redux/feature/ApiSlice";

const Setting = () => {
  const [activeSection, setActiveSection] = useState("editProfile");

  // State for profile fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(
    "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1738148405/fotor-2025010923230_1_u9l6vi.png"
  );

  // State for password fields
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // State to track visibility for each password field
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // State for error, success, and loading
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isProfileLoading, setIsProfileLoading] = useState(false);

  // Toggle functions for password visibility
  const toggleCurrentPassword = () => setShowCurrentPassword(!showCurrentPassword);
  const toggleNewPassword = () => setShowNewPassword(!showNewPassword);
  const toggleConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  // Use mutation hook for password change
  const [changePassword, { isLoading: isPasswordLoading }] = useChangePasswordMutation();

  // Fetch user profile data on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        setError("Please log in to view your profile.");
        return;
      }

      try {
        const response = await fetch("http://192.168.10.124:1000/api/v1/user/profile/", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          const contentType = response.headers.get("content-type");
          const hasJson = contentType && contentType.includes("application/json");
          let errorMessage = "Failed to fetch profile.";
          if (response.status === 401) {
            errorMessage = "Unauthorized: Invalid or missing token.";
          } else if (hasJson) {
            const errorData = await response.json();
            errorMessage = errorData.message || errorMessage;
          } else {
            const text = await response.text();
            errorMessage = text || `HTTP error ${response.status}`;
          }
          throw new Error(errorMessage);
        }

        const contentType = response.headers.get("content-type");
        const hasJson = contentType && contentType.includes("application/json");
        if (!hasJson) {
          throw new Error("Invalid response format: Expected JSON.");
        }

        const data = await response.json();
        setFullName(data.full_name || "");
        setEmail(data.email || "");
        setImagePreview(data.image || "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1738148405/fotor-2025010923230_1_u9l6vi.png");
      } catch (err) {
        setError(err.message || "Failed to fetch profile. Please try again.");
        console.error("Fetch profile error:", err);
      }
    };

    fetchProfile();
  }, []);

  // Handle image selection and preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Handle profile update submission
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsProfileLoading(true);

    // Basic validation
    if (!fullName) {
      setError("Full name is required.");
      setIsProfileLoading(false);
      return;
    }

    // Get access token from localStorage
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      setError("Please log in to update your profile.");
      setIsProfileLoading(false);
      return;
    }

    // Create FormData for profile update
    const formData = new FormData();
    formData.append("full_name", fullName);
    formData.append("email", email); // Include email as required by backend, even though it's read-only
    formData.append("image", image || null);

    try {
      const endpoint = "http://192.168.10.124:1000/api/v1/user/update-profile/";
      console.log("Sending PUT request to:", endpoint);

      // Send request to backend using fetch with PUT method
      const response = await fetch(endpoint, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      });

      console.log("Response status:", response.status);
      console.log("Content-Type:", response.headers.get("content-type"));

      // Check if response has content
      const contentType = response.headers.get("content-type");
      const hasJson = contentType && contentType.includes("application/json");

      if (!response.ok) {
        let errorMessage = "Failed to update profile.";
        if (response.status === 401) {
          errorMessage = "Unauthorized: Invalid or missing token.";
        } else if (response.status === 404) {
          errorMessage = "Profile update endpoint not found. Please check the server URL or endpoint.";
        } else if (hasJson) {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } else {
          const text = await response.text();
          errorMessage = text || `HTTP error ${response.status}`;
        }
        throw new Error(errorMessage);
      }

      // Only parse JSON if response is expected to be JSON
      let data = {};
      if (hasJson) {
        data = await response.json();
      } else {
        const text = await response.text();
        if (text) {
          console.warn("Non-JSON response received:", text);
        }
      }

      // Update state with response data
      setFullName(data.full_name || fullName);
      setEmail(data.email || email);
      setImagePreview(data.image || "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1738148405/fotor-2025010923230_1_u9l6vi.png");
      setImage(null); // Clear image input
      setSuccess("Profile updated successfully!");
    } catch (err) {
      setError(err.message || "Failed to update profile. Please try again.");
      console.error("Profile update error:", err);
    } finally {
      setIsProfileLoading(false);
    }
  };

  // Handle password change submission
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }

    try {
      await changePassword({
        old_password: currentPassword,
        new_password: newPassword,
      }).unwrap();
      setSuccess("Password changed successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError(err?.data?.message || "Failed to change password. Please try again.");
    }
  };

  return (
    <div className="border-t border-gray-300 dark:border-gray-700 dark:bg-black text-black dark:text-white">
      <h1 className="text-[35px] font-[500] pb-2 mt-4 ml-4">Profile</h1>
      <div className="flex items-center justify-center pb-10">
        <div className="w-[715px] h-auto">
          <div className="w-[715px] h-[184px] dark:bg-black flex items-center justify-center space-x-3 relative">
            <div>
              <div className="relative">
                <img
                  src={imagePreview}
                  className="w-[122px] h-[122px] rounded-full object-cover"
                  alt="Profile"
                />
                <label className="bg-[#FAF1E6] dark:bg-gray-700 p-2 rounded-full absolute bottom-0 right-0 cursor-pointer">
                  <IoCameraReverseOutline size={20} className="text-gray-800 dark:text-gray-200" />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
            </div>
            <div className="text-[20px] text-black dark:text-[#e0d8c9]">
              <h1>{fullName}</h1>
            </div>
          </div>

          <div className="flex items-center justify-center space-x-5 py-7 text-[20px] font-[500] relative">
            <div className="relative">
              <h1
                className={`cursor-pointer mt-2 ${
                  activeSection === "editProfile" ? "text-[#00BF63] dark:text-[#00a357]" : "text-gray-700 dark:text-gray-300"
                }`}
                onClick={() => setActiveSection("editProfile")}
              >
                Edit Profile
              </h1>
              {activeSection === "editProfile" && (
                <div className="h-[2px] bg-[#00BF63] dark:bg-[#00a357] w-full mt-1"></div>
              )}
            </div>
            <div className="relative">
              <h1
                className={`cursor-pointer mt-2 ${
                  activeSection === "changePassword" ? "text-[#00BF63] dark:text-[#00a357]" : "text-gray-700 dark:text-gray-300"
                }`}
                onClick={() => setActiveSection("changePassword")}
              >
                Change Password
              </h1>
              {activeSection === "changePassword" && (
                <div className="h-[2px] bg-[#00BF63] dark:bg-[#00a357] w-full mt-1"></div>
              )}
            </div>
          </div>

          {activeSection === "editProfile" && (
            <div className="dark:bg-black px-32 pt-3">
              <h1 className="text-center py-3 text-[20px] font-[500] text-gray-900 dark:text-white">
                Edit Your Profile
              </h1>
              {error && <p className="text-red-500 text-center">{error}</p>}
              {success && <p className="text-green-500 text-center">{success}</p>}
              <form onSubmit={handleProfileUpdate}>
                <div className="pt-2">
                  <h1 className="text-[18px] font-[500] mb-2 mt-3 text-gray-800 dark:text-gray-200">
                    Full Name
                  </h1>
                  <input
                    type="text"
                    className="w-full h-[40px] border border-gray-400 dark:border-gray-600 rounded-md text-[#364636] dark:text-gray-200 bg-gray-50 dark:bg-gray-950 pl-3"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="pt-2">
                  <h1 className="text-[18px] font-[500] mb-2 mt-3 text-gray-800 dark:text-gray-200">
                    Email
                  </h1>
                  <input
                    type="email"
                    className="w-full h-[40px] border border-gray-400 dark:border-gray-600 rounded-md text-[#364636] dark:text-gray-200 bg-gray-100 dark:bg-gray-800 pl-3 cursor-not-allowed"
                    value={email}
                    readOnly
                    placeholder="Enter your email"
                  />
                </div>
                <div className="flex items-center justify-center">
                  <button
                    type="submit"
                    className="bg-black w-full dark:bg-white text-[#FAF1E6] dark:text-black font-[500] uppercase px-20 py-2 rounded-md my-10 hover:bg-zinc-900 cursor-pointer dark:hover:bg-gray-200 transition-colors"
                    disabled={isProfileLoading}
                  >
                    {isProfileLoading ? "Saving..." : "Save & Changes"}
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeSection === "changePassword" && (
            <div className="dark:bg-black px-32 pt-3">
              <h1 className="text-center py-3 text-[20px] font-[500] text-gray-900 dark:text-white">
                Change Password
              </h1>
              {error && <p className="text-red-500 text-center">{error}</p>}
              {success && <p className="text-green-500 text-center">{success}</p>}
              <form onSubmit={handlePasswordChange}>
                <div className="pt-2">
                  <h1 className="text-[16px] mb-2 mt-3 font-[500] text-gray-800 dark:text-gray-200">
                    Current Password
                  </h1>
                  <div className="relative">
                    <input
                      type={showCurrentPassword ? "text" : "password"}
                      className="w-full h-[40px] border border-gray-400 dark:border-gray-600 rounded-md text-[#364636] dark:text-gray-200 bg-gray-50 dark:bg-gray-950 pl-3"
                      placeholder="****************"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={toggleCurrentPassword}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600 dark:text-gray-300"
                    >
                      {showCurrentPassword ? <FaEye size={16} /> : <FaEyeSlash size={16} />}
                    </button>
                  </div>
                </div>
                <div className="pt-2">
                  <h1 className="text-[16px] mb-2 mt-3 font-[500] text-gray-800 dark:text-gray-200">
                    New Password
                  </h1>
                  <div className="relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      className="w-full h-[40px] border border-gray-400 dark:border-gray-600 rounded-md text-[#364636] dark:text-gray-200 bg-gray-50 dark:bg-gray-950 pl-3"
                      placeholder="*****************"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={toggleNewPassword}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600 dark:text-gray-300"
                    >
                      {showNewPassword ? <FaEye size={16} /> : <FaEyeSlash size={16} />}
                    </button>
                  </div>
                </div>
                <div className="pt-2">
                  <h1 className="text-[16px] mb-2 mt-3 font-[500] text-gray-800 dark:text-gray-200">
                    Confirm Password
                  </h1>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      className="w-full h-[40px] border border-gray-400 dark:border-gray-600 rounded-md text-[#364636] dark:text-gray-200 bg-gray-50 dark:bg-gray-950 pl-3"
                      placeholder="**********"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {/* hello */}
                    <button
                      type="button"
                      onClick={toggleConfirmPassword}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600 dark:text-gray-300"
                    >
                      {showConfirmPassword ? <FaEye size={16} /> : <FaEyeSlash size={16} />}
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <button
                    type="submit"
                    className="bg-black w-full dark:bg-white text-[#FAF1E6] dark:text-black font-[500] uppercase px-20 py-2 rounded-md my-10 hover:bg-zinc-900 cursor-pointer dark:hover:bg-gray-200 transition-colors"
                    disabled={isPasswordLoading}
                  >
                    {isPasswordLoading ? "Saving..." : "Save & Changes"}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Setting;