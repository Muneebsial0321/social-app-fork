import React, { Fragment, useEffect, useState } from "react";
import { BsCalendar4Event, BsSuitcaseLg } from "react-icons/bs";
import { CiVideoOn } from "react-icons/ci";
import { FaStar } from "react-icons/fa6";
import { LuPodcast } from "react-icons/lu";
import { MdKeyboardArrowRight } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { fetchProfile } from "../../API";
import PublicProfileVideos from "./PublicProfileVideos";
import PublicProfilePodcats from "./PublicProfilePodcats";
import PublicProfileEvents from "./PublicProfileEvents";
import PublicProfileJobs from "./PublicProfileJobs";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const ProfilePublic = ({ userId }) => {
  const [data_, setDATA] = useState({});
  const [activeTab, setActiveTab] = useState("");
  const [profile, setProfile] = useState({});
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const getUserId = () => {
    const str = document.cookie;
    const userKey = str.split('=')[1];
    return userKey;
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    console.log({ file });
    if (file) {
      formData.append('profilePic', file);
    }
    try {
      const response = await fetch(`${API_BASE_URL}/users/profilepic/${getUserId()}`, {
        credentials: 'include',
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      console.log('Profile updated:', data);
      await fetchProfileData(); // Refresh profile data after upload
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const createChatRoom = () => { console.log("creating chatroom"); };

  const fetchProfileData = async () => {
    try {
      const result = await fetchProfile(getUserId());
      setProfile(result.user);
      setDATA(result.data);
      console.log("single user data", result);
      console.log({ data_ });
      return result;
    } catch (error) {
      console.error("Fetching profile data error:", error);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  // Check if the current user is viewing their own profile
  const isCurrentUser = userId === getUserId();

  return (
    <Fragment>
      <div className="bg-white h-full w-full">
        <div className="w-full md:w-[25%] h-auto md:h-[6%] flex items-center gap-3 ps-3">
          <p className="text-lg flex items-center px-3">Profile</p>
        </div>
        <div className="flex flex-col md:flex-row justify-center h-auto md:h-[32%] mt-4 md:mt-0">
          <div className="flex flex-col md:flex-row gap-2 w-full md:w-[75%] items-center">
            <div className="rounded-full flex justify-center md:justify-end w-[60%] md:w-[40%] relative">
              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
                id="fileInput"
              />
              <label htmlFor="fileInput" className="cursor-pointer">
                <img
                  className="rounded-full w-[100px] h-[100px] md:w-[120px] md:h-[120px] object-cover"
                  src={profile.picUrl} // Fallback URL
                  alt="img"
                />
                <FaPlus className="absolute lg:bottom-2 -bottom-3 md:bottom-1 text-white text-xl p-1 bg-blue-700 rounded-full" />
              </label>
            </div>
            <div className="py-3 px-4 md:px-6 w-full md:w-[60%]">
              <h1 className="text-lg md:text-xl">{profile.name}</h1>
              <div className="flex py-1 space-x-2">
                <FaStar className="text-[#FFDD55] text-sm md:text-lg" />
                <FaStar className="text-[#FFDD55] text-sm md:text-lg" />
                <FaStar className="text-[#FFDD55] text-sm md:text-lg" />
                <FaStar className="text-[#FFDD55] text-sm md:text-lg" />
                <FaStar className="text-[#FFDD55] text-sm md:text-lg" />
                <h1 className="text-xs md:text-sm">4.7 out of 5</h1>
              </div>
              <p className="text-xs md:text-sm opacity-65">1,478 global rating</p>
              <div className="flex text-blue-600 text-xs md:text-sm py-2">
                <Link to='/personaldetails'>view personal info</Link>
                <MdKeyboardArrowRight className="text-xl md:text-2xl" />
              </div>
              <div className="flex gap-2 flex-wrap">
                {/* Conditionally render buttons */}
                {isCurrentUser ? (
                  <>
                    <button
                      className="px-6 py-2 rounded-2xl  text-lg bg-[#F6F6FF]"
                      onClick={handleSubmit}
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={() => console.log(profile)}
                      className="px-6 py-2 rounded-2xl text-lg text-white bg-[#6165F3]"
                    >
                      Edit Profile 
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="px-6 py-2 rounded-2xl  text-lg bg-[#F6F6FF]"
                      onClick={createChatRoom}
                    >
                      Message
                    </button>
                    <button
                      className="px-6 py-2 rounded-2xl text-lg text-white bg-[#6165F3]"
                    >
                      Subscribe
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex text-[25px] items-center justify-center border-t-[2px] h-[8%]">
          <div className="w-[50%] flex justify-between py-2">
            <CiVideoOn
              className="cursor-pointer opacity-70"
              onClick={() => setActiveTab("Video")}
            />
            <LuPodcast
              className="cursor-pointer opacity-70"
              onClick={() => setActiveTab("Podcast")}
            />
            <BsCalendar4Event
              className="cursor-pointer opacity-70"
              onClick={() => setActiveTab("Event")}
            />
            <BsSuitcaseLg
              className="cursor-pointer opacity-70"
              onClick={() => setActiveTab("Job")}
            />
          </div>
        </div>
        <section className="h-[54%] w-full overflow-y-scroll Podcast_Top_Videos">
          {activeTab === "Video" && <PublicProfileVideos videos={data_.videos} />}
          {activeTab === "Podcast" && <PublicProfilePodcats podcast={data_.podcast} />}
          {activeTab === "Event" && <PublicProfileEvents events={data_.events} />}
          {activeTab === "Job" && <PublicProfileJobs jobs={data_.jobs} />}
        </section>
      </div>
    </Fragment>
  );
};

export default ProfilePublic;
