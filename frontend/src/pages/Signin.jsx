// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { RiLockPasswordLine, RiUserLine } from "react-icons/ri";
// import { useState } from "react";

// function Signin() {
// const [showPassword, setShowPassword] = useState(false);
//   return (
//     <div className="flex min-h-screen items-center justify-center  px-4">
//       <Card className="w-full max-w-md border-slate-800 bg-slate-700 shadow-2xl rounded-2xl">
//         <CardHeader className="space-y-2 text-center">
//           <CardTitle className="text-2xl font-bold tracking-tight text-white">
//             Welcome back
//           </CardTitle>
//           <CardDescription className="text-sm text-slate-400">
//             Sign in to access your dashboard and manage your posts.
//           </CardDescription>
//         </CardHeader>

//         <CardContent>
//           <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            
//             {/* Username Field */}
//             <div className="grid gap-2">
//               <Label htmlFor="username" className="text-slate-300">
//                 Username
//               </Label>
//               <div className="relative flex items-center">
//                 <RiUserLine className="absolute left-3 text-slate-400 text-lg" />
//                 <Input
//                   id="username"
//                   type="text"
//                   placeholder="Enter your username"
//                   autoComplete="username"
//                   className="h-11 pl-10 bg-slate-950/50 border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-2 focus-visible:ring-blue-500 w-full"
//                 />
//               </div>
//             </div>

//             {/* Password Field */}
//             <div className="grid gap-2">
//               <div className="flex items-center justify-between">
//                 <Label htmlFor="password" className="text-slate-300">
//                   Password
//                 </Label>
//                 <button
//                   type="button"
//                   className="text-xs text-blue-400 hover:text-blue-300 transition"
//                 >
//                   Forgot password?
//                 </button>
//               </div>
//               <div className="relative flex items-center">
//                 <RiLockPasswordLine className="absolute left-3 text-slate-400 text-lg" />
//                 <RiLockPasswordLine className="absolute left-5 text-slate-400 text-lg" />
//                 <Input
//                   id="password"
//                   type="password"
//                   placeholder="Enter your password"
//                   autoComplete="current-password"
//                   className="h-11 pl-10 bg-slate-950/50 border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-2 focus-visible:ring-blue-500 w-full"
//                 />
//               </div>
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               className="w-full h-11 mt-2 rounded-xl bg-blue-600 text-white font-semibold shadow-lg shadow-blue-600/20 transition hover:bg-blue-500 hover:scale-[1.01] active:scale-[0.99]"
//             >
//               Sign in
//             </button>

//             {/* Footer */}
//             <p className="text-center text-xs text-slate-400 pt-2">
//               Don&apos;t have an account?{" "}
//               <button
//                 type="button"
//                 className="text-blue-400 hover:text-blue-300 font-medium transition"
//               >
//                 Create one
//               </button>
//             </p>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

// export default Signin;




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
  RiEyeLine,
  RiEyeOffLine,
} from "react-icons/ri";
import { useState } from "react";

function Signin() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center px-4 overflow-hidden">
      <Card className="w-full max-w-md border-slate-800 bg-slate-900 shadow-2xl rounded-2xl">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-2xl font-bold tracking-tight text-white">
            Welcome back
          </CardTitle>
          <CardDescription className="text-sm text-slate-400">
            Sign in to access your dashboard and manage your posts.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            
            {/* Username Field */}
            <div className="grid gap-2">
              <Label htmlFor="username" className="text-slate-300">
                Username
              </Label>
              <div className="relative flex items-center">
                <RiUserLine className="absolute left-3 text-slate-400 text-lg" />
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  autoComplete="username"
                  className="h-11 pl-10 bg-slate-950/50 border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-2 focus-visible:ring-blue-500 w-full"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-slate-300">
                  Password
                </Label>
                <button
                  type="button"
                  className="text-xs text-blue-400 hover:text-blue-300 transition"
                >
                  Forgot password?
                </button>
              </div>

              <div className="relative flex items-center">
                {/* Left Icon */}
                <RiLockPasswordLine className="absolute left-3 text-slate-400 text-lg" />

                {/* Input */}
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className="h-11 pl-10 pr-10 bg-slate-950/50 border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-2 focus-visible:ring-blue-500 w-full"
                />

                {/* Eye Icon */}
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-slate-400 text-lg cursor-pointer"
                >
                  {showPassword ? <RiEyeOffLine /> : <RiEyeLine />}
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full h-11 mt-2 rounded-xl bg-blue-600 text-white font-semibold shadow-lg shadow-blue-600/20 transition hover:bg-blue-500 hover:scale-[1.01] active:scale-[0.99]"
            >
              Sign in
            </button>

            {/* Footer */}
            <p className="text-center text-xs text-slate-400 pt-2">
              Don&apos;t have an account?{" "}
              <button
                type="button"
                className="text-blue-400 hover:text-blue-300 font-medium transition"
              >
                Create one
              </button>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Signin;