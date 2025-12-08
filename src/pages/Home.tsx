import Header from "../components/Header";
import ListItem from "../components/ListItem";
import { Sidebar } from "../components/Sidebar";
import * as likeImage from "../assets/like.jpg";
import AuthModal from "../components/AuthModal";
import UploadModal from "../components/UploadModal";

const Home = () => {
  return (
    <>
      <AuthModal />
      <UploadModal />
      <Sidebar>
        <div
          className="flex-col gap-y-2 bg-neutral-900 rounded-lg  w-full h-full
      overflow-hidden overflow-y-auto"
        >
          <Header>
            <div className="mb-2">
              <h1 className="text-white text-3xl font-semibold">
                Welcome back
              </h1>
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
              <h1 className="text-white text-2xl font-semibold">
                Newest songs
              </h1>
            </div>
            <div>List of Songs!</div>
          </div>
        </div>
      </Sidebar>
    </>
  );
};

export default Home;
