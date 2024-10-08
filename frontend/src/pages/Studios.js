import React from 'react';
import { Star, ExternalLink, MapPin, Briefcase } from 'lucide-react';

const StudioCard = ({ name, logo, banner, website, location, jobsOpen, featured }) => (
  <div className="bg-gray-800 rounded-lg overflow-hidden">
    <div className="relative h-40">
      <img src={banner} alt={name} className="w-full h-full object-cover" />
      {featured && (
        <div className="absolute top-2 left-2 bg-yellow-500 text-black px-2 py-1 rounded-full text-xs font-bold flex items-center">
          <Star size={12} className="mr-1" /> FEATURED
        </div>
      )}
    </div>
    <div className="p-4">
      <div className="flex items-center mb-2">
        <img src={logo} alt={`${name} logo`} className="w-12 h-12 rounded-full mr-3" />
        <h3 className="text-xl font-bold text-white">{name}</h3>
      </div>
      <div className="text-gray-400 mb-2 flex items-center">
        <ExternalLink size={16} className="mr-1" />
        <a href={website} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">{website}</a>
      </div>
      <div className="text-gray-400 mb-4 flex items-center">
        <MapPin size={16} className="mr-1" />
        {location}
      </div>
      <button className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded flex items-center justify-center">
        <Briefcase size={16} className="mr-2" />
        {jobsOpen} Jobs Open
      </button>
    </div>
  </div>
);

const StudiosListing = () => {
  const studios = [
    {
      name: "TransPerfect Gaming",
      logo: "https://via.placeholder.com/50",
      banner: "https://via.placeholder.com/400",
      website: "www.transperfect.com",
      location: "New York, NY, USA",
      jobsOpen: 4,
      featured: true
    },
    {
      name: "Grinding Gear Games",
      logo: "https://via.placeholder.com/50",
      banner: "https://via.placeholder.com/400",
      website: "www.grindinggear.com",
      location: "Auckland, AUK, New Zealand",
      jobsOpen: 7,
      featured: true
    },
    {
      name: "Seedworld Studios",
      logo: "https://via.placeholder.com/50",
      banner: "https://via.placeholder.com/400",
      website: "seedworld.io",
      location: "Singapore",
      jobsOpen: 12,
      featured: true
    }
  ];

  return (
    <div className="bg-gray-900 text-white p-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-3xl font-bold">Studios <span className="text-gray-400 text-xl">{studios.length} results</span></h1>
          <p className="text-gray-400 mt-1">Featured Studios paid for an ArtStation Jobs subscription and are shown to all users.</p>
        </div>
        <input
          type="text"
          placeholder="City, Region, Country"
          className="bg-gray-800 text-white px-4 py-2 rounded-lg"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {studios.map((studio, index) => (
          <StudioCard key={index} {...studio} />
        ))}
      </div>
    </div>
  );
};

export default StudiosListing;