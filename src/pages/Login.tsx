import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import Header from "@/components/Header";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema, type LoginSchema } from "@/lib/schemas";
import { loginApi, setAuthToken } from "@/lib/auth";
import { sanitizeInput } from "@/lib/sanitize";
import { withTimeout } from "@/lib/errorHandling";
import { errorLogger } from "@/lib/errorLogger";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const redirectState = (location.state as { redirectTo?: string; plan?: string } | null) || {};
  const redirectTo = redirectState.redirectTo;
  const redirectPlan = redirectState.plan;
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: LoginSchema) => {
    try {
      // sanitize inputs
      const email = sanitizeInput(data.email);
      const password = sanitizeInput(data.password);

      // Call API with timeout protection (30 seconds)
      const res = await withTimeout(loginApi(email, password), 30000);
      setAuthToken(res.token);
      toast.success("Welcome back!");
      if (redirectTo) {
        // forward to the requested route (e.g. /payment) and pass plan through
        navigate(redirectTo, { state: { plan: redirectPlan } });
      } else {
        navigate("/dashboard");
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Login failed";
      // Log error with sanitized email if available
      const sanitizedEmail = typeof data?.email === 'string' ? sanitizeInput(data.email) : undefined;
      errorLogger.error("Login error", err instanceof Error ? err : new Error(String(err)), {
        email: sanitizedEmail,
      });
      toast.error(message);
    }
  };

  return (
    <div className="font-['Poppins'] bg-gradient-to-br from-pink-50 to-purple-50 min-h-screen">
      <Header />

      <div className="min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="auth-card w-full max-w-lg site-wide-padding">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
            <p className="text-gray-600">Sign in to access your account</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <div className="relative">
                <Mail
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="email"
                  {...register("email")}
                  className={`w-full pl-12 pr-4 py-3 rounded-xl border ${errors.email ? "border-red-400" : "border-gray-200"} focus:outline-none focus:border-pink-500`}
                  placeholder="you@example.com"
                />
                {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <Lock
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  className={`w-full pl-12 pr-12 py-3 rounded-xl border ${errors.password ? "border-red-400" : "border-gray-200"} focus:outline-none focus:border-pink-500`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
                {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-pink-500 focus:ring-pink-500"
                />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-sm text-pink-500 hover:text-pink-600">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-full font-medium transition-all disabled:opacity-50"
            >
              {isSubmitting ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link to="/register-artist" className="text-pink-500 hover:text-pink-600 font-medium">
                Sign up as an artist
              </Link>
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="text-center text-sm text-gray-600 mb-4">Or continue with</div>
            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center py-3 px-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all" type="button">
                <img
                  src="https://www.google.com/favicon.ico"
                  alt="Google"
                  className="w-5 h-5 mr-2"
                  loading="lazy"
                />
                Google
              </button>
              <button className="flex items-center justify-center py-3 px-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all" type="button">
                <img
                  src="https://www.facebook.com/favicon.ico"
                  alt="Facebook"
                  className="w-5 h-5 mr-2"
                  loading="lazy"
                />
                Facebook
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
