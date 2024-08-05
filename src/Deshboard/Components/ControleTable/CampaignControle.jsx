import toast, { Toaster } from "react-hot-toast";
import { useBusiness } from "../../../hooks/useFetchData";
import DeshboardLayout from "../../layouts/masterLayout";
import { api } from "../../../libs/serverChecking";

function CampaignControle() {
  const allcampains = useBusiness(`${api.config}campains-deshboard`);



  const handleDisable = async (id) => {
    try {
      const update = await fetch(`${api.config}campains-deshboard-update/${id}`, {
        method: "put"
      });
      const res = await update.json();
      console.log(res);
      if (res.status === 200) {
        toast.success("Campains post Updated");
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


  const handleDelete = async (id) => {
    try {
      const update = await fetch(`${api.config}delete-post/${id}`, {
        method: "delete"
      });
      const res = await update.json();
      console.log(res);
      if (res.status === 200) {
        toast.success("Campains post Deleted");
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
        <h1 className="text-3xl font-semibold">Campaign management</h1>
      </div>

      <div>
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table class=" w-full   text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">

            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>

                <th scope="col" class="px-6 py-3">
                  Campaign Image
                </th>
                <th scope="col" class="px-6 py-3">
                  Name
                </th>
                <th scope="col" class="px-6 py-3">
                  Title
                </th>
                <th scope="col" class="px-6 py-3">
                  Description
                </th>
                <th scope="col" class="px-6 py-3">
                  Start Date
                </th>
                <th scope="col" class="px-6 py-3">
                  End Date
                </th>
                <th scope="col" class="px-6 py-3">
                  Cetagory type
                </th>
                <th scope="col" class="px-6 py-3">
                  Status
                </th>

                <th scope="col" class="px-6 py-3">
                  <span class="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {allcampains.map((campains) => (
                <tr class={`bg-white ${campains.disable && '!text-red-500'} border-b dark:bg-gray-800 dark:border-gray-700`}>
                  <th scope="row" class="px-6 py-4 font-medium  whitespace-nowrap dark:text-white">
                    <img src={campains.image} alt="" srcset="" className=" size-10" />
                  </th>
                  <th scope="row" class="px-6 py-4 font-medium  whitespace-nowrap dark:text-white">
                    {campains.name}
                  </th>
                  <td class="px-6 py-4">

                    {campains.title}
                  </td>
                  <td class="px-6 py-4 line-clamp-4">

                    {campains.des}
                  </td>
                  <td class="px-6 py-4">

                    {campains.startDate}
                  </td>
                  <td class="px-6 py-4">

                    {campains.endDate}
                  </td>
                  <td class="px-6 py-4">

                    {campains.goals}
                  </td>


                  <td class="px-6 py-4 text-right space-x-5">
                    <a onClick={() => handleDisable(campains._id)} className=" cursor-pointer font-medium border p-2 text-blue-600 dark:text-blue-500 hover:underline">{campains.disable ? "Pending" : "Approved"}</a>
                    <a onClick={() => handleDelete(campains._id)} className=" cursor-pointer font-medium border p-2 text-blue-600 dark:text-blue-500 hover:underline">Delete</a>
                  </td>
                </tr>
              ))}

            </tbody>
          </table>
        </div>

      </div>

    </section>
  </DeshboardLayout>;
}

export default CampaignControle;
