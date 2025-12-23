import { useEffect, useState } from "react";

import Header from "../components/Header";
import ListItem from "../components/ListItem";
import * as likeImage from "../assets/like.jpg";
import AuthModal from "../components/AuthModal";
import UploadModal from "../components/UploadModal";
import { getSongsByUserId } from "../services/songs.service";
import type { Song } from "../../types/types";
import PageContent from "../components/PageContent";
import { useUser } from "../hooks/useUser";

const Home = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const { user } = useUser();

  useEffect(() => {
    const loadSongs = async () => {
      // Only show user's songs if logged in (songs are private)
      if (user) {
        const result = await getSongsByUserId();
        setSongs(result);
      } else {
        setSongs([]);
      }
    };

    loadSongs();
  }, [user]);

  return (
    <>
      <AuthModal />
      <UploadModal />
      <div
        className="flex-col gap-y-2 bg-neutral-900 rounded-lg  w-full h-full
      overflow-hidden overflow-y-auto"
      >
        <Header>
          <div className="mb-2">
            <h1 className="text-white text-3xl font-semibold">Welcome back</h1>
          </div>

          <div
            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3
          2xl:grid-cols-4 gap-3 mt-4"
          >
            <ListItem
              image={likeImage.default}
              name="Liked songs"
              href="liked"
            />
          </div>
        </Header>
        <div className="mt-2 mb-7 px-6">
          <div className="flex justify-between items-center">
            <h1 className="text-white text-2xl font-semibold">Newest songs</h1>
          </div>

          <PageContent songs={songs} />
        </div>
      </div>
    </>
  );
};

export default Home;
