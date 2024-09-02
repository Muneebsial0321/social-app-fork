import React, { Fragment, useState } from "react";
import Review from './Review'
import img1 from './image1.jpeg'
import img2 from './img2.jpeg'
import img3 from './img3.jpeg'
import img4 from './img4.jpeg'
import img5 from './img5.jpeg'





import {
  RiPlayCircleLine,
} from "react-icons/ri";
import { useNavigate, useParams } from "react-router-dom";
import { CiPlay1, CiSquareInfo, CiStar } from "react-icons/ci";
import { FaRegShareFromSquare } from "react-icons/fa6";
import { IoBookmarkOutline } from "react-icons/io5";
import Model from "../ModalReport/Model";
import { FaAngleLeft } from "react-icons/fa";

let guestData = [
  {
    img: img5,
    title: "Host",
  },
  {
    img: img2,
    title: "Guest",
  },
  {
    img: img5,
    title: "Guest",
  },
  {
    img: img4,
    title: "Guest",
  },
];

let similarPodcastData = [
  {
    img: img1,
    id: 1,
    categ: "Politics",
    userName: "Lily Williams",
    mint:'35 Mins'
  },
  {
    img: img4,
    id: 1,
    categ: "Politics",
    userName: "Lily Williams",
    mint:'35 Mins'

  },
  {
    img: img2,
    id: 1,
    categ: "Politics",
    userName: "Lily Williams",
    mint:'35 Mins'

  },
  {
    img: img3,
    id: 1,
    categ: "Politics",
    userName: "Lily Williams",
    mint:'35 Mins'

  },
  {
    img: img2,
    id: 1,
    categ: "Politics",
    userName: "Lily Williams",
    mint:'35 Mins'

  },
  {
    img: img5,
    id: 1,
    categ: "Politics",
    userName: "Lily Williams",
    mint:'35 Mins'

  },
  {
    img: img1,
    id: 1,
    categ: "Politics",
    userName: "Lily Williams",
    mint:'35 Mins'

  },
  {
    img: img1,
    id: 1,
    categ: "Politics",
    userName: "Lily Williams",
    mint:'35 Mins'

  },
  {
    img: img1,
    id: 1,
    categ: "Politics",
    userName: "Lily Williams",
    mint:'35 Mins'

  },
];

function SinglePodcastDetails() {
  let navigate = useNavigate();
  let data = useParams()
  let src ;


  if(data.img === 'image1.jpeg'){
    src = img1
  }
  else if(data.img === 'img2.jpeg'){
    src = img2
  }
  else if(data.img === 'img3.jpeg'){
    src = img3
  }
  else if(data.img === 'img4.jpeg'){
    src = img4
  }
  else if(data.img === 'img5.jpeg'){
    src = img5
  }


  const [revModOpen, setRevModOpen] = useState(false)
  const [repModOpen, setRepModOpen] = useState(false)



  return (
    <Fragment>
      <section className="bg-white h-full w-full relative px-6 overflow-y-scroll Podcast_Top_Videos">
      {revModOpen && <div className="h-full left-0 w-full absolute top-0 z-20 flex  justify-center items-center">
          <Review setRevModOpen={setRevModOpen} />
        </div>}
        {repModOpen && <div className="h-full w-full absolute top-0 left-0 z-20 flex  justify-center items-center">
          <Model setRepModOpen={setRepModOpen} />
        </div>}
        <div className="flex">
        <h4 className="flex items-center gap-3 md:ms-4 py-3">
          <FaAngleLeft
            className="cursor-pointer"
            onClick={() => navigate("/podcast")}
          />{" "}
          Podcast
        </h4>
        </div>
        <div className="flex w-full PCS_Flex sm:ps-6 gap-6">
          <img
            src={src}
            className="md:h-[35vh] h-[39vh] md:w-[33%] w-[40%]  sm:mx-auto rounded-xl"
            alt=""
          />
          <div className="w-[60%]  mx-auto PCS_Child1">
            <h1 className="text-xl font-semibold">Finance</h1>
            <p className="py-1 opacity-65">75 mins</p>
            <button className="flex items-center gap-3 border border-black px-3 pe-7 my-2 rounded-3xl">
              <RiPlayCircleLine /> 1 hr left
            </button>
            <div className="flex items-center gap-4">
              <CiSquareInfo className="text-2xl cursor-pointer" onClick={()=>setRepModOpen(true)}/>
              <FaRegShareFromSquare className="text-xl opacity-45 cursor-pointer" />
              <CiStar className="text-2xl cursor-pointer" onClick={()=>setRevModOpen(true)} />
              <p className="opacity-50">4.7 (571)</p>
            </div>
            <p className="lg:w-[75%] w-full opacity-50 text-[15px]">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Optio
              nam quo amet, inventore iste aspernatur accusantium dolorem
              blanditiis laboriosam, atquati provident!
            </p>
          </div>
        </div>
        <div className="flex gap-2 md:ps-6 mt-3 w-full overflow-x-scroll Podcast_Top_Videos">
          {guestData.map((elm, ind) => (
            <div
              key={ind}
              className="flex items-center justify-center flex-shrink-0 gap-3 py-2 my-2 rounded w-[100px] bg-gray-200"
            >
              <img
                src={elm.img}
                className="rounded-full h-[25px] w-[25px]"
                alt=""
              />
              <h1 className="text-md">{elm.title}</h1>
            </div>
          ))}
        </div>

          <p className="md:ps-6">Similar podcasts</p>
        <div className="md:ps-6 h-[40%] w-full">
            <div className="flex flex-wrap sm:justify-center justify-between sm:gap-1 gap-y-2 h-full w-full Podcast_Top_Videos mt-4">
              {similarPodcastData.map((elm, ind) => (
                <div
                  key={ind}
                  className="h-[40vh] sm:w-[32.4%] w-[49%] rounded-lg border relative"
                >
                <IoBookmarkOutline className="absolute text-white right-2 top-4 text-3xl"/>
                <div className="absolute bottom-1 text-white px-1 w-full">
                    {
                      <div className="VideosBgBlured rounded-lg px-3 py-3">
                      <p className="text-xl font-medium">{elm.categ}</p>
                      <p className="text-md opacity-60">{elm.userName}</p>
                      <div className="flex justify-between">
                      <p className="flex items-center gap-1 text-md"><CiPlay1/> {elm.mint}</p>
                      <p><FaRegShareFromSquare className="text-xl -mt-3"/></p>
                      </div>
                      </div>
                    }
                  </div>
                  <img
                    src={elm.img}
                    alt={`Img-${ind}`}
                    className="h-full w-full rounded-lg"
                  />
                </div>
              ))}
            </div>
        <br />
        </div>

      </section>
    </Fragment>
  );
}

export default SinglePodcastDetails;