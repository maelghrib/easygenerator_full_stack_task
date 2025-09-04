'use client';

import * as ChakraUI from "@chakra-ui/react"
import {PasswordInput} from "@/components/ui/password-input"
import {useState} from "react";
import {AxiosResponse} from "axios";
import axios from "@/utils/axios";
import {useRouter} from 'next/navigation';
import {APIEndpoint, PageRoute, ResponseStatus} from "@/utils/constants";
import {LoginInputData, LoginResponse} from "@/utils/types";
import {Link as ChakraLink} from "@chakra-ui/react"
import NextLink from "next/link"

export default function LoginPage() {

    const router = useRouter();

    const welcomeText = "Easygenerator Login"

    const initialLoginInputData: LoginInputData = {
        email: "",
        password: "",
    }

    const [loginInputData, setLoginInputData] = useState<LoginInputData>(initialLoginInputData)
    const [visible, setVisible] = useState(false)

    const onLogin = async () => {
        try {
            const response: AxiosResponse<LoginResponse> = await axios.post(
                APIEndpoint.LOGIN, loginInputData, {withCredentials: true,}
            )
            if (response.data.status === ResponseStatus.SUCCESS) {
                router.push(PageRoute.HOME);
            } else {
            }

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <ChakraUI.Center w={"100%"} h={"100vh"} flexDir={"column"} gap={"5"}>

            <ChakraUI.Text fontSize="30px" fontWeight={"bold"}>{welcomeText}</ChakraUI.Text>

            <ChakraUI.Flex w={"30%"} flexDir={"column"} gap={"5"}>

                <ChakraUI.Field.Root required>
                    <ChakraUI.Field.Label>
                        Email <ChakraUI.Field.RequiredIndicator/>
                    </ChakraUI.Field.Label>
                    <ChakraUI.Input
                        placeholder="Enter Your Email"
                        onChange={event => {
                            const newLoginInputData: LoginInputData = {
                                ...loginInputData,
                                email: event.target.value
                            }
                            setLoginInputData(newLoginInputData)
                        }}
                    />
                </ChakraUI.Field.Root>

                <ChakraUI.Field.Root required>
                    <ChakraUI.Field.Label>
                        Password <ChakraUI.Field.RequiredIndicator/>
                    </ChakraUI.Field.Label>
                    <PasswordInput
                        placeholder="Enter Your Password"
                        visible={visible}
                        onVisibleChange={setVisible}
                        onChange={event => {
                            const newLoginInputData: LoginInputData = {
                                ...loginInputData,
                                password: event.target.value
                            }
                            setLoginInputData(newLoginInputData)
                        }}
                    />
                </ChakraUI.Field.Root>

                <ChakraUI.Button onClick={onLogin}>Login</ChakraUI.Button>

            </ChakraUI.Flex>

            <ChakraLink asChild>
                <NextLink href={PageRoute.SIGNUP}>New Account? SignUp Here</NextLink>
            </ChakraLink>

        </ChakraUI.Center>
    );
}
