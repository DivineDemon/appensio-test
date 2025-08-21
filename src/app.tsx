import { Route, Routes } from "react-router-dom";

import AuthLayout from "./components/auth-layout";
import GlobalLayout from "./components/global-layout";
import ForgotPassword from "./pages/forgot-password";
import LegalNotice from "./pages/legal-notice";
import Login from "./pages/login";
import MyBusinesses from "./pages/my-businesses";
import PrivacyPolicy from "./pages/privacy-policy";
import ResetPassword from "./pages/reset-password";
import Support from "./pages/support";
import TermsAndConditions from "./pages/terms-and-conditions";
import TermsOfService from "./pages/terms-of-service";
import VerifyOTP from "./pages/verify-otp";
import ViewBusiness from "./pages/view-business";

const App = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route index element={<Login />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Route>
      <Route element={<GlobalLayout />}>
        {/* <Route path="/profile" element={<Profile />} /> */}
        <Route path="/support" element={<Support />} />
        {/* <Route path="/call-logs" element={<CallLogs />} /> */}
        <Route path="/dashboard" element={<MyBusinesses />} />
        {/* <Route path="/my-agents" element={<MyBusinesses />} /> */}
        {/* <Route path="/edit-password" element={<EditPassword />} /> */}
        <Route path="/my-agents/:id/:a_id" element={<ViewBusiness />} />
      </Route>
      <Route path="/legal-notice" element={<LegalNotice />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-of-service" element={<TermsOfService />} />
      <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
    </Routes>
  );
};

export default App;
