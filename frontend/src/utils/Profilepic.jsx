/* eslint-disable react/prop-types */

function ProfilePic({ username, profile = false }) {
    const firstLetter = username ? username.charAt(0).toUpperCase() : '';
  
    return (
      profile ? (
        <div className="w-24 h-24 rounded-full bg-zinc-700 flex items-center justify-center text-white font-semibold text-4xl">
          {firstLetter}
        </div>
        
      ) : (
        <div className="w-12 h-12 rounded-full bg-zinc-700 flex items-center justify-center text-white font-semibold text-2xl">
          {firstLetter}
        </div>
      )
    );
  }
  
  export default ProfilePic;
  