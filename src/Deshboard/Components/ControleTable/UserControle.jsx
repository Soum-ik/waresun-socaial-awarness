import toast, { Toaster } from "react-hot-toast";
import { useBusiness } from "../../../hooks/useFetchData";
import DeshboardLayout from "../../layouts/masterLayout";
import { api } from "../../../libs/serverChecking";
import { relativeDate } from "../../../libs/utilits";

function UserControle() {

  const allUser = useBusiness(`${api.config}all-user`);
 console.log(allUser, "user");
 

  const handleDisable = async (id) => {
    try {
      const update = await fetch(`${api.config}all-user-update/${id}`, {
        method: "put"
      });
      const res = await update.json();
      if (res.status === 200) {
        toast.success("User Updated");
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
      const update = await fetch(`${api.config}delete-user/${id}`, {
        method: "delete"
      });
      const res = await update.json();
      if (res.status === 200) {
        toast.success("User Updated");
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
    <section classNameName="h-[100vh]">
      <div classNameName="flex justify-between mb-8">
        <h1 classNameName="text-3xl font-semibold">User management</h1>
      </div>

      <div>
        <div className="max-w-4xl mt-10 relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className=" w-full   text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">

            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  User name
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Logs Date
                </th>
                <th scope="col" className="px-6 py-3 text-end">
                  Status
                </th>
               
              </tr>
            </thead>
            <tbody>
              {allUser && allUser.map((user) => (
                <tr className={`bg-white  border-b ${user.disable && '!text-red-500'}  dark:bg-gray-800 dark:border-gray-700`}>
                  <th scope="row" className="px-6 py-4 font-medium   whitespace-nowrap dark:text-white">
                    {user.name}
                  </th>
                  <td className="px-6 py-4">
                    {user.email}

                  </td>
                  <td className="px-6 py-4">
                    {/* {CurrentDate} */}
                    {/* {relativeDate()} */}
                  </td>

                  <td className="px-6 py-4 text-right space-x-5 ">
                    <a onClick={() => handleDisable(user._id)} className=" bg-green-600 text-white cursor-pointer font-medium border p-2   dark:text-blue-500 hover:underline">{user.disable ? "Pending" : "Approved"}</a>
                    <a onClick={() => handleDelete(user._id)} className="bg-red-500 cursor-pointer font-medium border p-2 text-white dark:text-blue-500 hover:underline">Delete </a>
                  </td>

                </tr>
              ))
              }

            </tbody>
          </table>
        </div>

      </div>

    </section>
  </DeshboardLayout>;
}

export default UserControle;
