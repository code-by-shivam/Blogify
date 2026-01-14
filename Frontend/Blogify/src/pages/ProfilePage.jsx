import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { getUserInfo } from "@/services/apiBlog";

import BlogContainer from "@/ui_components/BlogContainer";
import Hero from "@/ui_components/Hero";
import Modal from "@/ui_components/Modal";
import Spinner from "@/ui_components/Spinner";
import SignUpPage from "./SignUpPage";

const ProfilePage = ({ authUsername }) => {
  const { username } = useParams();

  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => setShowModal((curr) => !curr);

  useEffect(() => {
    async function fetchUser() {
      setIsLoading(true);
      try {
        const data = await getUserInfo(username);
        setUserInfo(data);
      } catch (err) {
        console.error("Failed to fetch user info", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchUser();
  }, [username]);

  if (isLoading) return <Spinner />;

  return (
    <>
      {/* Hero Section */}
      {userInfo && (
        <Hero
          userInfo={userInfo}
          authUsername={authUsername}
          toggleModal={toggleModal}
        />
      )}

      {/* Blog List */}
      <BlogContainer
        blogs={userInfo?.author_posts || []}
        title={`${username}'s posts`}
      />

      {/* Edit Profile Modal */}
      {showModal && (
        <Modal toggleModal={toggleModal}>
          <SignUpPage
            userInfo={userInfo}
            updateForm={true}
            toggleModal={toggleModal}
          />
        </Modal>
      )}
    </>
  );
};

export default ProfilePage;
