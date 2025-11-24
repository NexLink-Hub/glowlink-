import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { Upload } from "lucide-react";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { registerArtistSchema, type RegisterArtistSchema } from "@/lib/schemas";
import { setAuthToken, loginApi } from "@/lib/auth";
import { sanitizeInput } from "@/lib/sanitize";

const RegisterArtist = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    trigger,
  } = useForm<RegisterArtistSchema>({
    resolver: zodResolver(registerArtistSchema),
    mode: 'onBlur',
  });

  const validateStep = async (stepNum: number) => {
    let fieldsToValidate: (keyof RegisterArtistSchema)[] = [];
    
    if (stepNum === 1) {
      fieldsToValidate = ['firstName', 'lastName', 'email', 'phone', 'password'];
    } else if (stepNum === 2) {
      fieldsToValidate = ['businessName', 'specialty', 'location', 'experience', 'bio'];
    }
    
    const isValid = await trigger(fieldsToValidate);
    return isValid;
  };

  const onSubmit = async (data: RegisterArtistSchema) => {
    try {
      // Sanitize all string inputs
      const sanitized = {
        ...data,
        firstName: sanitizeInput(data.firstName),
        lastName: sanitizeInput(data.lastName),
        email: sanitizeInput(data.email),
        phone: sanitizeInput(data.phone),
        businessName: sanitizeInput(data.businessName),
        location: sanitizeInput(data.location),
        bio: sanitizeInput(data.bio),
        instagram: data.instagram ? sanitizeInput(data.instagram) : "",
      };

      // Call API to register (mock)
      const res = await loginApi(sanitized.email, sanitized.password);
      setAuthToken(res.token);
      toast.success("Registration successful! Welcome to GlowLink.");
      navigate("/dashboard");
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Registration failed");
    }
  };

  return (
    <div className="font-['Poppins'] bg-gradient-to-br from-pink-50 to-purple-50 min-h-screen">
      <Header />

      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-5xl site-wide-padding">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">
              Join <span className="text-pink-500">GlowLink</span>
            </h1>
            <p className="text-gray-600">
              Start growing your beauty business with South Africa's leading platform
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-center mb-12">
            <div className="flex items-center space-x-4">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                      step >= s
                        ? "bg-pink-500 text-white"
                        : "bg-white border-2 border-gray-300 text-gray-400"
                    }`}
                  >
                    {s}
                  </div>
                  {s < 3 && (
                    <div
                      className={`w-16 h-1 ${step > s ? "bg-pink-500" : "bg-gray-300"}`}
                    ></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel p-8 md:p-12 rounded-3xl">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Step 1: Personal Info */}
              {step === 1 && (
                <>
                  <h2 className="text-2xl font-bold mb-6">Personal Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        {...register("firstName")}
                        className={`w-full px-4 py-3 rounded-xl border ${errors.firstName ? "border-red-400" : "border-gray-200"} focus:outline-none focus:border-pink-500`}
                        placeholder="John"
                      />
                      {errors.firstName && <p className="text-sm text-red-500 mt-1">{errors.firstName.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        {...register("lastName")}
                        className={`w-full px-4 py-3 rounded-xl border ${errors.lastName ? "border-red-400" : "border-gray-200"} focus:outline-none focus:border-pink-500`}
                        placeholder="Doe"
                      />
                      {errors.lastName && <p className="text-sm text-red-500 mt-1">{errors.lastName.message}</p>}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        {...register("email")}
                        className={`w-full px-4 py-3 rounded-xl border ${errors.email ? "border-red-400" : "border-gray-200"} focus:outline-none focus:border-pink-500`}
                        placeholder="you@example.com"
                      />
                      {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        {...register("phone")}
                        className={`w-full px-4 py-3 rounded-xl border ${errors.phone ? "border-red-400" : "border-gray-200"} focus:outline-none focus:border-pink-500`}
                        placeholder="+27123456789"
                      />
                      {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone.message}</p>}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password *
                    </label>
                    <input
                      type="password"
                      {...register("password")}
                      className={`w-full px-4 py-3 rounded-xl border ${errors.password ? "border-red-400" : "border-gray-200"} focus:outline-none focus:border-pink-500`}
                      placeholder="••••••••"
                    />
                    {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>}
                  </div>

                  <div className="flex justify-end gap-4 pt-6">
                    <button
                      type="button"
                      onClick={async () => {
                        const isValid = await validateStep(1);
                        if (isValid) setStep(2);
                      }}
                      className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-full font-medium transition-all"
                    >
                      Next
                    </button>
                  </div>
                </>
              )}

              {/* Step 2: Business Info */}
              {step === 2 && (
                <>
                  <h2 className="text-2xl font-bold mb-6">Business Details</h2>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Business Name *
                    </label>
                    <input
                      type="text"
                      {...register("businessName")}
                      className={`w-full px-4 py-3 rounded-xl border ${errors.businessName ? "border-red-400" : "border-gray-200"} focus:outline-none focus:border-pink-500`}
                      placeholder="Your Beauty Business"
                    />
                    {errors.businessName && <p className="text-sm text-red-500 mt-1">{errors.businessName.message}</p>}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Specialty *
                      </label>
                      <select
                        {...register("specialty")}
                        className={`w-full px-4 py-3 rounded-xl border ${errors.specialty ? "border-red-400" : "border-gray-200"} focus:outline-none focus:border-pink-500`}
                      >
                        <option value="">Select specialty...</option>
                        <option value="makeup">Makeup Artist</option>
                        <option value="hair">Hair Stylist</option>
                        <option value="nails">Nail Technician</option>
                        <option value="braids">Braiding Specialist</option>
                        <option value="barber">Barber</option>
                        <option value="skincare">Skincare Specialist</option>
                      </select>
                      {errors.specialty && <p className="text-sm text-red-500 mt-1">{errors.specialty.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Location *
                      </label>
                      <input
                        type="text"
                        {...register("location")}
                        className={`w-full px-4 py-3 rounded-xl border ${errors.location ? "border-red-400" : "border-gray-200"} focus:outline-none focus:border-pink-500`}
                        placeholder="e.g., Johannesburg, Sandton"
                      />
                      {errors.location && <p className="text-sm text-red-500 mt-1">{errors.location.message}</p>}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Years of Experience *
                    </label>
                    <select
                      {...register("experience")}
                      className={`w-full px-4 py-3 rounded-xl border ${errors.experience ? "border-red-400" : "border-gray-200"} focus:outline-none focus:border-pink-500`}
                    >
                      <option value="">Select experience...</option>
                      <option value="1-2">1-2 years</option>
                      <option value="3-5">3-5 years</option>
                      <option value="5-10">5-10 years</option>
                      <option value="10+">10+ years</option>
                    </select>
                    {errors.experience && <p className="text-sm text-red-500 mt-1">{errors.experience.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bio *
                    </label>
                    <textarea
                      {...register("bio")}
                      rows={4}
                      className={`w-full px-4 py-3 rounded-xl border ${errors.bio ? "border-red-400" : "border-gray-200"} focus:outline-none focus:border-pink-500 resize-none`}
                      placeholder="Tell clients about yourself and your expertise..."
                    ></textarea>
                    {errors.bio && <p className="text-sm text-red-500 mt-1">{errors.bio.message}</p>}
                  </div>

                  <div className="flex justify-between gap-4 pt-6">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="border border-pink-500 text-pink-500 px-8 py-3 rounded-full font-medium hover:bg-pink-50 transition-all"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={async () => {
                        const isValid = await validateStep(2);
                        if (isValid) setStep(3);
                      }}
                      className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-full font-medium transition-all"
                    >
                      Next
                    </button>
                  </div>
                </>
              )}

              {/* Step 3: Social & Submit */}
              {step === 3 && (
                <>
                  <h2 className="text-2xl font-bold mb-6">Social Media</h2>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Instagram Handle
                    </label>
                    <input
                      type="text"
                      {...register("instagram")}
                      className={`w-full px-4 py-3 rounded-xl border ${errors.instagram ? "border-red-400" : "border-gray-200"} focus:outline-none focus:border-pink-500`}
                      placeholder="@yourbusinessname"
                    />
                    {errors.instagram && <p className="text-sm text-red-500 mt-1">{errors.instagram.message}</p>}
                  </div>

                  <div className="flex justify-between gap-4 pt-6">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="border border-pink-500 text-pink-500 px-8 py-3 rounded-full font-medium hover:bg-pink-50 transition-all"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-full font-medium transition-all disabled:opacity-50"
                    >
                      {isSubmitting ? "Registering..." : "Complete Registration"}
                    </button>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      </section>

      <ScrollToTop />
      <Footer />
    </div>
  );
};

export default RegisterArtist;
