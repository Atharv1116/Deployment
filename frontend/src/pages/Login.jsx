"use client"

import { useEffect, useMemo, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowRight, Phone, ShieldCheck } from "lucide-react"
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion"
import { staggerContainerVariants, staggerItemVariants } from "../utils/animations"

const featureCards = [
  {
    title: "AI Warmups",
    body: "Get personalized hints before every match to enter with confidence.",
    icon: "🧠",
  },
  {
    title: "Instant Matchmaking",
    body: "Real-time queues pair you with rivals at your exact skill level in seconds.",
    icon: "⚡",
  },
  {
    title: "Secure Mobile Auth",
    body: "Quick one-time passcode login, encrypted and expires in 2 minutes.",
    icon: "🔐",
  },
]

const Login = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const prefersReducedMotion = usePrefersReducedMotion()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [authMethod, setAuthMethod] = useState("email")
  const [phone, setPhone] = useState("")
  const [otp, setOtp] = useState("")
  const [otpSent, setOtpSent] = useState(false)
  const [otpCountdown, setOtpCountdown] = useState(0)

  useEffect(() => {
    if (!otpSent || otpCountdown <= 0) return undefined
    const t = setInterval(() => setOtpCountdown((prev) => Math.max(prev - 1, 0)), 1000)
    return () => clearInterval(t)
  }, [otpSent, otpCountdown])

  /* ===========================
     ✅ ONLY FIX IS INSIDE HERE
     =========================== */
  const handleSubmit = async (event) => {
    event.preventDefault()
    setError("")
    setLoading(true)

    try {
      if (authMethod === "otp") {
        if (otp.length < 4) {
          setError("Enter the 4-digit code we texted you.")
          return
        }
        setTimeout(() => {
          setLoading(false)
          navigate("/register", { state: { phone } })
        }, 800)
        return
      }

      const result = await login(email, password)

      if (!result || typeof result !== "object") {
        throw new Error("Invalid server response")
      }

      if (result.success) {
        navigate("/lobby")
      } else {
        setError(result.error || "Login failed")
      }
    } catch (err) {
      console.error("Login error:", err)
      setError("Unable to login. Please try again.")
    } finally {
      setLoading(false)
    }
  }
  /* ===========================
     ❌ NOTHING ELSE CHANGED
     =========================== */

  const handleGoogleLogin = () => {
    setError("")
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setError("Google login is rolling out soon. Use email or OTP for now.")
    }, 900)
  }

  const handleSendOtp = () => {
    if (!phone) {
      setError("Enter your mobile number first.")
      return
    }
    setError("")
    setOtpSent(true)
    setOtpCountdown(30)
  }

  const googleButton = useMemo(
    () => (
      <motion.button
        type="button"
        onClick={handleGoogleLogin}
        whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
        className="w-full bg-white/10 text-white border border-white/20 rounded-xl py-3 px-4 flex items-center justify-center gap-3 font-semibold hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-dark-900 transition"
      >
        Continue with Google
      </motion.button>
    ),
    [prefersReducedMotion],
  )

  const mobileButton = (
    <motion.button
      type="button"
      onClick={() => setAuthMethod((prev) => (prev === "otp" ? "email" : "otp"))}
      whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
      className="w-full bg-primary/10 text-primary border border-primary/40 rounded-xl py-3 px-4 flex items-center justify-center gap-3 font-semibold hover:bg-primary/20 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-dark-900 transition"
    >
      <Phone size={18} />
      {authMethod === "otp" ? "Use Email & Password" : "Login with Mobile OTP"}
    </motion.button>
  )

  /* 🔽 REST OF YOUR JSX IS 100% UNCHANGED 🔽 */

  return (
    <div className="min-h-screen flex flex-col justify-center px-4 py-10">
      {/* … existing JSX untouched … */}
    </div>
  )
}

export default Login
