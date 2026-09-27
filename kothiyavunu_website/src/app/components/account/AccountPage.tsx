"use client";

import { useState, type FormEvent } from "react";
import styles from "./AccountPage.module.css";

type AccountMode = "login" | "signup";

export default function AccountPage() {
  const [mode, setMode] = useState<AccountMode>("login");
  const [notice, setNotice] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice("Account services are not connected yet.");
  }

  function changeMode(nextMode: AccountMode) {
    setMode(nextMode);
    setNotice("");
  }

  return (
    <main className={styles.page}>
      <section className={styles.account} aria-labelledby="account-title">
        <div className={styles.intro}>
          <p className={styles.eyebrow}>Welcome to the table</p>
          <h1 id="account-title">Your Kothiyavunu account</h1>
          <p>Keep your favorite recipes close and discover something delicious.</p>
        </div>

        <div className={styles.formPanel}>
          <div className={styles.tabs} role="tablist" aria-label="Account access">
            <button
              className={mode === "login" ? styles.selectedTab : styles.tab}
              id="login-tab"
              type="button"
              role="tab"
              aria-selected={mode === "login"}
              aria-controls="account-form"
              onClick={() => changeMode("login")}
            >
              Log in
            </button>
            <button
              className={mode === "signup" ? styles.selectedTab : styles.tab}
              id="signup-tab"
              type="button"
              role="tab"
              aria-selected={mode === "signup"}
              aria-controls="account-form"
              onClick={() => changeMode("signup")}
            >
              Sign up
            </button>
          </div>

          <form
            id="account-form"
            className={styles.form}
            aria-labelledby={mode === "login" ? "login-tab" : "signup-tab"}
            onSubmit={handleSubmit}
          >
            {mode === "signup" && (
              <label className={styles.field}>
                <span>Full name</span>
                <input
                  type="text"
                  name="name"
                  autoComplete="name"
                  placeholder="Your name"
                  required
                />
              </label>
            )}

            <label className={styles.field}>
              <span>Email address</span>
              <input
                type="email"
                name="email"
                autoComplete="email"
                placeholder="you@example.com"
                required
              />
            </label>

            <div className={styles.field}>
              <label htmlFor="account-password">Password</label>
              <div className={styles.passwordControl}>
                <input
                  id="account-password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  autoComplete={mode === "login" ? "current-password" : "new-password"}
                  placeholder="At least 8 characters"
                  minLength={8}
                  required
                />
                <button
                  className={styles.passwordToggle}
                  type="button"
                  aria-pressed={showPassword}
                  onClick={() => setShowPassword((visible) => !visible)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {mode === "signup" && (
              <div className={styles.field}>
                <label htmlFor="confirm-password">Confirm password</label>
                <div className={styles.passwordControl}>
                  <input
                    id="confirm-password"
                    type={showPassword ? "text" : "password"}
                    name="confirm-password"
                    autoComplete="new-password"
                    placeholder="Enter your password again"
                    minLength={8}
                    required
                  />
                  <button
                    className={styles.passwordToggle}
                    type="button"
                    aria-pressed={showPassword}
                    onClick={() => setShowPassword((visible) => !visible)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
            )}

            {mode === "login" && (
              <label className={styles.remember}>
                <input type="checkbox" name="remember" />
                <span>Remember me</span>
              </label>
            )}

            <button className={styles.submit} type="submit">
              {mode === "login" ? "Log in" : "Create account"}
            </button>
            <p className={styles.notice} aria-live="polite">
              {notice}
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}