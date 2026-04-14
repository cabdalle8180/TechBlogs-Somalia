// import React from 'react'

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
// import { Label } from "@/components/ui/label"
// import { Input } from "@/components/ui/input"
// import { RiLockPasswordLine, RiUserLine, RiMailLine } from "react-icons/ri";

// function signup() {
//    return (
//     <div className="flex items-center justify-center px-4 mt-10 overflow-hidden">
//       <Card className="w-full max-w-md border border-slate-800 bg-slate-900 shadow-2xl rounded-2xl">
//         <CardHeader className="space-y-2 text-center">
//           <CardTitle className="text-2xl font-bold tracking-tight text-white">
//             Create an account
//           </CardTitle>
//           <CardDescription className="text-sm text-slate-400">
//             Join to start creating and managing your posts in one place.
//           </CardDescription>
//         </CardHeader>

//         <CardContent>
//           <form className="space-y-5">
            
//             {/* Username */}
//             <div className="grid gap-2">
//               <Label htmlFor="username" className="text-slate-300">Username</Label>
//               <div className="relative flex items-center">
//                 <RiUserLine className="absolute left-3 text-slate-400 text-lg" />
//                 <Input
//                   id="username"
//                   type="text"
//                   placeholder="your username"
//                   className="h-11 pl-10 bg-slate-950/50 border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-2 focus-visible:ring-blue-500 w-full"
//                 />
//               </div>
//             </div>

//             {/* Email */}
//             <div className="grid gap-2">
//               <Label htmlFor="email" className="text-slate-300">Email</Label>
//               <div className="relative flex items-center">
//                 <RiMailLine className="absolute left-3 text-slate-400 text-lg" />
//                 <Input
//                   id="email"
//                   type="email"
//                   placeholder="you@example.com"
//                   className="h-11 pl-10 bg-slate-950/50 border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-2 focus-visible:ring-blue-500 w-full"
//                 />
//               </div>
//             </div>

//             {/* Password */}
//             <div className="grid gap-2">
//               <Label htmlFor="password" d className="text-slate-300">Password</Label>
//               <div className="relative flex items-center">
//                 <RiLockPasswordLine className="absolute left-3 text-slate-400 text-lg" />
//                 <Input
//                   id="password"
//                   type="password"
//                   placeholder="••••••••"
//                   className="h-11 pl-10 bg-slate-950/50 border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-2 focus-visible:ring-blue-500 w-full"
//                 />
//               </div>
//             </div>

//             {/* Button */}
//             <button
//               type="submit"
//               className="w-full h-11 mt-2 rounded-xl bg-blue-600 text-white font-semibold shadow-lg shadow-blue-600/20 transition hover:bg-blue-500 hover:scale-[1.01] active:scale-[0.99]"
//             >
//               Create account
//             </button>

//             {/* Footer */}
//             <p className="text-center text-xs text-slate-400 pt-2">
//               Already have an account?{" "}
//               <button
//                 type="button"
//                 className="font-medium text-blue-400 hover:text-blue-300 underline-offset-4 hover:underline transition"
//               >
//                 Sign in
//               </button>
//             </p>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }

// export default signup


import React, { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  RiLockPasswordLine,
  RiUserLine,
  RiMailLine,
  RiEyeLine,
  RiEyeOffLine,
} from "react-icons/ri";

function Signup() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex items-center justify-center px-4 mt-5 overflow-hidden">
      <Card className="w-full max-w-md border border-slate-800 bg-slate-900 shadow-2xl rounded-2xl">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-2xl font-bold tracking-tight text-white">
            Create an account
          </CardTitle>
          <CardDescription className="text-sm text-slate-400">
            Join to start creating and managing your posts in one place.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form className="space-y-5">
            
            {/* Username */}
            <div className="grid gap-2">
              <Label htmlFor="username" className="text-slate-300">
                Username
              </Label>
              <div className="relative flex items-center">
                <RiUserLine className="absolute left-3 text-slate-400 text-lg" />
                <Input
                  id="username"
                  type="text"
                  placeholder="your username"
                  className="h-11 pl-10 bg-slate-950/50 border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-2 focus-visible:ring-blue-500 w-full"
                />
              </div>
            </div>

            {/* Email */}
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-slate-300">
                Email
              </Label>
              <div className="relative flex items-center">
                <RiMailLine className="absolute left-3 text-slate-400 text-lg" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="h-11 pl-10 bg-slate-950/50 border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-2 focus-visible:ring-blue-500 w-full"
                />
              </div>
            </div>

            {/* Password */}
            <div className="grid gap-2">
              <Label htmlFor="password" className="text-slate-300">
                Password
              </Label>
              <div className="relative flex items-center">
                {/* Left icon */}
                <RiLockPasswordLine className="absolute left-3 text-slate-400 text-lg" />

                {/* Input */}
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="h-11 pl-10 pr-10 bg-slate-950/50 border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-2 focus-visible:ring-blue-500 w-full"
                />

                {/* Eye icon */}
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-slate-400 text-lg cursor-pointer"
                >
                  {showPassword ? <RiEyeOffLine /> : <RiEyeLine />}
                </span>
              </div>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full h-11 mt-2 rounded-xl bg-blue-600 text-white font-semibold shadow-lg shadow-blue-600/20 transition hover:bg-blue-500 hover:scale-[1.01] active:scale-[0.99]"
            >
              Create account
            </button>

            {/* Footer */}
            <p className="text-center text-xs text-slate-400 pt-2">
              Already have an account?{" "}
              <button
                type="button"
                className="font-medium text-blue-400 hover:text-blue-300 underline-offset-4 hover:underline transition"
              >
                Sign in
              </button>
            </p>

          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Signup;