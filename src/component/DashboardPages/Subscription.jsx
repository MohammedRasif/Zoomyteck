
import {
  useCancelSubscriptionMutation,
  useGetPaymentInfoQuery,
} from "../../Redux/feature/ApiSlice";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Subscription = () => {
  const {
    data: billingInfo,
    isLoading,
    isError,
    refetch,
  } = useGetPaymentInfoQuery();

  const [cancelSubscription, { isLoading: isCancelling }] =
    useCancelSubscriptionMutation();

  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleCancelSubscription = async () => {
    try {
      const response = await cancelSubscription().unwrap();
      console.log(response);
      toast.success("Subscription cancelled successfully.", {
        position: "top-right",
        autoClose: 3000,
      });
      setIsRefreshing(true);
      await refetch(); // Fetch latest data
    } catch (error) {
      toast.error("Failed to cancel subscription. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
      console.error("Cancel subscription error:", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const isLoadingState = isLoading || isRefreshing;

  return (
    <div className="dark:bg-black min-h-screen container mx-auto pt-8 px-4">
      <ToastContainer position="top-right" autoClose={3000} />

      {isLoadingState && (
        <div className="min-h-screen flex justify-center items-center">
          <p className="text-xl text-black dark:text-white">
            Loading subscription info...
          </p>
        </div>
      )}

      {isError && (
        <div className="min-h-screen flex justify-center items-center">
          <p className="text-xl text-red-600 dark:text-red-400">
            Failed to load billing info.
          </p>
        </div>
      )}

      {!isLoadingState && !isError && !billingInfo?.subscription_plan_name && (
        <div className="min-h-screen flex justify-center items-center">
          <p className="text-2xl font-semibold text-gray-800 dark:text-white">
            No pack activated.
          </p>
        </div>
      )}

      {!isLoadingState && !isError && billingInfo?.subscription_plan_name && (
        <>
          <h1 className="text-3xl font-semibold text-black dark:text-white mb-8">
            Manage Subscription
          </h1>

          {/* Subscription Plan */}
          <div className="bg-white dark:bg-black border border-gray-300 dark:border-gray-800 py-6 px-6 md:px-12 rounded-lg mb-6">
            <h2 className="text-xl font-medium text-black dark:text-white">
              Subscription Plan:{" "}
              <span className="text-gray-600 dark:text-gray-400">
                {billingInfo.subscription_plan_name}
              </span>
            </h2>
          </div>

          {/* Billing Info */}
          <div className="bg-white dark:bg-black border border-gray-300 dark:border-gray-800 py-6 px-6 md:px-12 rounded-lg">
            <h2 className="text-2xl font-bold text-black dark:text-white mb-6">
              Billing Information
            </h2>
            <div className="space-y-4">
              <h3 className="text-md font-medium text-black dark:text-white">
                Name:{" "}
                <span className="text-gray-600 dark:text-gray-400">
                  {billingInfo.name || "N/A"}
                </span>
              </h3>
              <h3 className="text-md font-medium text-black dark:text-white">
                Email:{" "}
                <span className="text-gray-600 dark:text-gray-400">
                  {billingInfo.email || "N/A"}
                </span>
              </h3>
              <h3 className="text-md font-medium text-black dark:text-white">
                Purchase Date:{" "}
                <span className="text-gray-600 dark:text-gray-400">
                  {billingInfo.purchase_date
                    ? new Date(billingInfo.purchase_date).toLocaleDateString()
                    : "N/A"}
                </span>
              </h3>
              <h3 className="text-md font-medium text-black dark:text-white">
                Expiry Date:{" "}
                <span className="text-gray-600 dark:text-gray-400">
                  {billingInfo.expiry_date
                    ? new Date(billingInfo.expiry_date).toLocaleDateString()
                    : "N/A"}
                </span>
              </h3>
            </div>
          </div>

          {/* Cancel Subscription Button */}
          <div className="mt-8 text-center">
            <button
              onClick={handleCancelSubscription}
              disabled={isCancelling}
              className="text-xl bg-black dark:bg-white text-white dark:text-black rounded-md px-6 py-2 hover:bg-gray-800 dark:hover:bg-gray-300 font-medium transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isCancelling ? "Cancelling..." : "Cancel Subscription"}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Subscription;
