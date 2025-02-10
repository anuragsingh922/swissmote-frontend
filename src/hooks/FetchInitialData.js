import { useEffect } from "react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { verifyUser } from "../store/userSlice";
import { fetchEvents, setCurrentUser } from "../store/eventSlice";

const LOCAL_STORAGE_TOKEN_KEY = "drsfbuadcjk";

const FetchInitialData = () => {
    const dispatch = useAppDispatch();

    const { error } = useAppSelector((state) => state.user);
    const { name: user } = useAppSelector((state) => state.user);
    const token = localStorage?.getItem(LOCAL_STORAGE_TOKEN_KEY);

    useEffect(() => {
        if (!user) {
            dispatch(verifyUser()).unwrap().then((data) => {
                dispatch(setCurrentUser({ id: data.email, role: data.role }));
            });
        }
    }, [user, dispatch]);

    useEffect(() => {
        dispatch(fetchEvents());
    }, [dispatch]);

    // useEffect(() => {
    //     if (user && token) {
    //         dispatch(fetchWishlistItems());
    //         dispatch(fetchCartItems());
    //     }
    // }, [dispatch, user, token]);
};

export default FetchInitialData;
