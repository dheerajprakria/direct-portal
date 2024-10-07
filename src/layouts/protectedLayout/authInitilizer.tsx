import { useEffect } from "react";
import { auth } from "@/firebase/firebase";
import { useAuth } from "@/hooks/auth";
import {
    GoogleAuthProvider,
    NextOrObserver,
    onAuthStateChanged,
    User,
} from "firebase/auth";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance, { URL } from "@/api/axiosinstance";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
function AuthInitilizer() {
    const { setProvider, setUser, user } = useAuth();
    const queryClient = useQueryClient();

    const registerMutation = useMutation({
        mutationFn: async ({ token }: { token: string }) => {
            // const base_url = URL
            return await axios.post(URL + "/auth/register", null, {
                headers: {
                    'Authorization': 'Bearer ' + token,    // Example header
                }
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["auth"] })
        }
    })
    const query = useQuery({
        queryKey: ["auth"],
        queryFn: async () => (await axiosInstance.get("/auth/verify")).data,
        enabled: !!user,
    })
    const initializeUser: NextOrObserver<User> = async (user) => {
        if (user) {
            await registerMutation.mutateAsync({ token: (user as any).accessToken });

            // console.log("register ", res)

            setUser({ ...user });
            const emailProvider = user.providerData.some(
                (provider) => provider.providerId === "password"
            );

            const goolgeProvider = user.providerData.some(
                (provider) => provider.providerId === GoogleAuthProvider.PROVIDER_ID
            );
            if (emailProvider) setProvider("password");
            if (goolgeProvider) setProvider("google");
        } else {
            setUser(null);
            setProvider(null);
        }
    };
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, initializeUser);
        return unsubscribe;
    }, []);

    useEffect(() => {


        // { ...user, role: query?.data?.data?.role, userId: query?.data?.data?.userId, user: query?.data?.data })
        if (query.data?.data && !query.isFetching) {
            console.log("setting the data to a user", query?.data);
            setUser({ ...user, role: query?.data?.data?.role, userId: query?.data?.data?.userId, user: query?.data?.data });
        }
    }, [query.data, query.isFetching]);
    return null;
}
export default AuthInitilizer;
