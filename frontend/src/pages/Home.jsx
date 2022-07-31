import React from "react";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../request";
import { useSelector } from "react-redux";
import { Input, MySwal, swal } from "../components";

const textLength = 500;
const Home = () => {
  const stateData = useSelector((state) => state.auth);

  const previousBtn = useRef()
  const nextBtn = useRef()

  const [canEdit, setCanEdit] = useState(false);
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [notes, setNotes] = useState([]);
  const [editId, setEditId] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    {
      stateData.loggedIn == false ? navigate("/login") : getNotes();
    }
    return () => {};
  }, []);

  const getNotes = () => {
    api.get("/get-notes").then((res) => {
      if (res.status == 200) {
        setNotes(res.data.notes);
      }
    });
  };

  const deleteNote = (id) => {
    MySwal.fire({
      title: "Do you want to delete this note?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonColor: "red",
      denyButtonColor: "gray",
      denyButtonText: `Don't Forgive 😢`,
      confirmButtonText: "Forgive 🤗",
    }).then((result) => {
      if (result.isConfirmed) {
        api.delete(`/delete-note/${id}`).then((res) => {
          if (res.status == 200) {
            swal(res.data.message, "success");
            getNotes();
          }
        });
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
        swal(res.data.message, "success");
        cancelEdit()
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
        swal(res.data.message, "success");
        cancelEdit()
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

  const searchNoteTxt = (value) => {
    if (value == "") {
      getNotes();
    } else {
      api.get(`/get-note?s=${value}`).then((res) => {
        if (res.status == 200) {
          setNotes(res.data.notes);
        }
      });
    }
  };
  return (
    <section className="text-gray-600 body-font relative ">
      <div className="container px-5 py-3 lg:py-24 mx-auto lg:flex lg:space-x-2">
        <div className="lg:w-2/3 flex flex-wrap space-y-2">
          <div className="bg-white rounded-lg p-4 flex justify-between md:ml-auto w-full mt-2 lg:mt-0 relative z-10 shadow-md backdrop-filter backdrop-blur-lg bg-opacity-80">
            <span className="text-xl">Notes</span>
            <div className="space-x-2">
              <input
                type="text"
                className="rounded outline outline-1 outline-slate-400 px-1 lg:w-auto w-32"
                placeholder="search note"
                onChange={(e) => searchNoteTxt(e.target.value)}
              />
              <button className="opacity-100 outline outline-1 px-3 outline-slate-400 rounded hover:bg-slate-400 hover:text-white ease-linear duration-200">
                Previous
              </button>
              <button className="opacity-100 outline outline-1 px-3 outline-slate-400 rounded hover:bg-slate-400 hover:text-white ease-linear duration-200">
                Next
              </button>
            </div>
          </div>
          {notes.map((item) => {
            return (
              <div
                key={item._id}
                className="bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-2 lg:mt-0 relative z-10 shadow-md backdrop-filter backdrop-blur-lg bg-opacity-80"
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
                    onClick={() => deleteNote(item._id)}
                    className="bg-red-400 w-max p-1 rounded px-2 text-gray-100"
                  >
                    Forgive
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <div className="lg:w-1/3 bg-white rounded-lg p-8 flex flex-col lg:mt-0 mt-2 md:ml-auto w-full relative z-10 shadow-md backdrop-filter backdrop-blur-lg bg-opacity-20">
          <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">
            {canEdit ? "Edit Note" : " Add Note"}
          </h2>

          <Input
            text={title}
            type={"text"}
            label={"Title"}
            updateText={setTitle}
          />
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
