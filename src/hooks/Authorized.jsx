import { useEffect } from "react";
import { useAppSelector } from "./useAppSelector";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Loading from "../components/Loading";

function Authorized({ children }) {
  const navigate = useNavigate();

  const {
    name: user,
    loading,
    error: userError,
  } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (userError) {
      toast.success("Please login first");
      navigate("/");
    }
  }, [userError, navigate]);

  if (loading) {
    return <Loading />;
  }

  if (user) {
    return children;
  }

  return null;
}

export default Authorized;
