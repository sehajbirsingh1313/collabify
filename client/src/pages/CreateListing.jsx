import { useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function CreateListing() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "", 
    followers: 0,
    engagementRate: 0,
    socialMedia: {
      instagram: false,
      youtube: false,
      twitter: false,
      tiktok: false,
      facebook: false,
    },
    audienceDemographics: {
      ageRange: "",
      gender: "",
      location: "",
    },
    interests: {
      fashion: false,
      beauty: false,
      fitness: false,
      travel: false,
      food: false,
      gaming: false,
      technology: false,
      lifestyle: false,
    },
    pastCollaborations: "",
  });
  const [videoUploadError, setVideoUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { id, type, checked, value } = e.target;
  
    // Handle different types of form inputs
    if (type === "checkbox") {
      if (id === "socialMedia" || id === "interests") {
        setFormData({
          ...formData,
          [id]: {
            ...formData[id],
            [value]: checked,
          },
        });
      } else {
        setFormData({
          ...formData,
          [id]: checked,
        });
      }
    } else if (type === "radio") {
      setFormData({
        ...formData,
        [id]: value,
      });
    } else {
      setFormData({
        ...formData,
        [id]: value,
      });
    }
  };
  

  const handleVideoSubmit = async () => {
    const inputElement = document.getElementById("videos");
    const selectedFiles = inputElement.files;
  
    if (selectedFiles.length > 0) {
      setUploading(true);
      setVideoUploadError(null);
  
      const promises = Array.from(selectedFiles).map(async (file) => {
        return storeVideo(file);
      });
  
      try {
        const urls = await Promise.all(promises);
        console.log("Firebase Video URLs:", urls);
        console.log("Videos Array:", selectedFiles);
        // Update your state or database with the video URLs
      } catch (error) {
        console.error("Error uploading videos: ", error);
        setVideoUploadError("Error uploading videos. Please try again.");
      } finally {
        setUploading(false);
      }
    } else {
      setVideoUploadError("Please select at least one video to upload.");
    }
  };
  
  
  
  const storeVideo = async (file) => {
    try {
      const storage = getStorage(app);
      const storageRef = ref(storage, `videos/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          console.error("Error uploading video: ", error);
          setVideoUploadError("Error uploading video. Please try again.");
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            // Handle the download URL (e.g., save it to your database)
            console.log("Video download URL: ", downloadURL);
            // Update your state or database with the download URL
            setVideos((prevVideos) => [...prevVideos, downloadURL]);
          });
        }
      );
    } catch (error) {
      console.error("Error storing video: ", error);
      setVideoUploadError("Error storing video. Please try again.");
    }
  };

  const handleRemoveVideo = (index) => {
    setVideos((prevVideos) => prevVideos.filter((_, i) => i !== index));
  };
  const handleSubmit = async (e) => {
    // ... (previous code)
  };

  const customTextStyle2 = {
    color: "#000659",
    // Change the text color to red (or use your preferred color)
  };

  const customTextStyle1 = {
    color: "green",
    // Change the text color to red (or use your preferred color)
  };

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1
        className="text-3xl font-semibold text-center my-7"
        style={customTextStyle2}
      >
        Create an Influencer Profile
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1" style={customTextStyle2}>
          <div className="flex gap-2 items-center">
            <label htmlFor="id">Instagram ID</label>
            <input
              type="text"
              placeholder="@tom_cruise"
              className="border p-3 rounded-lg"
              id="name"
              maxLength="62"
              minLength="10"
              required
              onChange={handleChange}
              value={formData.name}
            />
          </div>
          <div className="flex gap-2 items-center">
            <label htmlFor="bio">Bio</label>
            <textarea
              type="text"
              placeholder="Actor | Influencer | Author"
              className="border p-3 rounded-lg"
              id="description"
              required
              onChange={handleChange}
              value={formData.description}
            />
          </div>
          <div className="flex gap-2 items-center">
            <label htmlFor="category">Category:</label>
            <input
              type="text"
              id="category"
              placeholder="Fashion, Beauty, Fitness, etc."
              className="border p-3 rounded-lg"
              onChange={handleChange}
              value={formData.category}
            />
          </div>
          <div className="flex gap-2 items-center">
            <label htmlFor="followers">Followers:</label>
            <input
              type="number"
              id="followers"
              min="0"
              required
              className="border p-3 rounded-lg"
              onChange={handleChange}
              value={formData.followers}
            />
          </div>
          <div className="flex gap-2 items-center">
            <label htmlFor="engagementRate">Engagement Rate:</label>
            <input
              type="number"
              id="engagementRate"
              min="0"
              step="0.01"
              required
              className="border p-3 rounded-lg"
              onChange={handleChange}
              value={formData.engagementRate}
            />
          </div>
          <div className="flex gap-2 items-center">
            <label htmlFor="socialMedia">Social Media Platforms:</label>
            <div>
              {Object.keys(formData.socialMedia).map((platform) => (
                <label key={platform} className="mr-2">
                  <input
                    type="checkbox"
                    id="socialMedia"
                    value={platform}
                    onChange={handleChange}
                    checked={formData.socialMedia[platform]}
                  />
                  {platform.charAt(0).toUpperCase() + platform.slice(1)}
                </label>
              ))}
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <label htmlFor="audienceAgeRange">Audience Age Range:</label>
            <input
              type="text"
              id="ageRange"
              placeholder="18-24"
              className="border p-3 rounded-lg"
              onChange={handleChange}
              value={formData.audienceDemographics.ageRange}
            />
          </div>
          <div className="flex gap-2 items-center">
            <label htmlFor="audienceGender">Audience Gender:</label>
            <input
              type="text"
              id="gender"
              placeholder="Male, Female, Other"
              className="border p-3 rounded-lg"
              onChange={handleChange}
              value={formData.audienceDemographics.gender}
            />
          </div>
          <div className="flex gap-2 items-center">
            <label htmlFor="audienceLocation">Audience Location:</label>
            <input
              type="text"
              id="location"
              placeholder="City, Country"
              className="border p-3 rounded-lg"
              onChange={handleChange}
              value={formData.audienceDemographics.location}
            />
          </div>
          <div className="flex gap-2 items-center">
            <label htmlFor="interests">Interests:</label>
            <div>
              {Object.keys(formData.interests).map((interest) => (
                <label key={interest} className="mr-2">
                  <input
                    type="checkbox"
                    id="interests"
                    value={interest}
                    onChange={handleChange}
                    checked={formData.interests[interest]}
                  />
                  {interest.charAt(0).toUpperCase() + interest.slice(1)}
                </label>
              ))}
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <label htmlFor="pastCollaborations">Past Collaborations:</label>
            <textarea
              id="pastCollaborations"
              placeholder="Describe your past collaborations..."
              className="border p-3 rounded-lg"
              onChange={handleChange}
              value={formData.pastCollaborations}
            />
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">
            Videos:
            <span className="font-normal text-gray-600 ml-2">
              Upload your videos
            </span>
          </p>
          <div className="flex gap-4">
            <input
              className="p-3 border border-gray-300 rounded w-full"
              type="file"
              id="videos"
              accept="video/*"
              multiple
            />
<button
  type="button"
  disabled={uploading}
  onClick={handleVideoSubmit}
  className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80"
>
  {uploading ? "Uploading..." : "Upload"}
</button>

          </div>
          <p className="text-red-700 text-sm">
            {videoUploadError && videoUploadError}
          </p>
          {videos.length > 0 &&
  videos.map((videoURL, index) => (
    <div key={index} className="flex justify-between p-3 border items-center">
      <video controls className="w-40 h-24 object-contain rounded-lg">
        <source src={videoURL} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <button
        type="button"
        onClick={() => handleRemoveVideo(index)}
        className="p-3 text-red-700 rounded-lg uppercase hover:opacity-75"
      >
        Delete
      </button>
    </div>
  ))}

          <button
            disabled={loading || uploading}
            className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
          >
            {loading ? "Creating..." : "Create profile"}
          </button>
          {error && <p className="text-red-700 text-sm">{error}</p>}

          <div className="flex justify-center">
            {/* <img
          src="https://media.istockphoto.com/id/1180483761/vector/vlogging-woman-illustration.jpg?s=612x612&w=0&k=20&c=iVsU7lUB00x1WKMgPy21R2VQ0yOs8I4_cIx4c2Qy8OI="
          alt="Your Image Description"
          className="w-64 h-64 object-contain rounded-lg"
        /> */}
            <img
              src="https://png.pngtree.com/png-vector/20200728/ourmid/pngtree-influencer-marketing-concept-flat-design-png-image_2315375.jpg"
              alt="Your Image Description"
              className="w-100 h-100 object-contain rounded-lg"
            />
          </div>
          <img
            src="https://media.istockphoto.com/id/1180483761/vector/vlogging-woman-illustration.jpg?s=612x612&w=0&k=20&c=iVsU7lUB00x1WKMgPy21R2VQ0yOs8I4_cIx4c2Qy8OI="
            alt="Your Image Description"
            className="w-80 h-80 object-contain rounded-lg"
          />
        </div>
      </form>
    </main>
  );
}
