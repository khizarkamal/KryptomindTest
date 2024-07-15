import { useEffect, useState } from "react";
import "./App.css";
import { useAppDispatch, useAppSelector } from "./hooks";
import { fetchData, deleteUser } from "./features/dataSlice";
import EditIcon from "./assets/icons/edit.svg";
import TrashIcon from "./assets/icons/trash.svg";
import ConfirmationModal from "./modals/confirmationModal";
import { Link } from "react-router-dom";

function App() {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.data.data);
  const status = useAppSelector((state) => state.data.status);
  const error = useAppSelector((state) => state.data.error);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [userid, setUserId] = useState<any>(null);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchData());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  const handleDelete = (index: number) => {
    dispatch(deleteUser(index));
  };

  return (
    <section className="max-w-screen-lg p-8 bg-white rounded-md shadow-md mx-auto mt-8">
      {/* Table */}
      <div className="relative overflow-x-auto rounded-xl">
        <table className="w-full rounded-lg text-sm text-left text-gray-500 border border-gray-100">
          <thead className="text-xs uppercase bg-blue-100 text-blue-600">
            <tr>
              <th scope="col" className="px-6 py-3 border border-gray-100">
                Name
              </th>
              <th scope="col" className="px-6 py-3 border border-gray-100">
                Picture
              </th>
              <th scope="col" className="px-6 py-3 border border-gray-100">
                Email
              </th>
              <th scope="col" className="px-6 py-3 border border-gray-100">
                Phone
              </th>
              <th scope="col" className="px-6 py-3 border border-gray-100"></th>
            </tr>
          </thead>
          <tbody>
            {data?.results?.map((result: any, index: number) => {
              return (
                <tr key={index} className="bg-white">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap border border-gray-100"
                  >
                    {result?.name?.first} {result?.name?.last}
                  </th>
                  <td className="w-24 h-20 border border-gray-100 p-1  rounded-md md:w-32 md:h-24">
                    <img
                      loading="lazy"
                      src={result?.picture?.large}
                      className="w-full h-full object-cover aspect-square rounded-xl"
                      alt="image"
                    />
                  </td>
                  <td className="px-6 py-4 border border-gray-100">
                    {result?.email}
                  </td>
                  <td className="px-6 py-4 border border-gray-100">
                    {result?.cell}
                  </td>
                  <td className="flex gap-4 px-6 py-4 border border-b-0 border-gray-100 ">
                    <button className="text-blue-500 inline-block">
                      {/* <img src={EditIcon} alt="editIcon" /> */}
                      <Link className=" inline-block" to={"/edit"}>
                        Edit
                      </Link>
                    </button>
                    <button
                      onClick={() => {
                        setOpenDeleteModal(true);
                        setUserId(result?.login?.uuid);
                      }}
                      className="text-blue-500 inline-block"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <ConfirmationModal
        open={openDeleteModal}
        setOpenModal={() => setOpenDeleteModal(false)}
        handleDelete={handleDelete}
      />
    </section>
  );
}

export default App;
