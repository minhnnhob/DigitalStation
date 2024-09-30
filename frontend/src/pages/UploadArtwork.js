import React from "react";
import { useDispatch, useSelector } from "react-redux";
// import { setTitle, setDescription, setMedium, setSubjectMatter, setSoftwareUsed, setTags, addImage, updateImageCaption, updateImageFitting } from './artworkSlice';

const ArtworkUpload = () => {
  const dispatch = useDispatch();
  //   const { title, description, medium, subjectMatter, softwareUsed, tags, images } = useSelector(state => state.artwork);

  const uploadOptions = [
    { name: "HQ Images", icon: "🖼️" },
    { name: "Video Clip", icon: "🎬" },
    { name: "Video", icon: "📹" },
    { name: "Sketchfab", icon: "🎨" },
    { name: "Marmoset Viewer", icon: "👁️" },
    { name: "360 Pano", icon: "🌐" },
    { name: "Twinmotion", icon: "🏙️" },
  ];

  const mediumOptions = [
    "Digital 2D",
    "Digital 3D",
    "Animation",
    "Real-time",
    "Live Action CG/VFX",
    "3D Printing",
    "Traditional Ink",
    "Traditional Dry Media",
    "Traditional Paint",
    "Traditional Sculpture",
    "Mixed Media",
  ];

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        // dispatch(addImage({ url: event.target.result, caption: '', fitting: 'Fit in view' }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-bg-df text-gray-200 min-h-screen p-8">
      <main className="flex">
        <div className="w-2/3 pr-8">
          {/* <h1 className="text-3xl font-bold mb-4">Untitled</h1>

          <input
            type="text"
            placeholder="What is your artwork called?"
            className="w-full bg-gray-800 p-2 rounded mb-4"
            // value={title}
            // onChange={(e) => dispatch(setTitle(e.target.value))}
          /> */}
          {/* Title Input */}
          <div class="text-3xl font-bold mb-4">
            <label class="block text-gray-300 mb-4" for="artwork-title">
              Untitled
            </label>

            <div className=" w-full bg-[#4e4e5c] border-gray-700 rounded-sm pb-1">
              <label
                class="block text-gray-300 text-sm font-semibold p-1 pb-2 bg-[#303034] pl-4 "
                for="artwork-title"
              >
                Artwork Title
              </label>
              <input
                class="bg-gray-800 border border-gray-700 text-gray-200 text-sm rounded-sm w-[98%] placeholder-gray-500 m-2 p-2 "
                id="artwork-title"
                type="text"
                placeholder="What is your artwork called?"
              />
            </div>
          </div>

          {/*Upload comp  */}
          <div>
            <div className="flex space-x-4 mb-8 ">
              {uploadOptions.map((option) => (
                <button
                  key={option.name}
                  className="flex flex-col items-center bg-gray-800 p-2 rounded"
                >
                  <span className="text-2xl">{option.icon}</span>
                  <span className="text-sm">{option.name}</span>
                </button>
              ))}
            </div>

            <div className="border-2 border-dashed border-gray-700 p-8 text-center mb-8">
              <p>Upload media files</p>
              <p className="text-sm text-gray-500">or drag and drop here</p>
              <input
                type="file"
                onChange={handleImageUpload}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer text-blue-400 hover:text-blue-300"
              >
                Select files
              </label>
            </div>
          </div>



          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-gray-800 p-4 rounded">
              <img
                alt={`Uploaded `}
                className="w-full h-48 object-cover mb-2"
              />
              <textarea
                placeholder="Caption"
                className="w-full bg-gray-700 p-2 rounded mb-2"
              />
              <select className="w-full bg-gray-700 p-2 rounded">
                <option>Fit in view</option>
                <option>Fill view</option>
              </select>
            </div>
            {/* {images.map((image, index) => (
              <div key={index} className="bg-gray-800 p-4 rounded">
                <img src={image.url} alt={`Uploaded ${index + 1}`} className="w-full h-48 object-cover mb-2" />
                <textarea 
                  placeholder="Caption"
                  className="w-full bg-gray-700 p-2 rounded mb-2"
                  value={image.caption}
                  onChange={(e) => dispatch(updateImageCaption({ index, caption: e.target.value }))}
                />
                <select 
                  className="w-full bg-gray-700 p-2 rounded"
                  value={image.fitting}
                  onChange={(e) => dispatch(updateImageFitting({ index, fitting: e.target.value }))}
                >
                  <option>Fit in view</option>
                  <option>Fill view</option>
                </select>
              </div>
            ))} */}
          </div>

          <div className="bg-gray-800 p-4 rounded mb-8">
            <p>
              Would this project also make a great print?{" "}
              <span className="text-blue-400 cursor-pointer">
                Upload a print
              </span>
            </p>
          </div>

          <textarea
            placeholder="Artwork Description"
            className="w-full bg-gray-800 p-2 rounded mb-4 h-32"
            // value={description}
            // onChange={(e) => dispatch(setDescription(e.target.value))}
          />

          <div className="mb-4">
            <h3 className="text-xl mb-2">Medium</h3>
            <div className="flex flex-wrap gap-2">
              {mediumOptions.map((opt) => (
                <button
                  key={opt}
                  //   className={`px-3 py-1 rounded ${medium.includes(opt) ? 'bg-blue-600' : 'bg-gray-700'}`}
                  //   onClick={() => dispatch(setMedium(opt))}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <input
            type="text"
            placeholder="Subject Matter"
            className="w-full bg-gray-800 p-2 rounded mb-4"
            // value={subjectMatter}
            // onChange={(e) => dispatch(setSubjectMatter(e.target.value))}
          />

          <input
            type="text"
            placeholder="Software Used"
            className="w-full bg-gray-800 p-2 rounded mb-4"
            // value={softwareUsed}
            // onChange={(e) => dispatch(setSoftwareUsed(e.target.value))}
          />

          <input
            type="text"
            placeholder="Tags"
            className="w-full bg-gray-800 p-2 rounded mb-4"
            // value={tags}
            // onChange={(e) => dispatch(setTags(e.target.value))}
          />
        </div>

        <aside className="w-1/3">
          <div className="bg-gray-800 p-4 rounded mb-4">
            <h3 className="text-xl mb-2">Visibility on Portfolio Lists</h3>
            <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">
              Upgrade to Premium
            </button>
            <div className="mt-2">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" /> ArtStation.com
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" /> My Website
              </label>
            </div>
          </div>

          <div className="bg-gray-800 p-4 rounded mb-4">
            <h3 className="text-xl mb-2">Publishing Options</h3>
            <select className="bg-gray-700 p-2 rounded w-full mb-2">
              <option>Not published</option>
              <option>Published</option>
            </select>
            <button className="bg-blue-600 text-white px-4 py-2 rounded w-full mb-2">
              Save
            </button>
            <button className="bg-green-600 text-white px-4 py-2 rounded w-full">
              Publish
            </button>
          </div>

          <div className="bg-gray-800 p-4 rounded mb-4">
            <h3 className="text-xl mb-2">Project Thumbnail</h3>
            {/* {images.length > 0 && (
              <img src={images[0].url} alt="Project Thumbnail" className="w-full h-48 object-cover mb-2" />
            )} */}
            <div className="flex justify-between">
              <button className="bg-blue-600 text-white px-4 py-2 rounded">
                Crop
              </button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded">
                Upload
              </button>
            </div>
          </div>

          <div className="bg-gray-800 p-4 rounded mb-4">
            <h3 className="text-xl mb-2">Promotional content</h3>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" /> Includes promotional
              content
            </label>
          </div>

          <div className="bg-gray-800 p-4 rounded mb-4">
            <h3 className="text-xl mb-2">Albums</h3>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" /> learn
            </label>
          </div>

          <div className="bg-gray-800 p-4 rounded mb-4">
            <h3 className="text-xl mb-2">Comments</h3>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" /> Allow users to comment
              on this post
            </label>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default ArtworkUpload;
