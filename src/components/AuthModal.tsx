import { useEffect } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

// import { useAuth } from "../context/AuthContext";
import Modal from "./Modal";
import { supabase as supabaseClient } from "../lib/supabaseClient";
import useAuthModal from "../hooks/useAuthModal";
import { useAuth } from "../context/AuthContext";

const AuthModal = () => {
  const { user } = useAuth();

  const { isOpen, onClose } = useAuthModal();

  useEffect(() => {
    if (user) {
      onClose();
    }
  }, [user, onClose]);

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Modal
      title="Welcome Back"
      description="Login to your account"
      isOpen={isOpen}
      onChange={onChange}
    >
      <Auth
        theme="dark"
        magicLink
        providers={["github"]}
        supabaseClient={supabaseClient}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: "#404040",
                brandAccent: "#22c55e",
              },
            },
          },
        }}
      />
    </Modal>
  );
};

export default AuthModal;
