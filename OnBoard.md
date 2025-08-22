# itestify_web Onboarding Guide

Welcome to the itestify_web project! This document will help you get started quickly and understand the current state of the codebase.

---

## Project Structure

- **src/pages/auth/SignUp/SignUp.jsx**  
  Multi-step sign-up flow (Basic Info → Email Verification → Set Password).  
  Uses modular components: `BasicInformation`, `VerifyEmail`, `SetPassword`.

- **src/components/OTPInput.jsx**  
  Reusable OTP input component, supports auto-focus, paste, and navigation.

- **src/pages/auth/ForgotPassword/ForgotPassword.jsx**  
  Handles password reset flow: request OTP, verify OTP, set new password.

---

## API Integration Warnings

> **Notice:**  
> The APIs used in the `onOtpSubmit` and `handleResendOtp` functions in the SignUp page (`/src/pages/auth/SignUp/SignUp.jsx`) are currently experiencing issues from the backend.  
> - `/auths/verify-email` (used in `onOtpSubmit`)
> - `/auths/resend-email-verification-token` (used in `handleResendOtp`)
>
> You may encounter errors or unexpected behavior when testing these flows until the backend is fixed.

---

## What Has Been Implemented

- **Multi-step Sign Up:**  
  - Step 1: Collects user name and email.
  - Step 2: Sends OTP to email and verifies it.
  - Step 3: Sets password and completes registration.
  - Progress bar and error/success feedback included.
  - Google and Apple sign-up placeholders included.

- **OTP Input:**  
  - Handles auto-focus, paste, and navigation.
  - Used in both sign-up and password reset flows.

- **Password Reset:**  
  - Request OTP, verify OTP, and set new password.
  - Success and error feedback provided.

- **Form Validation:**  
  - Email and password validation.
  - Button disabling until all fields are valid.

- **API Integration:**  
  - Uses Axios for API calls.
  - Handles loading, error, and success states.

- **Componentization:**  
  - Forms and steps are split into reusable components for clarity and maintainability.

---

## Outstanding Work / Next Steps

- **Reply Section:**  
  The logic for the reply section is not fully completed.  
  **Please check the "reply" section in the codebase and continue the implementation as needed.**

- **API Issues:**  
  Monitor and update the API integration for OTP verification and resend once the backend is fixed.

- **Testing:**  
  Ensure all flows are tested end-to-end once backend issues are resolved.

---

## Getting Started

1. **Install dependencies:**  
   ```bash
   npm install
   ```

2. **Start the development server:**  
   ```bash
   npm run dev
   # or
   npm start
   ```

3. **Explore the codebase:**  
   - Start with `/src/pages/auth/SignUp/SignUp.jsx` for the main registration flow.
   - Review `/src/components/OTPInput.jsx` for OTP handling.
   - Check `/src/pages/auth/ForgotPassword/ForgotPassword.jsx` for password reset logic.

---

## Contact

If you have any questions, reach out to the previous developer or check the comments in the code for guidance.

Happy coding!
