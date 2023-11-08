import React, { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi({
  clientId: "a31a94629e394d4282216937dfe09c84",
});

interface IProfileInfo {
  image: string;
  name: string | undefined;
  email: string;
  followers: number | undefined;
}

const ProfileComp = () => {
  const accessToken = localStorage.getItem("token");
  const [profileInfo, setProfileInfo] = useState<IProfileInfo>({});

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    //if (!search) return setSearchResults([]);
    if (!accessToken) return;

    //let cancel = false
    spotifyApi
      .getMe()
      .then((res) => {
        //if (cancel) return
        console.log(res.body);
        setProfileInfo({
          image: res.body.images[1].url,
          name: res.body.display_name,
          email: res.body.email,
          followers: res.body.followers?.total,
        });
      })
      .catch((err) => {
        console.log(err);
      });

    //return () => (cancel = true)
  }, []);

  return (
    <div className="p-10 text-white flex flex-col items-center gap-6">
      <img src={profileInfo.image} alt="" className="w-48 h-48 rounded-full" />
      <div className="flex flex-col items-center">
        <h2 className="text-3xl">{profileInfo.name}</h2>
        <h2 className="text-2xl">{profileInfo.email}</h2>
        <h2 className="text-2xl">Followers: {profileInfo.followers}</h2>
      </div>
    </div>
  );
};

export default ProfileComp;
