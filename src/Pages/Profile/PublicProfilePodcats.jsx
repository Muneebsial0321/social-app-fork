import React, { Fragment, useEffect, useState } from "react";
import { CiPlay1, CiTrash } from "react-icons/ci";
import { FaRegShareFromSquare } from "react-icons/fa6";
import { IoBookmarkOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { deletePodcast } from "../../DeleteAPI";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'; // Importing Toastify
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for Toastify

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const ApplePodcast = (props) => {
  const [podcast, setPodcast] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [visibleId, setVisibleId] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleDeleteClick = (e, id) => {
    e.stopPropagation(); // Prevent navigation when clicking delete icon
    setDeleteItemId(id);
    setIsDeleteModalOpen(true);
  };

  const getUserId = () => {
    const str = document.cookie;
    const userKey = str.split('=')[1];
    return userKey;
  };

  const handleDeleteConfirm = async () => {
    if (deleteItemId) {
      try {
        console.log(`Attempting to delete podcast with id: ${deleteItemId}`);
        await deletePodcast(deleteItemId);
        toast.success('Podcast deleted successfully!'); // Using toast for success
        setPodcast(podcast.filter((item) => item._id !== deleteItemId));
      } catch (error) {
        console.error('Error deleting podcast:', error);
        toast.error('Error deleting podcast.'); // Using toast for error
      }
      setIsDeleteModalOpen(false);
    }
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
    setDeleteItemId(null);
  };

  const navigate = useNavigate();

  useEffect(() => {
    console.log("podcasts single user section");
    console.log(props.podcast);

    // Simulate loading time
    setLoading(true);
    setTimeout(() => {
      setPodcast(props.podcast);
      setLoading(false);
      console.log({ podcast });
    }, 1000);
  }, [props.podcast]);

  const handleShare = async (e) => {
    e.stopPropagation();
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Check out this podcast!",
          url: window.location.href,
        });
        toast.success('Share successful!'); // Using toast for success
      } catch (error) {
        console.error('Error sharing:', error);
        toast.error('Error sharing podcast.'); // Using toast for error
      }
    } else {
      toast.warn('Web Share API is not supported in your browser.'); // Using toast for warning
    }
  };

  const formatDuration = (duration) => {
    const seconds = Math.floor(duration / 1000);
    
    if (seconds < 60) {
      return `${seconds} seconds`;
    } else {
      const minutes = Math.floor(seconds / 60);
      return `${minutes} min${minutes > 1 ? 's' : ''}`;
    }
  };

  const user_id = getUserId();
  
  const handleSaveToWishlist = async (podcastId) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/wishlist`, {
        wishItemType: 'podcast',
        wishItemId: podcastId,
        userId: user_id, 
      });
      console.log('Wishlist item saved:', response.data);
      toast.success('Podcast saved to wishlist!'); // Using toast for success
    } catch (error) {
      console.error('Error saving to wishlist:', error);
      toast.error('Could not save to wishlist. Please try again.'); // Using toast for error
    }
  };

  return (
    <Fragment>
      <div className="overflow-y-scroll Podcast_Top_Videos h-full">
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <>
            {podcast.length === 0 ? (
              <div className="text-center">No podcasts available.</div>
            ) : (
              <div className="flex flex-wrap gap-1 w-[95%] mx-auto Podcast_Top_Videos pt-2">
                {podcast.map((elm, ind) => (
                  <div
                    key={ind}
                    className="md:h-[45vh] h-[37vh] w-[32.4%] rounded-lg border relative text-white PPPodcast"
                    onMouseEnter={() => setVisibleId(elm._id)}
                    onMouseLeave={() => setVisibleId(null)}
                    onClick={() => navigate(`/podcastdetails`, { state: { id: elm._id } })}
                  >
                    <IoBookmarkOutline
                      className="absolute right-2 top-4 text-2xl cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent triggering onClick of parent div
                        handleSaveToWishlist(elm._id);
                      }}
                    />
                    <div className="absolute bottom-1 px-2 w-full">
                      <div className="VideosBgBlured rounded-lg px-3 pt-5">
                        <p className="text-2xl font-medium">{elm.episodeTitle}</p>
                        <p className="text-sm">{elm.user ? elm.user.name : ""}</p>
                        <div className="flex justify-between">
                          <p className="flex items-center gap-1 text-md">
                            <CiPlay1 className="text-lg" />
                            {formatDuration(elm.podcastDuration)}
                          </p>
                          <p onClick={handleShare}>
                            <FaRegShareFromSquare className="text-2xl -mt-3 cursor-pointer" />
                          </p>
                        </div>
                      </div>
                    </div>
                    <img
                      src={elm.picUrl || "/placeholder.jpg"}
                      alt={`Img-${ind}`}
                      className="h-full w-full rounded-lg"
                    />
                    {visibleId === elm._id && (
                      <div className="absolute top-14 right-2 flex flex-col space-y-2">
                        <CiTrash
                          className="text-red-600 text-3xl cursor-pointer hover:text-red-600"
                          onClick={(e) => handleDeleteClick(e, elm._id)}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Delete Modal */}
        {isDeleteModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded-lg">
              <p>Are you sure you want to delete this podcast?</p>
              <div className="flex justify-end mt-4">
                <button
                  className="mr-2 bg-gray-500 text-white px-4 py-2 rounded"
                  onClick={handleDeleteCancel}
                >
                  Cancel
                </button>
                <button
                  className="linear_gradient text-white px-4 py-2 rounded"
                  onClick={handleDeleteConfirm}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <ToastContainer /> {/* Include ToastContainer for rendering notifications */}
    </Fragment>
  );
};

export default ApplePodcast;
