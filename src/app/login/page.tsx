"use client"; // This is a client component 

import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/container/button"
const Login = () => {
    
    return(
        <div className="h-screen flex justify-center items-center">
            <Card className="w-[350px]">
                <form>
                    <div className="grid w-full items-center gap-4">
                        <Input  name="username" label="Username" type="text" placeholder="your name" />
                        <Input  name="password" label="Password" type="text" placeholder="your password" />
                        <Button>Login</Button>
                    </div>
                </form>
            </Card>
        </div>
    )
}

export default Login