'use client';

import * as ChakraUI from "@chakra-ui/react";
import {redirect} from 'next/navigation';
import axios from '@/utils/axios';
import {APIEndpoint, ResponseStatus, PageRoute} from '@/utils/constants';
import {LogoutResponse} from '@/utils/types';
import {AxiosResponse} from "axios";

export function LoginButton() {

    const onLogout = async () => {
        try {
            const response: AxiosResponse<LogoutResponse> = await axios.post(APIEndpoint.LOGOUT, {}, {withCredentials: true});
            if (response.data.status === ResponseStatus.SUCCESS) {
                redirect(PageRoute.LOGIN);
            } else {
                redirect(PageRoute.LOGIN);
            }
        } catch (err) {
            console.error('Logout failed', err);
            redirect(PageRoute.LOGIN);
        }
    };

    return (
        <ChakraUI.Button colorScheme="red" onClick={onLogout}>Logout</ChakraUI.Button>
    );
}
