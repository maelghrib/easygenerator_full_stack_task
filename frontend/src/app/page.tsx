import * as ChakraUI from "@chakra-ui/react";
import {cookies} from 'next/headers';
import {redirect} from 'next/navigation';
import axios from '@/utils/axios';
import {APIEndpoint, ResponseStatus, PageRoute} from '@/utils/constants';
import {UserData, UserProfileResponse} from '@/utils/types';
import {AxiosResponse} from "axios";
import {LoginButton} from "@/components/LogoutButton";
import {logger} from "@/utils/logger";

export default async function Home() {

    const cookieStore = await cookies();
    const token = cookieStore.get('accessToken')?.value;

    if (!token) {
        logger.warn("No access token found, redirecting to login");
        redirect(PageRoute.LOGIN);
    }

    let user: UserData | null = null;
    try {
        logger.info("Fetching user profile with token");
        const response: AxiosResponse<UserProfileResponse> = await axios.get<UserProfileResponse>(
            APIEndpoint.PROFILE, {headers: {Authorization: `Bearer ${token}`}}
        );

        if (response.data.status === ResponseStatus.SUCCESS) {
            user = response.data.user!!;
            logger.info("User profile fetched successfully", user);
        } else {
            logger.warn("Profile fetch failed, redirecting", response.data);
            redirect(PageRoute.LOGIN);
        }
    } catch (err) {
        logger.error("Error fetching user profile", err);
        redirect(PageRoute.LOGIN);
    }

    const hello_user_text = `Hello ${user?.name ?? ''}!`;
    const welcome_text = "Welcome to Easygenerator";

    return (
        <ChakraUI.Center w="100%" h="100vh" flexDir="column" gap={"5"}>
            <ChakraUI.Text fontSize="40px" fontWeight="bold">{hello_user_text}</ChakraUI.Text>
            <ChakraUI.Text fontSize="30px" fontWeight="bold">{welcome_text}</ChakraUI.Text>
            <LoginButton />
        </ChakraUI.Center>
    );
}
