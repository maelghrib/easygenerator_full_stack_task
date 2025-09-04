'use client';

import * as ChakraUI from "@chakra-ui/react"
import {PasswordInput} from "@/components/ui/password-input"
import {useState} from "react";
import axios from '@/utils/axios';
import {AxiosResponse} from "axios";
import {useRouter} from 'next/navigation';
import {APIEndpoint, PageRoute, ResponseStatus} from "@/utils/constants";
import {SignUpInputData, SignUpResponse} from "@/utils/types";
import {Link as ChakraLink} from "@chakra-ui/react"
import NextLink from "next/link"

export default function SignUpPage() {

    const router = useRouter();

    const welcomeText = "Easygenerator SignUp"

    const initialSignUpInputData: SignUpInputData = {
        name: "",
        email: "",
        password: "",
    }

    const [signUpInputData, setSignUpInputData] = useState<SignUpInputData>(initialSignUpInputData)
    const [visible, setVisible] = useState(false)

    const onSignUp = async () => {
        try {
            const response: AxiosResponse<SignUpResponse> = await axios.post(APIEndpoint.SIGNUP, signUpInputData)
            if (response.data.status === ResponseStatus.CREATED) {
                router.push(PageRoute.LOGIN);
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
                        Name <ChakraUI.Field.RequiredIndicator/>
                    </ChakraUI.Field.Label>
                    <ChakraUI.Input
                        placeholder="Enter Your Name"
                        onChange={event => {
                            const newSignUpInputData: SignUpInputData = {
                                ...signUpInputData,
                                name: event.target.value
                            }
                            setSignUpInputData(newSignUpInputData)
                        }}
                    />
                </ChakraUI.Field.Root>

                <ChakraUI.Field.Root required>
                    <ChakraUI.Field.Label>
                        Email <ChakraUI.Field.RequiredIndicator/>
                    </ChakraUI.Field.Label>
                    <ChakraUI.Input
                        placeholder="Enter Your Email"
                        onChange={event => {
                            const newSignUpInputData: SignUpInputData = {
                                ...signUpInputData,
                                email: event.target.value
                            }
                            setSignUpInputData(newSignUpInputData)
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
                            const newSignUpInputData: SignUpInputData = {
                                ...signUpInputData,
                                password: event.target.value
                            }
                            setSignUpInputData(newSignUpInputData)
                        }}
                    />
                </ChakraUI.Field.Root>

                <ChakraUI.Button onClick={onSignUp}>Signup</ChakraUI.Button>

            </ChakraUI.Flex>

            <ChakraLink asChild>
                <NextLink href={PageRoute.LOGIN}>Already have an account? Login Here</NextLink>
            </ChakraLink>

        </ChakraUI.Center>
    );
}
