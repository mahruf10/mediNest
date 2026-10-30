
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/toast";
import { authClient } from "@/src/lib/auth-client";

import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import * as zod from 'zod'
export default function RegisterPage() {
    const formSchema=zod.object({
        name:zod.string().min(2, { error: 'Name must be at least 2 characters long.' }),
        email:zod.email(),
        password:zod.string().min(6,'password must be atleast 6 characters')
    })
    const router=useRouter()
  const form = useForm({
    defaultValues: {
        name:'',
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      console.log("reg data:", value);
      try {
           const{data,error}=await authClient.signUp.email(value)
           if(error){
            return(
           toast.add({
            type: "error",
           title:error.message
           
          }))
           }
        toast.add({
            type: "success",
           title:'user successfully Registered'
           
          })
          console.log(data);
          router.push('/login')

      } catch (error) {
                  return (
                    toast.add({
          type:"error",
        title: "something went wrong,plese try again...",
})
          )
      }
    },
    validators:{
        onSubmit:formSchema
    }
  });
  return (
    <Card className="mx-auto my-18 w-full max-w-sm">
      <CardHeader>
        <CardTitle>Sign Up to your account</CardTitle>

        <CardDescription>
          Enter your email below to signUp to your account
        </CardDescription>

        <CardAction>
          <Button type="button" variant="link">
            Sign Up
          </Button>
        </CardAction>
      </CardHeader>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <CardContent>
          <div className="flex flex-col gap-6">
            {/* Name field */}
          <form.Field name="name">
  {(field) => {
    const isInvalid =
      field.state.meta.isTouched &&
      !field.state.meta.isValid;

    return (
      <div className="grid gap-2">
        <Label htmlFor={field.name}>Name</Label>

        <Input
          id={field.name}
          name={field.name}
          type="text"
          placeholder="Enter your name"
          value={field.state.value}
          onChange={(e) =>
            field.handleChange(e.target.value)
          }
        />

           {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
      </div>
    );
  }}
</form.Field>
             {/* {Email field} */}

          <form.Field name="email">
  {(field) => {
    const isInvalid =
      field.state.meta.isTouched &&
      !field.state.meta.isValid;

    return (
      <div className="grid gap-2">
        <Label htmlFor={field.name}>Email</Label>

        <Input
          id={field.name}
          name={field.name}
          type="email"
          placeholder="m@example.com"
          value={field.state.value}
          onChange={(e) =>
            field.handleChange(e.target.value)
          }
        />

           {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
      </div>
    );
  }}
</form.Field>
            {/* Password field */}
            <form.Field
              name="password"
            
            >
              {(field) => {
                const isInvalid =
      field.state.meta.isTouched &&
      !field.state.meta.isValid;
                 return(
                     <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                        <Label htmlFor={field.name}>Password</Label>

                        {/* <a
                        href="/forgot-password"
                        className="text-sm underline-offset-4 hover:underline"
                        >
                        Forgot password?
                        </a> */}
                    </div>

                    <Input
                        id={field.name}
                        name={field.name}
                        type="password"
                        value={field.state.value}
                
                        onChange={(e) =>
                        field.handleChange(e.target.value)
                        }
                    />
            {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                 
                </div>
                 )  
              
            }}
            </form.Field>
          </div>
        </CardContent>

        <CardFooter className="mt-4 flex-col gap-2">
          <Button type="submit" className="w-full">
            signUp
          </Button>

          <Button
            type="button"
            variant="outline"
            className="w-full"
          >
            SignUp with Google
          </Button>
        </CardFooter>
      </form>
    </Card>
    
  );
}
