import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../request";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const textLength = 500;
const Home = ({ token }) => {
  const [canEdit, setCanEdit] = useState(false);
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [notes, setNotes] = useState([]);
  const [editId, setEditId] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    {
      token == null && navigate("/login");
    }
    getNotes();
    return () => {};
  }, []);

  const getNotes = () => {
    api.defaults.headers["authorization"] = token;
    api.get("/get-notes").then((res) => {
      if (res.status == 200) {
        setNotes(res.data.notes);
      }
    });
  };

  const deleteNote = () => {
    MySwal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonColor: "red",
      denyButtonColor: "gray",
      denyButtonText: `Don't Forgive`,
      confirmButtonText: "Forgive",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        MySwal.fire("Saved!", "", "success");
      } else if (result.isDenied) {
        MySwal.fire("Changes are not saved", "", "info");
      }
    });
  };

  const addNote = () => {
    const data = {
      title,
      details,
    };
    api.post(`/add-note`, data).then((res) => {
      if (res.status == 200) {
        getNotes();
        MySwal.fire({
          text: res.data.message,
          icon: "success",
          timer: 1000,
          showConfirmButton: false,
          position: "top-end",
        });
        setDetails("");
        setEditId("");
      }
    });
  };

  const isEdited = () => {
    const data = {
      title,
      details,
    };
    api.put(`/edit-note/${editId}`, data).then((res) => {
      if (res.status == 200) {
        getNotes();
        MySwal.fire({
          text: res.data.message,
          timer: 1000,
          icon: "success",
          showConfirmButton: false,
          position: "top-end",
        });
        setCanEdit(false);
        setTitle("");
        setDetails("");
        setEditId("");
      }
    });
  };

  const cancelEdit = () => {
    setCanEdit(false);
    setTitle("");
    setDetails("");
    setEditId("");
  };

  const editNoteBtn = (item) => {
    setCanEdit(true);
    setTitle(item.title);
    setDetails(item.details);
    setEditId(item._id);
  };
  return (
    <section className="text-gray-600 body-font relative ">
      <div className="container px-5 py-24 mx-auto flex flex-nowrap space-x-2">
        <div className="lg:w-2/3 md:w-1/2 flex flex-wrap ">
          {notes.map((item) => {
            return (
              <div
                key={item._id}
                className="lg:w-1/3 md:w-full bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md backdrop-filter backdrop-blur-lg bg-opacity-80"
              >
                <div className="flex-1 flex flex-col">
                  <label className="leading-7 text-lg text-gray-500">
                    {item.title}
                  </label>

                  <label className="leading-7 text-sm text-black">
                    {item.details.slice(0, textLength)}
                    {item.details.length >= textLength && "..."}
                  </label>
                </div>
                <div className="flex space-x-2 justify-end">
                  <button
                    onClick={() => editNoteBtn(item)}
                    className="bg-gray-400 w-max p-1 rounded px-2 text-gray-100"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteNote(item)}
                    className="bg-red-400 w-max p-1 rounded px-2 text-gray-100"
                  >
                    Forgive
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <div className="lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md backdrop-filter backdrop-blur-lg bg-opacity-20">
          <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">
            {canEdit ? "Edit Note" : " Add Note"}
          </h2>

          <div className="relative mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">
              Title
            </label>
            <input
              type="text"
              id="text"
              name="text"
              value={title}
              autoComplete="off"
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded bg-white backdrop-filter backdrop-blur-lg bg-opacity-20 border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-black py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="relative mb-4">
            <label
              htmlFor="message"
              className="leading-7 text-sm text-gray-600"
            >
              Details
            </label>
            <textarea
              id="message"
              name="message"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="w-full bg-white rounded border backdrop-filter backdrop-blur-lg bg-opacity-20 border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-black py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
            />
          </div>
          {canEdit ? (
            <div className="flex space-x-2">
              <button
                onClick={isEdited}
                className="flex-1 text-white bg-gray-500 border-0 py-2 px-6 focus:outline-none hover:bg-gray-600 rounded text-lg"
              >
                Update Note
              </button>
              <button onClick={cancelEdit} className="text-white px-4">
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={addNote}
              className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            >
              Add Note
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

const EditDiv = ({ isEdited, item }) => {
  return (
    <div className="bg-white rounded-lg p-4 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md backdrop-filter backdrop-blur-lg bg-opacity-20">
      <h2 className="text-gray-900 text-lg mb-1 font-medium title-font self-start">
        Edit Note
      </h2>

      <div className="relative mb-4 flex flex-col">
        <label
          htmlFor="email"
          className=" leading-7 text-sm text-gray-600 text-left"
        >
          Title
        </label>
        <input
          type="text"
          id="text"
          name="text"
          className="w-full rounded bg-white backdrop-filter backdrop-blur-lg bg-opacity-20 border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-black py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
      </div>
      <div className="relative mb-4 flex flex-col">
        <label
          htmlFor="message"
          className="leading-7 text-sm text-gray-600 text-left"
        >
          Details
        </label>
        <textarea
          id="message"
          name="message"
          className="w-full bg-white rounded border backdrop-filter backdrop-blur-lg bg-opacity-20 border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-black py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
        />
      </div>
      <button
        onClick={isEdited}
        className="text-white bg-gray-400 border-0 py-2 px-6 focus:outline-none hover:bg-gray-600 rounded text-lg"
      >
        Update Note
      </button>
    </div>
  );
};
export default Home;
