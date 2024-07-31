import toast, { Toaster } from "react-hot-toast";
import { useBusiness } from "../../../hooks/useFetchData";
import DeshboardLayout from "../../layouts/masterLayout";
import { api } from "../../../libs/serverChecking";


function BusinessControle() {



  const allbusiness = useBusiness(`${api.config}business-deshboard`);

  const handleDisable = async (id) => {
    try {
      const update = await fetch(`${api.config}business-deshboard-update/${id}`, {
        method: "put"
      });
      const res = await update.json();
      if (res.status === 200) {
        toast.success("Business post Updated");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        toast.error("Something want wrong");

      }
    } catch (error) {
      console.log(error);
    }
  };

  return <DeshboardLayout>

    <Toaster position="top-right" />

    <section className="h-[100vh]">
      <div className="flex justify-between mb-8">
        <h1 className="text-3xl font-semibold">Business management</h1>
      </div>

      <div>
        <div class=" relative overflow-x-auto shadow-md sm:rounded-lg">
          <table class=" w-full   text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">

            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Business logo
                </th>
                <th scope="col" class="px-6 py-3">
                  Business name
                </th>
                <th scope="col" class="px-6 py-3">
                  Owner
                </th>
                <th scope="col" class="px-6 py-3">
                  Post Date
                </th>

                <th scope="col" class="px-6 py-3">
                  Products/Services
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {allbusiness.map((business) => {
                return (
                  <tr class={`bg-white  border-b dark:bg-gray-800 dark:border-gray-700 ${business.disable && '!text-red-500'}`}>
                    <th scope="row" class="px-6 py-4 font-medium  whitespace-nowrap dark:text-white">
                      <img src={business.logoOrProductImages} className="size-10" alt="" srcset="" />
                    </th>
                    <td class="px-6 py-4">
                      {business.name}
                    </td>
                    <th scope="row" class="px-6 py-4 font-medium   whitespace-nowrap dark:text-white">
                      {business.owner}
                    </th>
                    <th scope="row" class="px-6 py-4 font-medium   whitespace-nowrap dark:text-white">
                      2024-07-31
                    </th>
                    <td class="px-6 py-4">
                      {business.productsOrServices}
                    </td>

                    <td class="px-6 py-4 text-right">
                      <a onClick={() => handleDisable(business._id)} className=" cursor-pointer font-medium border p-2 text-blue-600 dark:text-blue-500 hover:underline">{business.disable ? "Pending" : "Approved"}</a>
                    </td>
                  </tr>
                );
              })}

            </tbody>
          </table>
        </div>

      </div>

    </section>
  </DeshboardLayout>;
}

export default BusinessControle;
