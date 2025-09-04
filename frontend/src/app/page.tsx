import * as ChakraUI from "@chakra-ui/react";
import {cookies} from 'next/headers';
import {redirect} from 'next/navigation';
import axios from '@/utils/axios';
import {APIEndpoint, ResponseStatus, PageRoute} from '@/utils/constants';
import {LogoutResponse, UserData, UserProfileResponse} from '@/utils/types';
import {AxiosResponse} from "axios";
import {LoginButton} from "@/components/LogoutButton";

export default async function Home() {

    const cookieStore = await cookies();
    const token = cookieStore.get('accessToken')?.value;

    if (!token) {
        redirect(PageRoute.LOGIN);
    }

    let user: UserData | null = null;
    try {
        const response: AxiosResponse<UserProfileResponse> = await axios.get<UserProfileResponse>(
            APIEndpoint.PROFILE, {headers: {Authorization: `Bearer ${token}`}}
        );

        if (response.data.status === ResponseStatus.SUCCESS) {
            user = response.data.user!!;
        } else {
            redirect(PageRoute.LOGIN);
        }
    } catch (err) {
        console.error(err);
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
